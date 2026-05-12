import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const MATERIALES_DIR = path.join(process.cwd(), 'files', 'materiales');

// GET: Descarga segura de un archivo por ID de material
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

    // Comprobar acceso: el usuario solo puede descargar sus propios materiales,
    // el admin puede descargar cualquiera.
    const solicitante = await Usuario.findById(decoded.userId).select('rol').lean();
    const esAdmin = solicitante?.rol === 'admin';
    const esSuyo = material.pacienteId.toString() === decoded.userId;

    if (!esAdmin && !esSuyo) {
      return NextResponse.json({ error: 'Acceso denegado.' }, { status: 403 });
    }

    const rutaArchivo = path.join(MATERIALES_DIR, material.nombreArchivo);

    if (!existsSync(rutaArchivo)) {
      return NextResponse.json({ error: 'Archivo no encontrado en el servidor.' }, { status: 404 });
    }

    const fileBuffer = await readFile(rutaArchivo);
    const ext = path.extname(material.nombreArchivo);
    const nombreDescarga = encodeURIComponent(material.nombre) + ext;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': material.tipo,
        'Content-Disposition': `attachment; filename*=UTF-8''${nombreDescarga}`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
