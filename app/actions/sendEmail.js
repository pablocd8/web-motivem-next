'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_NAME = 'MOTIVEM';
const ADMIN_EMAIL = 'motivem.info@gmail.com';
const FROM_EMAIL = 'Motivem Web <contacto@motivem.es>';

/**
 * Función base para enviar emails con Resend
 */
async function sendResendEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY no configurada. Saltando envío de email.');
    return { success: false, error: 'API Key no configurada' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      replyTo,
      html
    });

    if (error) {
      console.error('Error de Resend:', JSON.stringify(error, null, 2));
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Excepción al enviar email:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Plantilla base para emails de Motivem
 */
const getBaseTemplate = (title, content, footer = '') => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdfaf5; border-radius: 12px; overflow: hidden; border: 1px solid #eaddca; color: #3a473d;">
    <div style="background-color: #cfa248; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: 300;">${COMPANY_NAME}</h1>
      <p style="color: white; margin: 8px 0 0 0; opacity: 0.9; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">${title}</p>
    </div>
    
    <div style="padding: 40px; line-height: 1.6;">
      ${content}
    </div>
    
    <div style="background-color: #f4ece0; padding: 20px; text-align: center; font-size: 13px; color: #8a7a5d; border-top: 1px solid #eaddca;">
      ${footer || `© ${new Date().getFullYear()} ${COMPANY_NAME}. Reservados todos los derechos.`}
      <br><span style="margin-top: 8px; display: block; opacity: 0.7;">Este es un mensaje automático, por favor no lo respondas directamente.</span>
    </div>
  </div>
`;

/**
 * 1. Notificación de Formulario de Contacto (para el Admin)
 */
export async function sendContactNotification(formData) {
  const nombre = formData.get('nombre');
  const apellidos = formData.get('apellidos') || '';
  const email = formData.get('email');
  const telefono = formData.get('telefono') || 'No proporcionado';
  const mensaje = formData.get('mensaje');

  const content = `
    <p style="font-size: 16px; color: #4a5a4d;">Has recibido un nuevo mensaje desde el formulario de contacto:</p>
    <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 5px solid #76937c; margin: 25px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
      <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #76937c; text-decoration: none;">${email}</a></p>
      <p style="margin: 0;"><strong>Teléfono:</strong> ${telefono}</p>
    </div>
    <h3 style="color: #cfa248; margin-top: 30px; font-weight: 600;">Mensaje:</h3>
    <p style="padding: 15px; background-color: #f9f6f1; border-radius: 6px; font-style: italic; color: #3a473d; border: 1px solid #eee;">"${mensaje}"</p>
  `;

  return sendResendEmail({
    to: ADMIN_EMAIL,
    subject: `Nuevo mensaje de contacto: ${nombre} ${apellidos}`,
    replyTo: email,
    html: getBaseTemplate('Solicitud de Contacto', content)
  });
}

/**
 * 2. Notificación de Nueva Cita (para el Admin)
 */
export async function sendAppointmentAdminNotification(cita) {
  const { nombrePaciente, emailPaciente, telefonoPaciente, servicio, fechaHora, notas } = cita;
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Europe/Madrid'
  });

  const content = `
    <p style="font-size: 16px;">Se ha registrado una nueva reserva en la web:</p>
    <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 5px solid #cfa248; margin: 25px 0;">
      <p style="margin: 0 0 10px 0;"><strong>Paciente:</strong> ${nombrePaciente}</p>
      <p style="margin: 0 0 10px 0;"><strong>Servicio:</strong> ${servicio}</p>
      <p style="margin: 0 0 10px 0;"><strong>Fecha:</strong> ${fechaStr}</p>
      <p style="margin: 0;"><strong>Hora:</strong> ${horaStr}</p>
    </div>
    <div style="font-size: 14px; color: #666;">
      <p><strong>Email:</strong> ${emailPaciente}</p>
      <p><strong>Teléfono:</strong> ${telefonoPaciente}</p>
      ${notas ? `<p><strong>Notas:</strong> ${notas}</p>` : ''}
    </div>
  `;

  return sendResendEmail({
    to: ADMIN_EMAIL,
    subject: `Nueva Cita: ${nombrePaciente} - ${servicio}`,
    html: getBaseTemplate('Nueva Reserva Recibida', content)
  });
}

/**
 * 3. Confirmación de Cita (para el Usuario)
 */
export async function sendAppointmentConfirmation(cita) {
  const { nombrePaciente, servicio, fechaHora } = cita;
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Europe/Madrid'
  });

  const content = `
    <h2 style="color: #3a473d; font-weight: 400;">¡Hola, ${nombrePaciente}!</h2>
    <p>Tu cita en <strong>Motivem</strong> ha sido confirmada correctamente. Aquí tienes los detalles:</p>
    
    <div style="background-color: white; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; border: 1px solid #eaddca;">
      <p style="color: #cfa248; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">${servicio}</p>
      <p style="font-size: 22px; margin: 0 0 5px 0; color: #3a473d;">${fechaStr}</p>
      <p style="font-size: 20px; margin: 0; color: #3a473d;">a las ${horaStr}h</p>
    </div>

    <p style="font-size: 15px; color: #666;">Si necesitas cancelar o modificar tu cita, por favor contacta con nosotros con al menos 24 horas de antelación.</p>
    
    <div style="margin-top: 40px; text-align: center;">
      <a href="https://motivem.es" style="background-color: #76937c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 14px;">Visitar la Web</a>
    </div>
  `;

  return sendResendEmail({
    to: cita.emailPaciente,
    subject: `Confirmación de tu cita en Motivem`,
    html: getBaseTemplate('Cita Confirmada', content)
  });
}

/**
 * 4. Recordatorio de Cita - 48h antes (para el Usuario)
 */
export async function sendAppointmentReminder(cita) {
  const { nombrePaciente, servicio, fechaHora } = cita;
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Europe/Madrid'
  });

  const content = `
    <h2 style="color: #3a473d; font-weight: 400;">Recordatorio de cita</h2>
    <p>Hola, ${nombrePaciente}. Te escribimos para recordarte que tienes una cita programada en <strong>Motivem</strong> en 48 horas:</p>
    
    <div style="background-color: #fcf8f2; padding: 25px; border-radius: 8px; border: 1px dashed #cfa248; margin: 25px 0; text-align: center;">
      <p style="margin: 0 0 5px 0; font-weight: 600; color: #cfa248;">${servicio}</p>
      <p style="margin: 0; font-size: 18px;">${fechaStr} a las ${horaStr}h</p>
    </div>

    <p>¡Te esperamos!</p>
  `;

  return sendResendEmail({
    to: cita.emailPaciente,
    subject: `Recordatorio: Tu cita en Motivem en 48 horas`,
    html: getBaseTemplate('Recordatorio de Cita', content)
  });
}

/**
 * Función compatible con el formulario de contacto original
 */
export async function sendEmail(formData) {
  return sendContactNotification(formData);
}
