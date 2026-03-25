import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const esPrueba = searchParams.get('test') === 'true';
  const resend = new Resend(process.env.RESEND_API_KEY || 'temp_key_for_build');
  
  try {
    await connectDB();

    let query = {
      estado: 'confirmada',
      recordatorioEnviado: false
    };

    // Si NO es prueba, aplicamos el filtro de las 24 horas en el futuro
    if (!esPrueba) {
      const mañana = new Date();
      mañana.setHours(mañana.getHours() + 24);
      
      const inicioRango = new Date(mañana);
      inicioRango.setHours(inicioRango.getHours() - 1);
      const finRango = new Date(mañana);
      finRango.setHours(finRango.getHours() + 1);
      
      query.fechaHora = { $gte: inicioRango, $lte: finRango };
    }

    const citasParaRecordar = await Cita.find(query);

    for (const cita of citasParaRecordar) {
      const horaStr = new Date(cita.fechaHora).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Europe/Madrid' 
      });
      const fechaStr = new Date(cita.fechaHora).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' });

      const { error } = await resend.emails.send({
        from: 'Motivem <onboarding@resend.dev>',
        to: [cita.emailPaciente],
        subject: `Recordatorio de tu Cita - ${fechaStr}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #cfa248; border-radius: 10px; background-color: #efdfc2; color: #3a473d;">
            <h2 style="color: #cfa248;">Hola ${cita.nombrePaciente},</h2>
            <p>Te recordamos que tienes una cita para <strong>${cita.servicio}</strong> programada para:</p>
            <div style="background: white; padding: 15px; text-align: center; border-radius: 5px; font-size: 20px; font-weight: bold; border-left: 5px solid #76937c;">
              ${fechaStr} a las ${horaStr}
            </div>
            <p style="margin-top: 20px;">Si necesitas cancelar o cambiar la hora, por favor contactanos via whatsapp al 644 54 27 90.</p>
            <p>Un saludo,<br><strong>Equipo Motivem</strong></p>
          </div>
        `
      });

      if (!error) {
        cita.recordatorioEnviado = true;
        await cita.save();
      }
    }

    return NextResponse.json({ success: true, procesadas: citasParaRecordar.length });
  } catch (error) {
    console.error('Error en cron de recordatorios:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
