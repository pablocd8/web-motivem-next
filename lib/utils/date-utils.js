/**
 * Utilidades para el manejo de fechas en la zona horaria Europe/Madrid
 * Evita desfases cuando el servidor está en UTC (Vercel)
 */

/**
 * Parsea una cadena ISO (sin zona horaria) como si fuera hora de Madrid
 * @param {string} isoString Ej: "2026-03-31T10:20:00"
 * @returns {Date} Objeto Date en UTC corregido
 */
export function parseMadridDate(isoString) {
  if (!isoString) return null;
  
  // 1. Creamos la fecha (JS la tratará como UTC en entornos serverless)
  const date = new Date(isoString);
  
  // 2. Calculamos el desfase de Madrid para esa fecha específica (considera DST)
  const offsetMinutes = getMadridOffsetMinutes(date);
  
  // 3. Ajustamos la fecha restando el offset para obtener la hora UTC real
  // Ej: Si queremos 10:20 Madrid y el offset es +2h (120 min), la hora UTC real es 08:20
  return new Date(date.getTime() - (offsetMinutes * 60 * 1000));
}

/**
 * Formatea una fecha forzando la zona horaria de Madrid
 */
export function formatMadridDate(date, options = {}) {
  const defaultOptions = {
    timeZone: 'Europe/Madrid',
    ...options
  };
  return new Intl.DateTimeFormat('es-ES', defaultOptions).format(new Date(date));
}

/**
 * Obtiene la hora HH:mm en punto forzando Madrid
 */
export function formatMadridTime(date) {
  return formatMadridDate(date, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * Obtiene el desfase en minutos de Madrid respecto a UTC
 */
function getMadridOffsetMinutes(date) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Madrid',
      timeZoneName: 'shortOffset'
    }).formatToParts(date);
    
    const tzName = parts.find(p => p.type === 'timeZoneName').value;
    // tzName será algo como "GMT+2" o "GMT+1"
    const match = tzName.match(/GMT([+-])(\d+)/);
    if (!match) return 0;
    
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2]);
    
    return sign * hours * 60;
  } catch (error) {
    // Fallback por si Intl falla (España suele ser +1 o +2)
    return 60; 
  }
}
