import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY || 'temp_key_for_build');
  try {
    await connectDB();

    // Buscar citas en las próximas 24 horas (margen de +/- 1h)
    const mañana = new Date();
    mañana.setHours(mañana.getHours() + 24);
    
    const inicioRango = new Date(mañana);
    inicioRango.setHours(inicioRango.getHours() - 1);
    const finRango = new Date(mañana);
    finRango.setHours(finRango.getHours() + 1);

    const citasParaRecordar = await Cita.find({
      fechaHora: { $gte: inicioRango, $lte: finRango },
      estado: 'confirmada',
      recordatorioEnviado: false
    });

    for (const cita of citasParaRecordar) {
      const horaStr = new Date(cita.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const fechaStr = new Date(cita.fechaHora).toLocaleDateString('es-ES');

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
            <p style="margin-top: 20px;">Si necesitas cancelar o cambiar la hora, por favor avísanos con antelación.</p>
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
