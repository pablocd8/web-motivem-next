import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cita from '@/lib/models/cita';
import { sendAppointmentReminder } from '@/app/actions/sendEmail';

export const dynamic = 'force-dynamic';

/**
 * Cron job para enviar recordatorios de cita 48 horas antes.
 * Se recomienda ejecutarlo cada hora.
 */
export async function GET(request) {
  // Verificación básica de seguridad (opcional, configurar CRON_SECRET en Vercel)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('No autorizado', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const esPrueba = searchParams.get('test') === 'true';
  
  try {
    await connectDB();

    let query = {
      estado: { $in: ['pendiente', 'confirmada'] }, // Recordar tanto pendientes como confirmadas
      recordatorioEnviado: false
    };

    // Filtro para citas en la ventana de las próximas 48-72 horas
    if (!esPrueba) {
      const hoyACero = new Date();
      hoyACero.setHours(0, 0, 0, 0);

      // Buscamos todas las citas que ocurren entre 48h y 72h desde hoy a las 00:00
      // Esto capturará todas las citas del día "pasado mañana"
      const inicioRango = new Date(hoyACero);
      inicioRango.setHours(inicioRango.getHours() + 48); // +48h
      
      const finRango = new Date(hoyACero);
      finRango.setHours(finRango.getHours() + 72); // +72h (fin del día)
      
      query.fechaHora = { $gte: inicioRango, $lt: finRango };
    }

    const citasParaRecordar = await Cita.find(query);
    console.log(`[Cron] Encontradas ${citasParaRecordar.length} citas para recordar.`);

    const resultados = [];

    for (const cita of citasParaRecordar) {
      const result = await sendAppointmentReminder(cita);
      
      if (result.success) {
        cita.recordatorioEnviado = true;
        await cita.save();
        resultados.push({ id: cita._id, success: true });
      } else {
        console.error(`Error enviando recordatorio a ${cita.emailPaciente}:`, result.error);
        resultados.push({ id: cita._id, success: false, error: result.error });
      }
    }

    return NextResponse.json({ 
      success: true, 
      procesadas: citasParaRecordar.length,
      detalles: resultados 
    });
  } catch (error) {
    console.error('Error en cron de recordatorios:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
