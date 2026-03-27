'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { obtenerHuecosLibres, crearCita } from "@/app/actions/accionesCita";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function SolicitarCita() {
    const [fecha, setFecha] = useState("");
    const [huecos, setHuecos] = useState([]);
    const [huecoSeleccionado, setHuecoSeleccionado] = useState(null);
    const [estaPendiente, setEstaPendiente] = useState(false);
    const [cargandoHuecos, setCargandoHuecos] = useState(false);
    const [estadoReserva, setEstadoReserva] = useState(null); 
    const [mensajeErrorFecha, setMensajeErrorFecha] = useState("");
    const { isAuthenticated,loading} = useAuth();
    const router = useRouter();




    // Cargar huecos cuando cambia la fecha
    useEffect(() => {
        if (fecha) {
            buscarDisponibilidad(fecha);
        }
    }, [fecha]);

    async function buscarDisponibilidad(fechaSel) {
        const d = new Date(fechaSel);
        const day = d.getUTCDay(); // 0: Sunday, 6: Saturday
        
        if (day === 0 || day === 6) {
            setMensajeErrorFecha("Los fines de semana no hay citas disponibles. Por favor, selecciona un día de lunes a viernes.");
            setHuecos([]);
            setHuecoSeleccionado(null);
            return;
        }

        setMensajeErrorFecha("");
        setCargandoHuecos(true);
        setHuecos([]);
        setHuecoSeleccionado(null);
        
        const resultado = await obtenerHuecosLibres(fechaSel);
        if (resultado.success) {
            setHuecos(resultado.huecos);
        } else {
            console.error(resultado.error);
        }
        setCargandoHuecos(false);
    }

    async function gestionarEnvio(evento) {
        evento.preventDefault();
        if (!huecoSeleccionado) return;

        setEstaPendiente(true);
        setEstadoReserva(null);

        const datosForm = new FormData(evento.target);
        datosForm.set('fechaHora', huecoSeleccionado);

        const resultado = await crearCita(datosForm);
        
        setEstaPendiente(false);
        if (resultado.success) {
            setEstadoReserva('exito');
            evento.target.reset();
            setFecha("");
            setHuecos([]);
            setHuecoSeleccionado(null);
        } else {
            setEstadoReserva('error');
        }
    }

    if (!isAuthenticated) {
        return (
            <>
                <Header showLogo={true} />
                <main className="min-h-screen bg-[#efdfc2] py-12 px-6 flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl text-center border border-[#d4c3a3]">
                        <div className="text-6xl mb-5">🔒</div>
                        <h2 className="text-3xl font-bold text-[#6e9277] mb-4">Acceso Restringido</h2>
                        <p className="text-base text-gray-600 mb-8 leading-relaxed">
                            Para solicitar una cita necesitas tener una cuenta en Motivem.
                            Así podrás gestionar tus reservas fácilmente.
                        </p>

                        <div className="flex flex-col gap-3 mb-5">
                            <button
                                onClick={() => router.push('/login?redirect=/solicitar-cita')}
                                className="px-6 py-4 text-base font-semibold text-white bg-[#cfa248] rounded-xl hover:bg-[#bf7b56] hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                onClick={() => router.push('/register')}
                                className="px-6 py-4 text-base font-semibold text-[#6e9277] bg-white border-2 border-[#6e9277] rounded-xl hover:bg-[#6e9277] hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Crear Cuenta
                            </button>
                        </div>

                        <p className="text-sm text-gray-400">
                            Es gratis y solo toma un minuto
                        </p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }



    return (
        <>
            <Header showLogo={true} />
            <main className="min-h-screen bg-[#efdfc2] py-8 md:py-12 px-2 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-[#d4c3a3]">
                    <div className="bg-[#cfa248] p-6 md:p-8 text-center md:text-left text-white">
                        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">Solicitar Cita</h1>
                        <p className="opacity-90">Reserva tu sesión de psicoterapia de forma sencilla</p>
                    </div>

                    <div className="p-5 md:p-12">
                        {estadoReserva === 'exito' ? (
                            <div className="text-center py-10">
                                <div className="text-6xl mb-4">✅</div>
                                <h2 className="text-2xl font-bold text-[#3a473d] mb-4">¡Cita Reservada!</h2>
                                <p className="text-gray-600 mb-8">Te llegará un correo con los detalles en unos momentos.</p>
                                <button 
                                    onClick={() => setEstadoReserva(null)}
                                    className="bg-[#76937c] text-white px-8 py-3 rounded-full hover:bg-[#3a473d] transition font-medium"
                                >
                                    Solicitar otra cita
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={gestionarEnvio} className="space-y-8">
                                {/* Paso 1: Selección de Fecha */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-[#cfa248] flex items-center gap-2">
                                        <span className="w-8 h-8 bg-[#cfa248] text-white rounded-full flex items-center justify-center text-sm">1</span>
                                        Elige un día
                                    </h3>
                                    <div className="max-w-sm">
                                        <input 
                                            type="date" 
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                            className={`w-full md:w-64 p-3 border rounded-lg focus:ring-2 focus:ring-[#cfa248] outline-none shadow-sm text-[#5a6a5d] appearance-none ${
                                                mensajeErrorFecha ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                                            }`}
                                        />
                                        {mensajeErrorFecha && (
                                            <p className="mt-2 text-sm text-red-600 font-medium">{mensajeErrorFecha}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Paso 2: Selección de Hora */}
                                {fecha && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <h3 className="text-lg font-bold text-[#cfa248] flex items-center gap-2">
                                            <span className="w-8 h-8 bg-[#cfa248] text-white rounded-full flex items-center justify-center text-sm">2</span>
                                            Elige una hora disponible
                                        </h3>
                                        {cargandoHuecos ? (
                                            <p className="text-gray-500 flex items-center gap-2">
                                                <span className="animate-spin text-xl">⏳</span> Buscando huecos...
                                            </p>
                                        ) : huecos.length > 0 ? (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                {huecos.map((hueco) => {
                                                    const horaStr = new Date(hueco).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                    const estaSeleccionado = huecoSeleccionado === hueco;
                                                    return (
                                                        <button
                                                            key={hueco}
                                                            type="button"
                                                            onClick={() => setHuecoSeleccionado(hueco)}
                                                            className={`p-3 rounded-lg border transition-all font-medium text-sm ${
                                                                estaSeleccionado 
                                                                ? 'bg-[#cfa248] border-[#cfa248] text-white scale-105 shadow-md' 
                                                                : 'bg-white border-gray-200 text-gray-700 hover:border-[#cfa248] hover:bg-[#fffcf5]'
                                                            }`}
                                                        >
                                                            {horaStr}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100 italic">No hay horarios disponibles para este día.</p>
                                        )}
                                    </div>
                                )}

                                {/* Paso 3: Tus datos */}
                                {huecoSeleccionado && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                                        <h3 className="text-lg font-bold text-[#cfa248] flex items-center gap-2">
                                            <span className="w-8 h-8 bg-[#cfa248] text-white rounded-full flex items-center justify-center text-sm">3</span>
                                            Tus datos de contacto
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-[#3a473d]">Nombre y Apellidos*</label>
                                                <input name="nombre" required type="text" placeholder="Ej: Juan Pérez" className="p-3 border-b border-gray-200 bg-transparent text-[#5a6a5d] placeholder:text-gray-400 focus:border-[#cfa248] outline-none" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-[#3a473d]">Email*</label>
                                                <input name="email" required type="email" placeholder="tu@email.com" className="p-3 border-b border-gray-200 bg-transparent text-[#5a6a5d] placeholder:text-gray-400 focus:border-[#cfa248] outline-none" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-[#3a473d]">Teléfono*</label>
                                                <input name="telefono" required type="tel" placeholder="Ej: 600000000" className="p-3 border-b border-gray-200 bg-transparent text-[#5a6a5d] placeholder:text-gray-400 focus:border-[#cfa248] outline-none" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-[#3a473d]">Servicio*</label>
                                                <select name="servicio" required className="p-3 border-b border-gray-200 bg-transparent text-[#5a6a5d] focus:border-[#cfa248] outline-none cursor-pointer">
                                                    <option value="Psicoterapia individual">Psicoterapia individual</option>
                                                    <option value="Psicoterapia de pareja">Psicoterapia de pareja</option>
                                                    <option value="Psicopedagogía">Psicopedagogía</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2 flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-[#3a473d]">¿Quieres contarnos algo más?</label>
                                                <textarea name="notas" rows="2" placeholder="Opcional..." className="p-3 border border-gray-200 rounded-lg bg-transparent text-[#5a6a5d] placeholder:text-gray-400 focus:border-[#cfa248] outline-none resize-none"></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={estaPendiente}
                                            className={`w-full bg-[#76937c] text-white py-4 rounded-xl text-lg font-bold uppercase tracking-widest transition shadow-lg ${
                                                estaPendiente ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3a473d] hover:shadow-xl cursor-pointer'
                                            }`}
                                        >
                                            {estaPendiente ? 'Reservando...' : 'Confirmar Reserva'}
                                        </button>
                                        
                                        {estadoReserva === 'error' && (
                                            <p className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                                                Lo sentimos, ha ocurrido un error. Inténtalo de nuevo.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
