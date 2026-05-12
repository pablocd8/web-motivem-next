import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'Materiales';

export async function GET(request, { params }) {
  const decoded = verifyToken(request);
  if (decoded.error) {
    return NextResponse.json({ error: decoded.error }, { status: decoded.status });
  }

  try {
    await connectDB();
    const { id } = await params;

    const material = await Material.findById(id).lean();
    if (!material) {
      return NextResponse.json({ error: 'Material no encontrado.' }, { status: 404 });
    }

    // Comprobar acceso
    const solicitante = await Usuario.findById(decoded.userId).select('rol').lean();
    const esAdmin = solicitante?.rol === 'admin';
    const esSuyo = material.pacienteId.toString() === decoded.userId;

    if (!esAdmin && !esSuyo) {
      return NextResponse.json({ error: 'Acceso denegado.' }, { status: 403 });
    }

    // 1. Descargar el archivo directamente de Supabase al Servidor
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(material.nombreArchivo);

    if (error) {
      console.error('Error al descargar de Supabase:', error);
      return NextResponse.json({ error: 'No se pudo recuperar el archivo de la nube.' }, { status: 500 });
    }

    // 2. Crear la respuesta con los datos binarios del archivo
    const response = new NextResponse(data);

    // 3. Configurar cabeceros para forzar la descarga con el nombre correcto
    response.headers.set('Content-Type', material.tipo || 'application/octet-stream');
    response.headers.set('Content-Disposition', `attachment; filename="${material.nombre}"`);

    return response;
    
  } catch (error) {
    console.error('Error en API descarga:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
