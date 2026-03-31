'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
    const { token } = useParams();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    token, 
                    newPassword: formData.newPassword 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Contraseña actualizada con éxito. Redirigiendo...' });
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Error al restablecer contraseña' });
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
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-[#6e9277]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6e9277]">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#6e9277] mb-2">Nueva Contraseña</h1>
                        <p className="text-[#5a6a5d]/70 text-sm">Elige una contraseña segura para tu cuenta.</p>
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
                            <label className="text-sm font-semibold text-[#6e9277] ml-1">Nueva Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full p-4 text-base text-[#5a6a5d] border border-[#cfa248]/50 placeholder-[#5a6a5d]/40 rounded-2xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-black/5 md:bg-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a6a5d]/40 hover:text-[#cfa248] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[#6e9277] ml-1">Confirmar Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Repite la contraseña"
                                className="w-full p-4 text-base text-[#5a6a5d] border border-[#cfa248]/50 placeholder-[#5a6a5d]/40 rounded-2xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-black/5 md:bg-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-4 text-base font-bold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-2 ${
                                loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Actualizando...
                                </>
                            ) : (
                                'Restablecer Contraseña'
                            )}
                        </button>
                    </form>
                </div>
            </main>

            <Footer className="mt-0" />
        </div>
    );
}
