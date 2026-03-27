'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminCitas() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.rol !== 'admin') {
        router.push('/');
      } else {
        cargarCitas();
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || (!isAuthenticated || user?.rol !== 'admin')) {
    return (
      <div className="min-h-screen bg-[#efdfc2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfa248] mx-auto mb-4"></div>
          <p className="text-[#3a473d] font-bold">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  async function cargarCitas() {
    const res = await fetch('/api/admin/citas');
    const data = await res.json();
    if (data.success) {
      setCitas(data.citas);
    }
    setCargando(false);
  }

  async function actualizarEstado(id, nuevoEstado) {
    const res = await fetch('/api/admin/citas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado: nuevoEstado })
    });
    if (res.ok) cargarCitas();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#efdfc2] py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3a473d] uppercase tracking-widest mb-2">Gestión de Citas</h1>
            <p className="text-[#cfa248] font-medium text-sm md:text-base">Panel de control del psicólogo</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-[#d4c3a3] overflow-hidden">
            {/* Vista Escritorio (Escondido en móvil) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#cfa248] text-white uppercase text-xs font-black tracking-widest">
                  <tr>
                    <th className="p-6">Paciente</th>
                    <th className="p-6 text-center">Fecha y Hora</th>
                    <th className="p-6 text-center">Servicio</th>
                    <th className="p-6 text-center">Estado</th>
                    <th className="p-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efdfc2]">
                  {cargando ? (
                    <tr><td colSpan="5" className="p-20 text-center text-[#76937c] font-bold animate-pulse text-lg">Cargando base de datos...</td></tr>
                  ) : citas.length === 0 ? (
                    <tr><td colSpan="5" className="p-20 text-center text-gray-400 italic">No se han encontrado registros de citas.</td></tr>
                  ) : citas.map((cita) => (
                    <tr key={cita._id} className="hover:bg-[#fffcf5] transition duration-300">
                      <td className="p-6">
                        <div className="font-bold text-[#3a473d] text-base">{cita.nombrePaciente}</div>
                        <div className="text-sm text-gray-500">{cita.emailPaciente}</div>
                        <div className="text-xs text-[#76937c] font-semibold mt-1">{cita.telefonoPaciente}</div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="font-bold text-[#3a473d]">{new Date(cita.fechaHora).toLocaleDateString()}</div>
                        <div className="text-lg text-[#cfa248] font-black">
                          {new Date(cita.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-xs bg-[#f5eedc] px-3 py-1.5 rounded-full text-[#7a6a4d] font-bold border border-[#d4c3a3]/30">
                          {cita.servicio}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                          cita.estado === 'confirmada' ? 'bg-green-50 text-green-600 border-green-200' :
                          cita.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                          cita.estado === 'cancelada' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {cita.estado}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <select 
                          onChange={(e) => actualizarEstado(cita._id, e.target.value)}
                          value={cita.estado}
                          className="text-xs border-2 border-[#d4c3a3] rounded-xl p-2 bg-white text-[#3a473d] font-bold shadow-sm hover:border-[#cfa248] outline-none transition cursor-pointer"
                        >
                          <option value="pendiente">⏰ Pendiente</option>
                          <option value="confirmada">✅ Confirmar</option>
                          <option value="cancelada">❌ Cancelar</option>
                          <option value="completada">🏁 Completada</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista Móvil (Tarjetas) */}
            <div className="md:hidden divide-y divide-[#efdfc2]">
              {cargando ? (
                <div className="p-10 text-center text-[#76937c] font-bold animate-pulse">Cargando citas...</div>
              ) : citas.length === 0 ? (
                <div className="p-10 text-center text-gray-400 italic">No hay citas registradas.</div>
              ) : citas.map((cita) => (
                <div key={cita._id} className="p-6 flex flex-col gap-4 bg-[#fffcf5]/50 hover:bg-[#fff9ed] transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-[#3a473d] text-lg leading-tight">{cita.nombrePaciente}</div>
                      <div className="text-xs text-[#76937c] font-semibold mt-1">{cita.telefonoPaciente}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm border ${
                      cita.estado === 'confirmada' ? 'bg-green-50 text-green-600 border-green-200' :
                      cita.estado === 'pendiente' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                      cita.estado === 'cancelada' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                      {cita.estado}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-y border-[#efdfc2]/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-gray-400 font-bold">Fecha</span>
                      <span className="font-bold text-[#3a473d]">{new Date(cita.fechaHora).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase text-gray-400 font-bold">Hora</span>
                      <span className="text-xl text-[#cfa248] font-black">
                        {new Date(cita.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-gray-400 font-bold">Servicio solicitado</span>
                    <span className="text-sm text-[#7a6a4d] font-medium italic">"{cita.servicio}"</span>
                  </div>

                  <div className="mt-2">
                    <select 
                      onChange={(e) => actualizarEstado(cita._id, e.target.value)}
                      value={cita.estado}
                      className="w-full text-sm border-2 border-[#d4c3a3] rounded-xl p-3 bg-white text-[#3a473d] font-bold shadow-md hover:border-[#cfa248] outline-none transition cursor-pointer"
                    >
                      <option value="pendiente">⏰ Cambiar a Pendiente</option>
                      <option value="confirmada">✅ Confirmar Cita</option>
                      <option value="cancelada">❌ Cancelar Cita</option>
                      <option value="completada">🏁 Cita Completada</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
