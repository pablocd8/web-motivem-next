'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3] p-5">
                <div className="bg-[#efdfc2] rounded-3xl shadow-2xl p-12 max-w-md w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-[#6e9277] mb-3">Iniciar Sesión</h1>
                        <p className="text-[#94a3b8] text-base">Bienvenido de nuevo a Motivem</p>
                    </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-3">
                            <span className="text-lg">⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="contraseña"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`mt-3 p-4 text-base font-semibold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="text-center mt-5">
                        <p className="text-sm text-[#94a3b8]">
                            ¿No tienes cuenta?{' '}
                            <Link href="/register" className="text-[#cfa248] font-semibold hover:text-[#bf7b56] transition-colors">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Login;
