import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Material from '@/lib/models/material';
import { verifyToken } from '@/lib/auth';

// GET: Obtiene los materiales del usuario autenticado
export async function GET(request) {
  const decoded = verifyToken(request);
  if (decoded.error) {
    return NextResponse.json({ error: decoded.error }, { status: decoded.status });
  }

  try {
    await connectDB();
    const materiales = await Material.find({ pacienteId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, materiales });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
