import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Usuario from '@/lib/models/usuarios';
import { sendPasswordResetEmail } from '@/app/actions/sendEmail';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'El email es requerido' }, { status: 400 });
        }

        // Conectar a la base de datos si no lo está
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const user = await Usuario.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Por seguridad, no revelamos que el email no existe, pero detenemos el proceso
            return NextResponse.json({ message: 'El correo existe, se ha enviado un enlace de recuperación' });
        }

        // Generar Token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hora de validez

        // Guardar en DB
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Construir URL de Reset
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

        // Enviar Email Centralizado
        const { success, error } = await sendPasswordResetEmail(email, user.nombre, resetUrl);

        if (!success) {
            console.error('Error enviando email:', error);
            return NextResponse.json({ message: 'Error al enviar el email de recuperación' }, { status: 500 });
        }

        return NextResponse.json({ message: 'El correo existe, se ha enviado un enlace de recuperación' });

    } catch (error) {
        console.error('SERVER ERROR (forgot-password):', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
