'use server';

import { Resend } from 'resend';
import { formatMadridDate, formatMadridTime } from '@/lib/utils/date-utils';

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
 * Plantilla base para emails de Motivem (Diseño Premium 2026 - Versión Robusta)
 */
const getBaseTemplate = (title, content, variant = 'gold') => {
  const primaryColor = variant === 'red' ? '#bf7b56' : '#d4ac50';
  const secondaryColor = variant === 'red' ? '#fdf5f0' : '#fefaf3';
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; -webkit-text-size-adjust: 100%;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table role="presentation" width="100%" style="max-width: 600px; background-color: ${secondaryColor}; border-radius: 24px; overflow: hidden; border: 1px solid #eaddca; border-collapse: separate;" cellspacing="0" cellpadding="0" border="0">
              <!-- Cabecera -->
              <tr>
                <td align="center" style="background-color: ${primaryColor}; padding: 50px 20px;">
                  <h1 style="color: #ffffff; margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 32px; letter-spacing: 5px; font-weight: 300; text-transform: uppercase; line-height: 1.2;">${COMPANY_NAME}</h1>
                  <p style="color: #ffffff; margin: 15px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; font-weight: 400;">${title}</p>
                </td>
              </tr>
              
              <!-- Contenido Principal -->
              <tr>
                <td style="padding: 40px 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #3a473d;">
                  ${content}
                </td>
              </tr>
              
              <!-- Pie de Página -->
              <tr>
                <td align="center" style="background-color: #f1e9db; padding: 30px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #8a7a5d; border-top: 1px solid #eaddca;">
                  <p style="margin: 0 0 10px 0; font-weight: 600; opacity: 0.8;">© ${new Date().getFullYear()} ${COMPANY_NAME}. Reservados todos los derechos.</p>
                  <span style="display: block; opacity: 0.6;">Este es un mensaje automático, por favor no lo respondas directamente.</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Ayudante para crear tarjetas de detalles (Blancas y Centradas)
 */
const getCardTemplate = (title, details, variant = 'gold') => {
  const accentColor = variant === 'red' ? '#bf7b56' : '#d4ac50';
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="background-color: #ffffff; border-radius: 18px; border: 1px solid #eaddca; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 35px 20px; text-align: center;">
                <h3 style="color: ${accentColor}; font-size: 18px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 0 15px 0; font-weight: 600; text-transform: capitalize;">${title}</h3>
                <div style="color: #3a473d; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 300; line-height: 1.4;">
                  ${details}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

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
    <p style="font-size: 16px; text-align: center;">Has recibido un nuevo mensaje desde la web:</p>
    ${getCardTemplate(`${nombre} ${apellidos}`, `
      <p style="font-size: 16px; margin: 5px 0;"><a href="mailto:${email}" style="color: #76937c; text-decoration: none;">${email}</a></p>
      <p style="font-size: 14px; margin: 5px 0; color: #8a7a5d;">${telefono}</p>
    `)}
    <p style="padding: 20px; background-color: #ffffff; border-radius: 12px; font-style: italic; color: #3a473d; border: 1px solid #eee; margin-top: 20px; text-align: center;">
      "${mensaje}"
    </p>
  `;

  return sendResendEmail({
    to: ADMIN_EMAIL,
    subject: `Contacto: ${nombre} ${apellidos}`,
    replyTo: email,
    html: getBaseTemplate('Solicitud de Contacto', content)
  });
}

/**
 * 2. Notificación de Nueva Cita (para el Admin)
 */
export async function sendAppointmentAdminNotification(cita) {
  const { nombrePaciente, servicio, fechaHora } = cita;
  const fechaStr = formatMadridDate(fechaHora, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const horaStr = formatMadridTime(fechaHora);

  const content = `
    <p style="font-size: 16px; text-align: center;">¡Nueva reserva registrada!</p>
    ${getCardTemplate(servicio, `
      <p style="margin: 0; font-size: 20px;">${nombrePaciente}</p>
      <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.7;">${fechaStr} - ${horaStr}h</p>
    `)}
  `;

  return sendResendEmail({
    to: ADMIN_EMAIL,
    subject: `Nueva Cita: ${nombrePaciente} - ${servicio}`,
    html: getBaseTemplate('Gestión de Reservas', content)
  });
}

/**
 * 3. Confirmación de Cita (para el Usuario)
 */
export async function sendAppointmentConfirmation(cita) {
  const { nombrePaciente, servicio, fechaHora } = cita;
  const fechaStr = formatMadridDate(fechaHora, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const horaStr = formatMadridTime(fechaHora);

  const content = `
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 25px;">¡Hola, ${nombrePaciente}!</h2>
    <p style="text-align: center;">Tu cita en <strong>Motivem</strong> ha sido confirmada correctamente. Aquí tienes los detalles:</p>
    
    ${getCardTemplate(servicio, `
      <p style="margin: 0 0 5px 0;">${fechaStr}</p>
      <p style="margin: 0; opacity: 0.8; font-size: 20px;">a las ${horaStr}h</p>
    `)}

    <p style="font-size: 14px; color: #666; text-align: center; margin: 30px 0;">Si necesitas cancelar o modificar tu cita, por favor contacta con nosotros con al menos 24 horas de antelación.</p>
    
    <div style="text-align: center; margin-top: 40px;">
      <a href="https://motivem.es" style="background-color: #76937c; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 40px; font-weight: 600; font-size: 15px; display: inline-block;">Visitar la Web</a>
    </div>
  `;

  return sendResendEmail({
    to: cita.emailPaciente,
    subject: `Confirmación de tu cita en Motivem`,
    html: getBaseTemplate('Cita Confirmada', content)
  });
}

/**
 * 4. Cancelación de Cita - VARIANTE ROJA (para el Usuario)
 */
export async function sendAppointmentCancellation(cita) {
  const { nombrePaciente, servicio, fechaHora } = cita;
  const fechaStr = formatMadridDate(fechaHora, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const horaStr = formatMadridTime(fechaHora);

  const content = `
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 25px;">Hola, ${nombrePaciente}</h2>
    <p style="text-align: center;">Te informamos que tu cita ha sido <strong>cancelada</strong>:</p>
    
    ${getCardTemplate(servicio, `
      <p style="margin: 0 0 5px 0;">${fechaStr}</p>
      <p style="margin: 0; opacity: 0.8; font-size: 20px;">a las ${horaStr}h</p>
    `, 'red')}

    <p style="font-size: 14px; color: #666; text-align: center; background-color: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #eee; margin-top: 30px;">
      Si tienes cualquier duda o quieres reprogramar tu sesión, por favor contáctanos vía <b>WhatsApp al 644 54 27 90</b>.
    </p>
  `;

  return sendResendEmail({
    to: cita.emailPaciente,
    subject: `Cancelación de Cita - Motivem`,
    html: getBaseTemplate('Cita Cancelada', content, 'red')
  });
}

/**
 * 5. Notificación de Recuperación de Contraseña
 */
export async function sendPasswordResetEmail(email, nombre, resetUrl) {
  const content = `
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 25px;">¡Hola, ${nombre}!</h2>
    <p style="text-align: center;">Has solicitado restablecer tu contraseña en Motivem. Haz clic en el botón de abajo para continuar. Este enlace caducará en 1 hora.</p>
    
    <div style="text-align: center; margin: 45px 0;">
      <a href="${resetUrl}" style="background-color: #d4ac50; color: #ffffff; padding: 20px 40px; text-decoration: none; border-radius: 40px; font-weight: bold; font-size: 16px; display: inline-block;">Restablecer Contraseña</a>
    </div>

    <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 40px; padding: 0 20px;">
      Si no has solicitado este cambio, simplemente puedes ignorar este correo y tu contraseña actual no cambiará.
    </p>
  `;

  return sendResendEmail({
    to: email,
    subject: 'Recuperar Contraseña - Motivem',
    html: getBaseTemplate('Seguridad de la Cuenta', content)
  });
}

/**
 * Compatible con formularios genéricos
 */
export async function sendEmail(formData) {
  return sendContactNotification(formData);
}
