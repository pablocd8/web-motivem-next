import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await connectDB();

    const usuario = await Usuario.findById(auth.userId).select('-password');

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        createdAt: usuario.createdAt
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error en getProfile:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener perfil', error: error.message },
      { status: 500 }
    );
  }
}
