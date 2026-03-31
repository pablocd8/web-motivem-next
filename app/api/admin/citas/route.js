import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { sendAppointmentCancellation } from '@/app/actions/sendEmail';

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

    // Si el estado es cancelada, enviar correo al paciente usando el sistema centralizado
    if (estado === 'cancelada') {
      try {
        const { success, error } = await sendAppointmentCancellation(actualizada);
        if (!success) {
           console.error('Error enviando mail de cancelación:', error);
        }
      } catch (err) {
        console.error('Error en proceso de cancelación:', err);
      }
    }

    return NextResponse.json({ success: true, cita: actualizada });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
