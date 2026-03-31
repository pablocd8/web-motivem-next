'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock, User, Mail, ShieldCheck, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Perfil = () => {
    const { user, token, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        // Validaciones básicas
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
            setLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres' });
            setLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Error al actualizar contraseña' });
            }
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;
    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3]">
            <Header />
            
            <main className="flex-grow max-w-5xl mx-auto py-12 px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Columna Izquierda: Información del Usuario */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#d4c3a3]/30 text-center">
                            <div className="w-24 h-24 bg-[#6e9277]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#6e9277]/20">
                                <User size={48} className="text-[#6e9277]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#3a473d]">{user?.nombre} {user?.apellido}</h2>
                            <p className="text-[#94a3b8] flex items-center justify-center gap-1 mt-1 text-sm">
                                <Mail size={14} /> {user?.email}
                            </p>
                            <div className="mt-4 inline-block px-3 py-1 bg-[#cfa248]/10 text-[#cfa248] text-xs font-bold rounded-full uppercase tracking-wider">
                                {user?.rol || 'Usuario'}
                            </div>
                        </div>

                        <div className="bg-[#fcf8f1] rounded-2xl p-6 border border-[#d4c3a3]/20">
                            <h3 className="font-bold text-[#3a473d] mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#6e9277]" /> Seguridad
                            </h3>
                            <p className="text-sm text-[#5a6a5d] leading-relaxed italic">
                                Mantén tu cuenta protegida. Te recomendamos usar contraseñas seguras que incluyan letras, números y símbolos.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#d4c3a3]/30">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-[#cfa248]/10 rounded-2xl text-[#cfa248]">
                                    <Lock size={28} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-[#3a473d]">Cambiar Contraseña</h1>
                                    <p className="text-gray-400">Actualiza tus credenciales de acceso</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {message.text && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-300 ${
                                        message.type === 'success' 
                                        ? 'bg-green-50 border border-green-100 text-green-700' 
                                        : 'bg-red-50 border border-red-100 text-red-700'
                                    }`}>
                                        {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                        <p className="text-sm font-medium">{message.text}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#6e9277] ml-1">Contraseña Actual</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            placeholder="Introduce tu contraseña actual"
                                            className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-[#cfa248] transition-colors"
                                        >
                                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#6e9277] ml-1">Nueva Contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                placeholder="Mín. 6 caracteres"
                                                className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white"
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-[#cfa248] transition-colors"
                                            >
                                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#6e9277] ml-1">Confirmar Nueva Contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Repite la contraseña"
                                                className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white"
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-[#cfa248] transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full md:w-auto px-10 py-4 text-base font-semibold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Actualizando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer className="mt-0" />
        </div>
    );
};

export default Perfil;
