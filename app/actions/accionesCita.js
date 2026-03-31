'use server';

import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { sendAppointmentAdminNotification, sendAppointmentConfirmation } from './sendEmail';
import { isHoliday } from '@/lib/constants/holidays';
import { SCHEDULE_CONFIG } from '@/lib/constants/schedule';
import { parseMadridDate, formatMadridTime } from '@/lib/utils/date-utils';

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

    // Definir inicio y fin de día de Madrid en UTC para la consulta
    const inicioDia = parseMadridDate(`${fechaString}T00:00:00`);
    const finDia = parseMadridDate(`${fechaString}T23:59:59`);

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
      // Slot específico en Madrid TZ
      const slotMadrid = parseMadridDate(`${fechaString}T${horaStr}:00`);
      
      // Filtrar si está en el pasado (hoy)
      const ahora = new Date();
      if (slotMadrid > ahora) {
        // Filtrar si es una exclusión específica para este día
        if (!exclusiones.includes(horaStr)) {
          // Filtrar si ya está ocupado (comparando tiempos UTC exactos)
          const ocupado = citasExistentes.some(c => {
            return new Date(c.fechaHora).getTime() === slotMadrid.getTime();
          });

          if (!ocupado) {
            huecos.push(horaStr);
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
    const fechaHora = formData.get('fechaHora'); // Viene como "YYYY-MM-DDTHH:mm:ss"
    const notas = formData.get('notas');

    // Parseamos forzando zona horaria de Madrid
    const fechaCita = parseMadridDate(fechaHora);
    const diaSemana = fechaCita.getDay();
    const horaStr = formatMadridTime(fechaCita);

    // 1. Validar Fin de Semana
    if (diaSemana === 0 || diaSemana === 6) {
      return { success: false, error: 'No se permiten reservas en fines de semana.' };
    }

    // 2. Validar Festivos
    const fechaString = fechaHora.split('T')[0];
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

    // Enviar notificaciones (las funciones en sendEmail ya usarán Intl para Madrid)
    await sendAppointmentAdminNotification(nuevaCita);
    await sendAppointmentConfirmation(nuevaCita);

    return { success: true, citaId: nuevaCita._id.toString() };
  } catch (error) {
    console.error('Error al crear cita:', error);
    return { success: false, error: 'Error al procesar la reserva.' };
  }
}
