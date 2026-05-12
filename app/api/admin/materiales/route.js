import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import path from 'path';

const TIPOS_PERMITIDOS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png',
  'image/webp',
];

const MAX_TAMANO = 20 * 1024 * 1024; // 20 MB
const BUCKET_NAME = 'Materiales';

async function verificarAdmin(request) {
  const decoded = verifyToken(request);
  if (decoded.error) return { error: decoded.error, status: decoded.status };

  await connectDB();
  const admin = await Usuario.findById(decoded.userId).select('rol').lean();
  if (!admin || admin.rol !== 'admin') {
    return { error: 'Acceso denegado. Solo administradores.', status: 403 };
  }
  return { userId: decoded.userId };
}

// GET: Lista todos los pacientes y opcionalmente materiales de uno
export async function GET(request) {
  const auth = await verificarAdmin(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await connectDB();
    const pacientes = await Usuario.find({ rol: 'usuario' })
      .select('_id nombre apellido email')
      .sort({ apellido: 1, nombre: 1 })
      .lean();

    const { searchParams } = new URL(request.url);
    const pacienteId = searchParams.get('pacienteId');

    let materiales = [];
    if (pacienteId) {
      materiales = await Material.find({ pacienteId }).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({ success: true, pacientes, materiales });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Subir un archivo a Supabase Storage
export async function POST(request) {
  const auth = await verificarAdmin(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await connectDB();
    const formData = await request.formData();
    const archivo = formData.get('archivo');
    const pacienteId = formData.get('pacienteId');
    const nombreVisible = formData.get('nombre') || archivo?.name || 'Documento';

    if (!archivo || !pacienteId) {
      return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 });
    }

    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido.' }, { status: 400 });
    }

    if (archivo.size > MAX_TAMANO) {
      return NextResponse.json({ error: 'Máximo 20 MB.' }, { status: 400 });
    }

    const paciente = await Usuario.findById(pacienteId).select('email').lean();
    if (!paciente) return NextResponse.json({ error: 'Paciente no encontrado.' }, { status: 404 });

    // 1. Preparar archivo para Supabase
    const ext = path.extname(archivo.name);
    const nombreArchivo = `${randomUUID()}${ext}`;
    
    // Aseguramos que la ruta no tenga espacios ni empiece por barra
    const filePath = `${pacienteId}/${nombreArchivo}`.replace(/\s/g, '_'); 
    
    console.log('Subiendo a Supabase:', BUCKET_NAME, filePath);

    // 2. Convertir a Buffer (más estable en entornos Node.js/Vercel)
    const arrayBuffer = await archivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Subir a Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: archivo.type,
        upsert: false
      });

    if (uploadError) throw new Error(`Error Supabase: ${uploadError.message}`);

    // 3. Guardar en MongoDB
    const material = await Material.create({
      nombre: nombreVisible,
      nombreArchivo: filePath, // Guardamos la ruta de Supabase
      tipo: archivo.type,
      tamano: archivo.size,
      pacienteId,
      pacienteEmail: paciente.email,
      subidoPor: auth.userId,
    });

    return NextResponse.json({ success: true, material }, { status: 201 });
  } catch (error) {
    console.error('Error en POST materiales:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Eliminar de Supabase y MongoDB
export async function DELETE(request) {
  const auth = await verificarAdmin(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await connectDB();
    const { materialId } = await request.json();

    const material = await Material.findById(materialId);
    if (!material) return NextResponse.json({ error: 'No encontrado.' }, { status: 404 });

    // 1. Eliminar de Supabase
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([material.nombreArchivo]);

    if (deleteError) console.error('Error al borrar en Supabase:', deleteError);

    // 2. Eliminar de MongoDB
    await Material.findByIdAndDelete(materialId);

    return NextResponse.json({ success: true, message: 'Eliminado.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
