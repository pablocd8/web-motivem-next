'use server';

import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { sendEmail } from './sendEmail';

const HORARIO_LABORAL = {
  inicio: 10,
  fin: 20,
  duracionSlot: 60
};

/**
 * Obtiene los huecos disponibles para una fecha específica
 */
export async function obtenerHuecosLibres(fechaString) {
  try {
    await connectDB();
    
    const fechaSeleccionada = new Date(fechaString);
    const inicioDia = new Date(fechaSeleccionada.setHours(0, 0, 0, 0));
    const finDia = new Date(fechaSeleccionada.setHours(23, 59, 59, 999));

    const citasExistentes = await Cita.find({
      fechaHora: { $gte: inicioDia, $lte: finDia },
      estado: { $ne: 'cancelada' }
    });

    const huecos = [];
    for (let hora = HORARIO_LABORAL.inicio; hora < HORARIO_LABORAL.fin; hora++) {
      const horaSlot = new Date(inicioDia);
      horaSlot.setHours(hora, 0, 0, 0);
      
      if (horaSlot < new Date()) continue;

      const ocupado = citasExistentes.some(c => {
        return new Date(c.fechaHora).getTime() === horaSlot.getTime();
      });

      if (!ocupado) {
        huecos.push(horaSlot.toISOString());
      }
    }

    return { success: true, huecos };
  } catch (error) {
    console.error('Error al obtener huecos:', error);
    return { success: false, error: 'Error al cargar disponibilidad.' };
  }
}

/**
 * Crea una nueva reserva
 */
export async function crearCita(formData) {
  try {
    await connectDB();

    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const servicio = formData.get('servicio');
    const fechaHora = formData.get('fechaHora');
    const notas = formData.get('notas');

    const fechaCita = new Date(fechaHora);

    const existente = await Cita.findOne({
      fechaHora: fechaCita,
      estado: { $ne: 'cancelada' }
    });

    if (existente) {
      return { success: false, error: 'Horario ya ocupado.' };
    }

    const nuevaCita = await Cita.create({
      nombrePaciente: nombre,
      emailPaciente: email,
      telefonoPaciente: telefono,
      servicio,
      fechaHora: fechaCita,
      notas
    });

    // Enviar confirmación (reutilizando sendEmail)
    const emailData = new FormData();
    emailData.set('nombre', nombre);
    emailData.set('apellidos', '(Reserva)');
    emailData.set('email', email);
    emailData.set('telefono', telefono);
    const mensaje = `✨ Cita confirmada para ${servicio} el día ${fechaCita.toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })} a las ${fechaCita.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })}. ✅`;
    emailData.set('mensaje', mensaje);
    
    await sendEmail(emailData);

    return { success: true, citaId: nuevaCita._id.toString() };
  } catch (error) {
    console.error('Error al crear cita:', error);
    return { success: false, error: 'Error al procesar la reserva.' };
  }
}
