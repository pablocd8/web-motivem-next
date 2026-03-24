import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json(
      { message: 'No autorizado. Debes iniciar sesión.' },
      { status: 401 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), 'files', 'guia-para-familias.pdf');
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="guia-para-familias.pdf"',
      },
    });
  } catch (error) {
    console.error('Error al descargar PDF:', error);
    return NextResponse.json(
      { message: 'Error al descargar el archivo' },
      { status: 500 }
    );
  }
}
