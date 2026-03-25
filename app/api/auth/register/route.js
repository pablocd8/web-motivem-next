import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Usuario from '@/lib/models/usuarios';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const { nombre, apellido, email, password } = await request.json();

    // Validar que todos los campos estén presentes
    if (!nombre || !apellido || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
    if (usuarioExistente) {
      return NextResponse.json(
        { success: false, message: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await nuevoUsuario.save();

    // Generar token JWT
    const token = signToken({
      userId: nuevoUsuario._id,
      email: nuevoUsuario.email
    });

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error en register:', error);
    return NextResponse.json(
      { success: false, message: 'Error al registrar usuario', error: error.message },
      { status: 500 }
    );
  }
}
