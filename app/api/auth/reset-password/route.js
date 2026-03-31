import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Usuario from '@/lib/models/usuarios';

export async function POST(req) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
        }

        // Conectar a la base de datos
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        // Buscar al usuario con el token correspondiente y que no haya expirado
        const user = await Usuario.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: 'El enlace es inválido o ha expirado' }, { status: 400 });
        }

        // Actualizar contraseña (hash)
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        
        // Limpiar campos del token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        
        await user.save();

        return NextResponse.json({ message: 'Contraseña actualizada con éxito' });

    } catch (error) {
        console.error('SERVER ERROR (reset-password):', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
