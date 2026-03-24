'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Por favor, completa todos los campos');
            setLoading(false);
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            router.push('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3] p-5">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Iniciar Sesión</h1>
                    <p className="text-gray-500 text-base">Bienvenido de nuevo a Motivem</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-3">
                            <span className="text-lg">⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-800">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="p-4 text-base border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#94a3b8] focus:ring-2 focus:ring-[#94a3b8]/20"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-800">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="p-4 text-base border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#94a3b8] focus:ring-2 focus:ring-[#94a3b8]/20"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`mt-3 p-4 text-base font-semibold text-white bg-gradient-to-r from-[#94a3b8] to-[#64748b] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="text-center mt-5">
                        <p className="text-sm text-gray-500">
                            ¿No tienes cuenta?{' '}
                            <Link href="/register" className="text-[#94a3b8] font-semibold hover:text-[#64748b] transition-colors">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
