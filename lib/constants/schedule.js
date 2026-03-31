/**
 * Configuración del horario laboral y exclusiones específicas por día de la semana.
 */

export const SCHEDULE_CONFIG = {
  durationMinutes: 50, // Sesiones de 50 minutos
  
  
  baseGrid: [
    "08:50", "09:40", "10:30", "11:20", "12:10", "13:00", 
    "14:40", "15:30", "16:20", "17:10", "18:00", 
    "18:50", "19:40"
  ],

  extraSlots: {
    1: ["19:50"], 
  },

  // 0: Domingo, 1: Lunes, 2: Martes, 3: Miércoles, 4: Jueves, 5: Viernes, 6: Sábado
  // Estas horas SE QUITARÁN de la lista de disponibles.
  exclusions: {
    1: ["16:20", "17:10", "18:00", "18:50", "19:50"], // Lunes
    2: ["14:40", "15:30", "16:20", "17:10", "18:00"], // Martes
    3: ["15:30", "17:10", "18:00", "18:50"],         // Miércoles
    4: ["15:30", "16:20", "17:10", "18:00"],         // Jueves
    5: ["15:30", "16:20", "17:10"],                  // Viernes
  }
};

/**
 * Comprueba si una hora (HH:mm) está excluida para un día específico (1-5).
 * @param {number} day 0-6
 * @param {string} timeStr "HH:mm"
 * @returns {boolean}
 */
export function isSlotExcluded(day, timeStr) {
  const dayExclusions = SCHEDULE_CONFIG.exclusions[day];
  return dayExclusions && dayExclusions.includes(timeStr);
}
