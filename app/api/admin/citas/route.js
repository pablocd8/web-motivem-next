import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { Resend } from 'resend';

// Obtener todas las citas para el admin
export async function GET() {
  try {
    await connectDB();
    const citas = await Cita.find().sort({ fechaHora: -1 });
    return NextResponse.json({ success: true, citas });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Actualizar estado de una cita
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, estado } = await request.json();
    
    const actualizada = await Cita.findByIdAndUpdate(id, { estado }, { new: true });
    
    if (!actualizada) {
      return NextResponse.json({ success: false, error: 'Cita no encontrada' }, { status: 404 });
    }

    // Si el estado es cancelada, enviar correo al paciente
    if (estado === 'cancelada') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY || 'temp_key_for_build');
        const fechaStr = new Date(actualizada.fechaHora).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' });
        const horaStr = new Date(actualizada.fechaHora).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit', 
          timeZone: 'Europe/Madrid' 
        });

        await resend.emails.send({
          from: 'Motivem <onboarding@resend.dev>',
          to: [actualizada.emailPaciente],
          subject: `Cancelación de Cita - Motivem`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 24px; border: 1px solid #bf7b56; border-radius: 12px; background-color: #fdf5f0; color: #3a473d;">
              <h2 style="color: #bf7b56;">Hola ${actualizada.nombrePaciente},</h2>
              <p>Te informamos que tu cita para <strong>${actualizada.servicio}</strong> prevista para el día <strong>${fechaStr}</strong> a las <strong>${horaStr}</strong> ha sido <strong>cancelada</strong>.</p>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #bf7b56; margin: 24px 0;">
                <p style="margin: 0; font-size: 15px;">Si tienes cualquier duda o quieres reprogramar tu sesión, por favor contáctanos vía <strong>WhatsApp al 644 54 27 90</strong>.</p>
              </div>

              <p>Sentimos los inconvenientes,<br><strong>Equipo Motivem</strong></p>
            </div>
          `
        });
      } catch (err) {
        console.error('Error enviando mail de cancelación:', err);
      }
    }

    return NextResponse.json({ success: true, cita: actualizada });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
