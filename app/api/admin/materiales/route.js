import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';
import { writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const MATERIALES_DIR = path.join(process.cwd(), 'files', 'materiales');

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

// GET: Lista todos los pacientes (rol usuario) con sus materiales
export async function GET(request) {
  const auth = await verificarAdmin(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await connectDB();

    // Obtener todos los usuarios con rol 'usuario'
    const pacientes = await Usuario.find({ rol: 'usuario' })
      .select('_id nombre apellido email')
      .sort({ apellido: 1, nombre: 1 })
      .lean();

    // Obtener el parámetro de filtro por paciente si existe
    const { searchParams } = new URL(request.url);
    const pacienteId = searchParams.get('pacienteId');

    let materiales = [];
    if (pacienteId) {
      materiales = await Material.find({ pacienteId })
        .sort({ createdAt: -1 })
        .lean();
    }

    return NextResponse.json({ success: true, pacientes, materiales });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Subir un archivo para un paciente
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
      return NextResponse.json(
        { error: 'Se requiere un archivo y un paciente.' },
        { status: 400 }
      );
    }

    // Validar tipo
    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido.' },
        { status: 400 }
      );
    }

    // Validar tamaño
    if (archivo.size > MAX_TAMANO) {
      return NextResponse.json(
        { error: 'El archivo supera el tamaño máximo de 20 MB.' },
        { status: 400 }
      );
    }

    // Verificar que el paciente existe
    const paciente = await Usuario.findById(pacienteId).select('email').lean();
    if (!paciente) {
      return NextResponse.json({ error: 'Paciente no encontrado.' }, { status: 404 });
    }

    // Generar nombre único en disco
    const ext = path.extname(archivo.name);
    const nombreArchivo = `${randomUUID()}${ext}`;
    const rutaCompleta = path.join(MATERIALES_DIR, nombreArchivo);

    // Guardar en disco
    const buffer = Buffer.from(await archivo.arrayBuffer());
    await writeFile(rutaCompleta, buffer);

    // Guardar metadatos en BD
    const material = await Material.create({
      nombre: nombreVisible,
      nombreArchivo,
      tipo: archivo.type,
      tamano: archivo.size,
      pacienteId,
      pacienteEmail: paciente.email,
      subidoPor: auth.userId,
    });

    return NextResponse.json({ success: true, material }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Eliminar un material por ID
export async function DELETE(request) {
  const auth = await verificarAdmin(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    await connectDB();
    const { materialId } = await request.json();

    if (!materialId) {
      return NextResponse.json({ error: 'Se requiere materialId.' }, { status: 400 });
    }

    const material = await Material.findByIdAndDelete(materialId);
    if (!material) {
      return NextResponse.json({ error: 'Material no encontrado.' }, { status: 404 });
    }

    // Eliminar archivo del disco si existe
    const rutaArchivo = path.join(MATERIALES_DIR, material.nombreArchivo);
    if (existsSync(rutaArchivo)) {
      await unlink(rutaArchivo);
    }

    return NextResponse.json({ success: true, message: 'Material eliminado.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
