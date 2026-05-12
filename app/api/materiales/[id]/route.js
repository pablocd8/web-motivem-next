import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'materiales';

// GET: Descarga segura vía URL firmada de Supabase
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

    // Generar URL firmada de Supabase (válida por 60 segundos para la descarga)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(material.nombreArchivo, 60, {
        download: material.nombre // Sugerir nombre de descarga
      });

    if (error) {
      console.error('Error al generar URL firmada:', error);
      return NextResponse.json({ error: 'Error al obtener el archivo de la nube.' }, { status: 500 });
    }

    // Redirigir a la URL de Supabase para que comience la descarga
    return NextResponse.redirect(data.signedUrl);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
