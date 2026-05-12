'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    Lock, User, Mail, ShieldCheck, AlertCircle, CheckCircle2,
    Eye, EyeOff, FileText, Download, BookOpen, Loader2
} from 'lucide-react';

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

function iconPorTipo(tipo) {
    if (tipo?.includes('pdf')) return '📄';
    if (tipo?.includes('word') || tipo?.includes('document')) return '📝';
    if (tipo?.includes('sheet') || tipo?.includes('excel')) return '📊';
    if (tipo?.includes('image')) return '🖼️';
    return '📎';
}

/* ─── Mis Materiales (usuarios) ─── */
function MisMateriales({ token }) {
    const [materiales, setMateriales] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/api/materiales', { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(d => { if (d.success) setMateriales(d.materiales); })
            .finally(() => setCargando(false));
    }, [token]);

    async function descargar(id, nombre) {
        try {
            const r = await fetch(`/api/materiales/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (!r.ok) throw new Error('Error en la descarga');
            
            const blob = await r.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = nombre;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error en descarga:', error);
            alert('No se pudo descargar el archivo.');
        }
    }

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#d4c3a3]/30 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#6e9277]/10 rounded-2xl text-[#6e9277]">
                    <BookOpen size={24} className="md:w-7 md:h-7" />
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#3a473d]">Mis Materiales</h2>
                    <p className="text-gray-400 text-xs md:text-sm">Documentos compartidos por tu psicóloga</p>
                </div>
            </div>

            {cargando ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin text-[#6e9277]" />
                </div>
            ) : materiales.length === 0 ? (
                <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-200 mb-3" />
                    <p className="text-gray-400 italic">Aún no tienes materiales disponibles.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {materiales.map(m => (
                        <li key={m._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#fcf8f1] rounded-2xl border border-[#d4c3a3]/20 hover:border-[#cfa248]/40 transition-all gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-2xl flex-shrink-0">{iconPorTipo(m.tipo)}</span>
                                <div className="min-w-0">
                                    <p className="font-semibold text-[#3a473d] truncate text-sm md:text-base">{m.nombre}</p>
                                    <p className="text-[10px] md:text-xs text-gray-400">
                                        {formatBytes(m.tamano)} · {new Date(m.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => descargar(m._id, m.nombre)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6e9277] text-white text-xs font-bold rounded-xl hover:bg-[#5a7a63] transition-all"
                            >
                                <Download size={14} /> Descargar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ─── Página Principal ─── */
const Perfil = () => {
    const { user, token, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) router.push('/login');
    }, [isAuthenticated, authLoading, router]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Por favor, completa todos los campos' });
            setLoading(false); return;
        }
        if (formData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres' });
            setLoading(false); return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            setLoading(false); return;
        }

        try {
            const response = await fetch('/api/auth/profile/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: formData.currentPassword, newPassword: formData.newPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Error al actualizar contraseña' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !isAuthenticated) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3]">
            <Header />

            <main className="flex-grow max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* ── Columna Izquierda (Perfil) ── */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#d4c3a3]/30 text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#6e9277]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#6e9277]/20">
                                <User size={40} className="md:w-12 md:h-12 text-[#6e9277]" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#3a473d] truncate">{user?.nombre} {user?.apellido}</h2>
                            <p className="text-[#94a3b8] flex items-center justify-center gap-1 mt-1 text-xs md:text-sm truncate">
                                <Mail size={14} /> {user?.email}
                            </p>
                            <div className="mt-4 inline-block px-3 py-1 bg-[#cfa248]/10 text-[#cfa248] text-[10px] font-bold rounded-full uppercase tracking-wider">
                                {user?.rol === 'admin' ? 'Administrador' : 'Usuario'}
                            </div>
                        </div>

                        <div className="hidden lg:block bg-[#fcf8f1] rounded-2xl p-6 border border-[#d4c3a3]/20">
                            <h3 className="font-bold text-[#3a473d] mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#6e9277]" /> Seguridad
                            </h3>
                            <p className="text-sm text-[#5a6a5d] leading-relaxed italic">
                                Mantén tu cuenta protegida. Te recomendamos usar contraseñas seguras.
                            </p>
                        </div>
                    </div>

                    {/* ── Columna Derecha (Formulario y Materiales) ── */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Cambiar contraseña */}
                        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#d4c3a3]/30">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <div className="p-2.5 bg-[#cfa248]/10 rounded-xl text-[#cfa248]">
                                    <Lock size={24} className="md:w-7 md:h-7" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-3xl font-bold text-[#3a473d]">Cambiar Contraseña</h1>
                                    <p className="text-gray-400 text-xs md:text-sm">Actualiza tus credenciales de acceso</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                                {message.text && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-red-50 border border-red-100 text-red-700'}`}>
                                        {message.type === 'success' ? <CheckCircle2 size={20} className="flex-shrink-0" /> : <AlertCircle size={20} className="flex-shrink-0" />}
                                        <p className="text-xs md:text-sm font-medium">{message.text}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-[#6e9277] ml-1 uppercase tracking-wider">Contraseña Actual</label>
                                    <div className="relative">
                                        <input type={showCurrentPassword ? 'text' : 'password'} name="currentPassword" value={formData.currentPassword} onChange={handleChange} placeholder="••••••••" className="w-full p-3.5 md:p-4 text-sm md:text-base text-black/40 border-2 border-[#cfa248]/30 placeholder-black/20 rounded-xl outline-none focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-white transition-all" disabled={loading} />
                                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#cfa248]">
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-[#6e9277] ml-1 uppercase tracking-wider">Nueva Contraseña</label>
                                        <div className="relative">
                                            <input type={showNewPassword ? 'text' : 'password'} name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Mín. 6 caracteres" className="w-full p-3.5 md:p-4 text-sm md:text-base text-black/40 border-2 border-[#cfa248]/30 placeholder-black/20 rounded-xl outline-none focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-white transition-all" disabled={loading} />
                                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#cfa248]">
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-[#6e9277] ml-1 uppercase tracking-wider">Confirmar Nueva</label>
                                        <div className="relative">
                                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repite contraseña" className="w-full p-3.5 md:p-4 text-sm md:text-base text-black/40 border-2 border-[#cfa248]/30 placeholder-black/20 rounded-xl outline-none focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/10 bg-white transition-all" disabled={loading} />
                                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#cfa248]">
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-3.5 md:py-4 text-sm md:text-base font-bold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Mis Materiales (solo para usuarios, no admin) */}
                        {user?.rol !== 'admin' && <MisMateriales token={token} />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Perfil;
