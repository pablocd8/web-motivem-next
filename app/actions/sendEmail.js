'use server';

import { Resend } from 'resend';

export async function sendEmail(formData) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'temp_key_for_build');
  console.log('--- Intentando enviar email ---');
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  const nombre = formData.get('nombre');
  const apellidos = formData.get('apellidos');
  const nombreCompleto = `${nombre} ${apellidos}`;
  const email = formData.get('email');
  const telefono = formData.get('telefono');
  const mensaje = formData.get('mensaje');

  try {
    const { data, error } = await resend.emails.send({
      from: 'Motivem Web <onboarding@resend.dev>', // Cambiar por dominio verificado en producción
      to: ['pablocerdadonat8@gmail.com'],
      subject: `Nuevo mensaje de contacto: ${nombreCompleto}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #efdfc2; border-radius: 8px; overflow: hidden; border: 1px solid #d4c3a3; color: #3a473d;">
          <div style="background-color: #cfa248; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">MOTIVEM</h1>
            <p style="color: white; margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">Nueva Solicitud de Contacto</p>
          </div>
          
          <div style="padding: 32px;">
            <p style="font-size: 16px; margin-bottom: 24px;">Has recibido un nuevo mensaje a través del formulario de la web:</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #76937c; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0;"><strong>Nombre:</strong> ${nombreCompleto}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #76937c; text-decoration: none;">${email}</a></p>
              <p style="margin: 0 0 0 0;"><strong>Teléfono:</strong> ${telefono}</p>
            </div>
            
            <div style="margin-top: 32px;">
              <h3 style="color: #cfa248; border-bottom: 1px solid #d4c3a3; padding-bottom: 8px; margin-bottom: 12px;">Mensaje:</h3>
              <p style="line-height: 1.6; font-style: italic; color: #4a5a4d;">"${mensaje}"</p>
            </div>
          </div>
          
          <div style="background-color: #e2d1b0; padding: 16px; text-align: center; font-size: 12px; color: #7a6a4d;">
            Este es un correo automático generado por el sitio web de Motivem.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error detallado de Resend:', JSON.stringify(error, null, 2));
      return { success: false, error: 'No se pudo enviar el correo.' };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Excepción al enviar email:', err);
    return { success: false, error: 'Ocurrió un error inesperado.' };
  }
}
