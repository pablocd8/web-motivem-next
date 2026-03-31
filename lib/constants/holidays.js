/**
 * Calendario festivo (Nacional, Regional de la Comunidad Valenciana y Local de Ontinyent)
 * para los años 2025 y 2026.
 */

export const HOLIDAYS = [
  // --- AÑO 2026 ---
  "2026-01-01", // Año Nuevo
  "2026-01-06", // Epifanía del Señor (Reyes)
  "2026-03-19", // San José (Autonómico)
  "2026-04-02", // Jueves Santo (Autonómico)
  "2026-04-03", // Viernes Santo (Nacional)
  "2026-04-06", // Lunes de Pascua (Autonómico)
  "2026-05-01", // Fiesta del Trabajo
  "2026-08-15", // Asunción de la Virgen
  "2026-08-24", // Lunes de Fiestas de Moros y Cristianos (Local Ontinyent)
  "2026-10-09", // Día de la Comunitat Valenciana
  "2026-10-12", // Fiesta Nacional de España
  "2026-11-01", // Todos los Santos
  "2026-11-16", // Lunes de Feria (Local Ontinyent)
  "2026-12-06", // Día de la Constitución
  "2026-12-08", // Inmaculada Concepción
  "2026-12-25", // Natividad del Señor
];

/**
 * Comprueba si una fecha es festiva.
 * @param {Date|string} date 
 * @returns {boolean}
 */
export function isHoliday(date) {
  const d = date instanceof Date ? date : new Date(date);
  // Ajuste para evitar problemas con zonas horarias (ISO YYYY-MM-DD)
  const dateStr = d.toISOString().split('T')[0];
  return HOLIDAYS.includes(dateStr);
}
