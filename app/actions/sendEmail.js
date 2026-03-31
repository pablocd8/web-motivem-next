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
 * Plantilla base para emails de Motivem (Diseño Premium 2026)
 */
const getBaseTemplate = (title, content, variant = 'gold') => {
  const primaryColor = variant === 'red' ? '#bf7b56' : '#d4ac50';
  const secondaryColor = variant === 'red' ? '#fdf5f0' : '#fefaf3';
  
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: ${secondaryColor}; border-radius: 20px; overflow: hidden; border: 1px solid #eaddca; color: #3a473d;">
      <!-- Cabecera -->
      <div style="background-color: ${primaryColor}; padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 32px; letter-spacing: 4px; font-weight: 300; text-transform: uppercase;">${COMPANY_NAME}</h1>
        <p style="color: white; margin: 12px 0 0 0; opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; font-weight: 400;">${title}</p>
      </div>
      
      <!-- Contenido Principal -->
      <div style="padding: 40px 30px; line-height: 1.6;">
        ${content}
      </div>
      
      <!-- Pie de Página -->
      <div style="background-color: #f1e9db; padding: 30px 20px; text-align: center; font-size: 12px; color: #8a7a5d; border-top: 1px solid #eaddca;">
        <p style="margin: 0 0 8px 0; font-weight: 600; opacity: 0.8;">© ${new Date().getFullYear()} ${COMPANY_NAME}. Reservados todos los derechos.</p>
        <span style="display: block; opacity: 0.6;">Este es un mensaje automático, por favor no lo respondas directamente.</span>
      </div>
    </div>
  `;
};

/**
 * Ayudante para crear tarjetas de detalles (Blancas)
 */
const getCardTemplate = (title, details, variant = 'gold') => {
  const accentColor = variant === 'red' ? '#bf7b56' : '#d4ac50';
  return `
    <div style="background-color: white; padding: 35px; border-radius: 16px; margin: 30px 0; text-align: center; border: 1px solid #eaddca; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <h3 style="color: ${accentColor}; font-size: 18px; margin: 0 0 15px 0; font-weight: 600; text-transform: capitalize;">${title}</h3>
      <div style="color: #3a473d; font-size: 24px; font-weight: 300;">
        ${details}
      </div>
    </div>
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
    <p style="font-size: 16px; color: #4a5a4d; text-align: center;">Has recibido un nuevo mensaje desde la web:</p>
    ${getCardTemplate(`${nombre} ${apellidos}`, `
      <p style="font-size: 16px; margin: 5px 0; color: #76937c;"><a href="mailto:${email}" style="color: #76937c; text-decoration: none;">${email}</a></p>
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
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
  });

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
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
  });

  const content = `
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 30px;">¡Hola, ${nombrePaciente}!</h2>
    <p style="text-align: center;">Tu cita en <strong>Motivem</strong> ha sido confirmada correctamente. Aquí tienes los detalles:</p>
    
    ${getCardTemplate(servicio, `
      <p style="margin: 0 0 5px 0;">${fechaStr}</p>
      <p style="margin: 0; opacity: 0.8; font-size: 20px;">a las ${horaStr}h</p>
    `)}

    <p style="font-size: 14px; color: #666; text-align: center; margin: 30px 0;">Si necesitas cancelar o modificar tu cita, por favor contacta con nosotros con al menos 24 horas de antelación.</p>
    
    <div style="text-align: center; margin-top: 40px;">
      <a href="https://motivem.es" style="background-color: #76937c; color: white; padding: 16px 32px; text-decoration: none; border-radius: 35px; font-weight: 600; font-size: 15px; display: inline-block;">Visitar la Web</a>
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
  const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Madrid'
  });
  const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { 
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
  });

  const content = `
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 30px;">Hola, ${nombrePaciente}</h2>
    <p style="text-align: center;">Te informamos que tu cita ha sido <strong>cancelada</strong>:</p>
    
    ${getCardTemplate(servicio, `
      <p style="margin: 0 0 5px 0;">${fechaStr}</p>
      <p style="margin: 0; opacity: 0.8; font-size: 20px;">a las ${horaStr}h</p>
    `, 'red')}

    <p style="font-size: 15px; color: #666; text-align: center; background-color: white; padding: 20px; border-radius: 12px; border: 1px solid #eee;">
      Si tienes cualquier duda o quieres reprogramar tu sesión, por favor contáctanos vía <strong>WhatsApp al 644 54 27 90</strong>.
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
    <h2 style="color: #3a473d; font-weight: 400; text-align: center; margin-bottom: 30px;">¡Hola, ${nombre}!</h2>
    <p style="text-align: center;">Has solicitado restablecer tu contraseña en Motivem. Haz clic en el botón de abajo para continuar. Este enlace caducará en 1 hora.</p>
    
    <div style="text-align: center; margin: 45px 0;">
      <a href="${resetUrl}" style="background-color: #d4ac50; color: white; padding: 18px 36px; text-decoration: none; border-radius: 35px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 10px rgba(212, 172, 80, 0.3);">Restablecer Contraseña</a>
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
