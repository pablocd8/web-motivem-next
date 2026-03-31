'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3]">
            <Header />
            <main className="flex-grow flex items-center justify-center p-5 py-20">
                <div className="bg-[#efdfc2] rounded-3xl shadow-2xl p-12 max-w-md w-full my-auto">
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
                            <label className="text-sm font-semibold text-[#6e9277] ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="p-4 text-base text-[#5a6a5d] border border-[#cfa248]/50 placeholder-[#5a6a5d]/40 rounded-2xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-black/5 md:bg-transparent"
                                disabled={loading}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[#6e9277] ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="contraseña"
                                    className="w-full p-4 text-base text-[#5a6a5d] border border-[#cfa248]/50 placeholder-[#5a6a5d]/40 rounded-2xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-black/5 md:bg-transparent"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a6a5d]/40 hover:text-[#cfa248] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex justify-center mt-2">
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs font-medium text-[#cfa248] hover:text-[#bf7b56] transition-colors"
                                >
                                    ¿Has olvidado tu contraseña?
                                </Link>
                            </div>
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
            </main>
            <Footer className="mt-0" />
        </div>
    );
};

export default Login;
