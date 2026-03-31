'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: data.message });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: data.message || 'Error al procesar la solicitud' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3]">
            <Header showLogo={true} />
            
            <main className="flex-grow flex items-center justify-center p-5 py-20">
                <div className="bg-[#efdfc2] rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border border-[#d4c3a3]/30">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#cfa248]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#cfa248]">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#6e9277] mb-2">Recuperar Contraseña</h1>
                        <p className="text-[#5a6a5d]/70 text-sm">Introduce tu email y te enviamos un enlace seguro.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                                message.type === 'success' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                                {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                <p className="text-sm font-medium">{message.text}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[#6e9277] ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="tu@email.com"
                                className="p-4 text-base text-[#5a6a5d] border border-[#cfa248]/50 placeholder-[#5a6a5d]/40 rounded-2xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-black/5 md:bg-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-4 text-base font-bold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-2 ${
                                loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {loading ? 'Enviando...' : 'Enviar enlace'}
                        </button>

                        <div className="text-center pt-2">
                            <Link 
                                href="/login" 
                                className="inline-flex items-center gap-2 text-sm text-[#6e9277] hover:text-[#3a473d] transition-colors font-medium"
                            >
                                <ArrowLeft size={16} /> Volver al inicio de sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <Footer className="mt-0" />
        </div>
    );
}
