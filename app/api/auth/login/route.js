import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Usuario from '@/lib/models/usuarios';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Validar que todos los campos estén presentes
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = signToken({
      userId: usuario._id,
      email: usuario.email
    });

    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { success: false, message: 'Error al iniciar sesión', error: error.message },
      { status: 500 }
    );
  }
}
