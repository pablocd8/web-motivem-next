'use server';

import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { sendAppointmentAdminNotification, sendAppointmentConfirmation } from './sendEmail';
import { isHoliday } from '@/lib/constants/holidays';
import { SCHEDULE_CONFIG } from '@/lib/constants/schedule';

/**
 * Obtiene los huecos disponibles para una fecha específica
 */
export async function obtenerHuecosLibres(fechaString) {
  try {
    await connectDB();
    
    // Usamos fecha local para evitar desfases de zona horaria al comparar 'YYYY-MM-DD'
    const [year, month, day] = fechaString.split('-').map(Number);
    const fechaSeleccionada = new Date(year, month - 1, day);
    const diaSemana = fechaSeleccionada.getDay(); // 0: Domingo, 6: Sábado

    // 1. Validar Fin de Semana
    if (diaSemana === 0 || diaSemana === 6) {
      return { success: true, huecos: [], mensaje: 'Los fines de semana no hay citas disponibles.' };
    }

    // 2. Validar Festivos
    if (isHoliday(fechaString)) {
      return { success: true, huecos: [], mensaje: 'Este día es festivo en Ontinyent. No hay citas disponibles.' };
    }

    const inicioDia = new Date(year, month - 1, day, 0, 0, 0, 0);
    const finDia = new Date(year, month - 1, day, 23, 59, 59, 999);

    const citasExistentes = await Cita.find({
      fechaHora: { $gte: inicioDia, $lte: finDia },
      estado: { $ne: 'cancelada' }
    });

    const huecos = [];
    const exclusiones = SCHEDULE_CONFIG.exclusions[diaSemana] || [];
    const baseGrid = SCHEDULE_CONFIG.baseGrid || [];
    const extraSlots = (SCHEDULE_CONFIG.extraSlots && SCHEDULE_CONFIG.extraSlots[diaSemana]) || [];

    // Combinar rejilla base con huecos extras y filtrar exclusiones
    const slotsPosibles = [...baseGrid, ...extraSlots];

    slotsPosibles.forEach(horaStr => {
      const [hh, mm] = horaStr.split(':').map(Number);
      const slotDate = new Date(year, month - 1, day, hh, mm, 0, 0);
      
      // Filtrar si está en el pasado (hoy)
      const ahora = new Date();
      if (slotDate > ahora) {
        // Filtrar si es una exclusión específica para este día
        if (!exclusiones.includes(horaStr)) {
          // Filtrar si ya está ocupado
          const ocupado = citasExistentes.some(c => {
            return new Date(c.fechaHora).getTime() === slotDate.getTime();
          });

          if (!ocupado) {
            huecos.push(slotDate.toISOString());
          }
        }
      }
    });

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
    const diaSemana = fechaCita.getDay();
    const horaStr = fechaCita.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

    // 1. Validar Fin de Semana
    if (diaSemana === 0 || diaSemana === 6) {
      return { success: false, error: 'No se permiten reservas en fines de semana.' };
    }

    // 2. Validar Festivos
    const fechaString = fechaCita.toISOString().split('T')[0];
    if (isHoliday(fechaString)) {
      return { success: false, error: 'Este día es festivo en Ontinyent.' };
    }

    // 3. Validar Horas Excluidas
    const exclusiones = SCHEDULE_CONFIG.exclusions[diaSemana] || [];
    if (exclusiones.includes(horaStr)) {
      return { success: false, error: 'Este horario no está disponible.' };
    }

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

    // Enviar notificaciones
    await sendAppointmentAdminNotification(nuevaCita);
    await sendAppointmentConfirmation(nuevaCita);

    return { success: true, citaId: nuevaCita._id.toString() };
  } catch (error) {
    console.error('Error al crear cita:', error);
    return { success: false, error: 'Error al procesar la reserva.' };
  }
}
