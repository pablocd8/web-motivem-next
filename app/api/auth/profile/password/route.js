import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Usuario from '@/lib/models/usuarios';
import { verifyToken } from '@/lib/auth';

export async function PUT(request) {
  try {
    // 1. Verificar autenticación
    const auth = verifyToken(request);
    if (auth.error) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await connectDB();

    const { currentPassword, newPassword } = await request.json();

    // 2. Validar campos
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'La contraseña actual y la nueva son obligatorias' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La nueva contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // 3. Buscar usuario
    const usuario = await Usuario.findById(auth.userId);
    if (!usuario) {
      return NextResponse.json(
        { success: false, message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // 4. Verificar contraseña actual
    const passwordValida = await bcrypt.compare(currentPassword, usuario.password);
    if (!passwordValida) {
      return NextResponse.json(
        { success: false, message: 'La contraseña actual es incorrecta' },
        { status: 401 }
      );
    }

    // 5. Hashear nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 6. Actualizar usuario
    usuario.password = hashedPassword;
    await usuario.save();

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    }, { status: 200 });

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return NextResponse.json(
      { success: false, message: 'Error al cambiar la contraseña', error: error.message },
      { status: 500 }
    );
  }
}
