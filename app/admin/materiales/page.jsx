'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Users, User, Upload, Trash2, Download, FileText,
  Loader2, FilePlus, X, CheckCircle2, AlertCircle, BookOpen
} from 'lucide-react';

/* ─── helpers ─── */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
function iconPorTipo(tipo) {
  if (tipo?.includes('pdf')) return '📄';
  if (tipo?.includes('word') || tipo?.includes('document')) return '📝';
  if (tipo?.includes('sheet') || tipo?.includes('excel')) return '📊';
  if (tipo?.includes('presentation') || tipo?.includes('powerpoint')) return '📊';
  if (tipo?.includes('image')) return '🖼️';
  return '📎';
}

export default function AdminMateriales() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [cargandoPacientes, setCargandoPacientes] = useState(true);
  const [cargandoMat, setCargandoMat] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [archivo, setArchivo] = useState(null);
  const [nombrePersonalizado, setNombrePersonalizado] = useState('');
  const [msg, setMsg] = useState({ tipo: '', texto: '' });
  const [drag, setDrag] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const inputRef = useRef();

  const headers = { Authorization: `Bearer ${token}` };

  /* Guard de seguridad */
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.rol !== 'admin') router.push('/');
      else cargarPacientes();
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || !isAuthenticated || user?.rol !== 'admin') {
    return (
      <div className="min-h-screen bg-[#efdfc2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfa248] mx-auto mb-4" />
          <p className="text-[#3a473d] font-bold">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  async function cargarPacientes() {
    setCargandoPacientes(true);
    const r = await fetch('/api/admin/materiales', { headers });
    const d = await r.json();
    if (d.success) setPacientes(d.pacientes);
    setCargandoPacientes(false);
  }

  async function cargarMateriales(pid) {
    setCargandoMat(true);
    const r = await fetch(`/api/admin/materiales?pacienteId=${pid}`, { headers });
    const d = await r.json();
    if (d.success) setMateriales(d.materiales);
    setCargandoMat(false);
  }

  function seleccionarPaciente(p) {
    setPacienteSeleccionado(p);
    setMateriales([]);
    setArchivo(null);
    setNombrePersonalizado('');
    setMsg({ tipo: '', texto: '' });
    cargarMateriales(p._id);
  }

  function manejarArchivo(f) {
    setArchivo(f);
    if (!nombrePersonalizado) setNombrePersonalizado(f.name.replace(/\.[^/.]+$/, ''));
    setMsg({ tipo: '', texto: '' });
  }

  async function subirArchivo() {
    if (!archivo || !pacienteSeleccionado) return;
    setSubiendo(true);
    setMsg({ tipo: '', texto: '' });

    const fd = new FormData();
    fd.append('archivo', archivo);
    fd.append('pacienteId', pacienteSeleccionado._id);
    fd.append('nombre', nombrePersonalizado || archivo.name);

    const r = await fetch('/api/admin/materiales', { method: 'POST', headers, body: fd });
    const d = await r.json();

    if (d.success) {
      setMsg({ tipo: 'ok', texto: '¡Archivo subido correctamente!' });
      setArchivo(null);
      setNombrePersonalizado('');
      if (inputRef.current) inputRef.current.value = '';
      cargarMateriales(pacienteSeleccionado._id);
    } else {
      setMsg({ tipo: 'err', texto: d.error || 'Error al subir el archivo.' });
    }
    setSubiendo(false);
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminar este material? Esta acción no se puede deshacer.')) return;
    const r = await fetch('/api/admin/materiales', {
      method: 'DELETE',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ materialId: id }),
    });
    const d = await r.json();
    if (d.success) cargarMateriales(pacienteSeleccionado._id);
  }

  async function descargar(id, nombre) {
    const r = await fetch(`/api/materiales/${id}`, { headers });
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = nombre; a.click();
    URL.revokeObjectURL(url);
  }

  const pacientesFiltrados = pacientes.filter(p =>
    `${p.nombre} ${p.apellido} ${p.email}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#efdfc2] to-[#d4c9b3] py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Título */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3a473d] uppercase tracking-widest mb-2">
              Gestión de Materiales
            </h1>
            <p className="text-[#cfa248] font-medium text-sm md:text-base">
              Sube y gestiona documentos para cada paciente
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">

            {/* ── Panel izquierdo: lista de pacientes ── */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#d4c3a3] overflow-hidden">
                <div className="bg-[#cfa248] px-6 py-4 flex items-center gap-3">
                  <Users size={20} className="text-white" />
                  <h2 className="text-white font-black uppercase text-sm tracking-widest">Pacientes</h2>
                  <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {pacientes.length}
                  </span>
                </div>

                {/* Buscador */}
                <div className="px-4 pt-4 pb-2">
                  <input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border-2 border-[#d4c3a3]/60 rounded-xl outline-none focus:border-[#cfa248] bg-[#fcf8f1] text-[#3a473d] placeholder-gray-400 transition-colors"
                  />
                </div>

                {/* Lista */}
                <div className="overflow-y-auto max-h-[500px] divide-y divide-[#efdfc2] px-2 pb-3">
                  {cargandoPacientes ? (
                    <div className="flex items-center justify-center py-12 gap-2 text-[#76937c]">
                      <Loader2 size={20} className="animate-spin" />
                      <span className="font-medium text-sm">Cargando pacientes...</span>
                    </div>
                  ) : pacientesFiltrados.length === 0 ? (
                    <div className="py-10 text-center text-gray-400 italic text-sm px-4">
                      {busqueda ? 'No se encontraron pacientes.' : 'No hay pacientes registrados.'}
                    </div>
                  ) : pacientesFiltrados.map(p => (
                    <button
                      key={p._id}
                      onClick={() => seleccionarPaciente(p)}
                      className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition-all my-1 ${
                        pacienteSeleccionado?._id === p._id
                          ? 'bg-[#cfa248]/10 border-2 border-[#cfa248]/50'
                          : 'hover:bg-[#f5eedc] border-2 border-transparent'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        pacienteSeleccionado?._id === p._id ? 'bg-[#cfa248] text-white' : 'bg-[#6e9277]/10 text-[#6e9277]'
                      }`}>
                        <User size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#3a473d] text-sm truncate">{p.nombre} {p.apellido}</p>
                        <p className="text-xs text-gray-400 truncate">{p.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Panel derecho: subir + lista materiales ── */}
            <div className="lg:col-span-3 space-y-5">

              {!pacienteSeleccionado ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#d4c3a3] flex flex-col items-center justify-center py-20 px-8 text-center">
                  <BookOpen size={56} className="text-[#d4c3a3] mb-4" />
                  <p className="text-lg font-bold text-[#3a473d]">Selecciona un paciente</p>
                  <p className="text-sm text-gray-400 mt-1">Elige un paciente de la lista para ver y gestionar sus materiales.</p>
                </div>
              ) : (
                <>
                  {/* Info paciente seleccionado */}
                  <div className="bg-[#6e9277]/10 border border-[#6e9277]/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#6e9277] flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#3a473d] text-sm">{pacienteSeleccionado.nombre} {pacienteSeleccionado.apellido}</p>
                      <p className="text-xs text-[#6e9277]">{pacienteSeleccionado.email}</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-[#6e9277] bg-[#6e9277]/10 px-2.5 py-1 rounded-full">
                      {materiales.length} doc{materiales.length !== 1 ? 's' : '.'}
                    </span>
                  </div>

                  {/* Subir archivo */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#d4c3a3] p-6">
                    <h3 className="font-black text-[#3a473d] uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                      <Upload size={14} className="text-[#cfa248]" /> Subir nuevo documento
                    </h3>

                    {/* Drag & drop */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) manejarArchivo(f); }}
                      onClick={() => inputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all duration-200 ${
                        drag ? 'border-[#cfa248] bg-[#cfa248]/5 scale-[1.01]'
                        : archivo ? 'border-[#6e9277] bg-[#6e9277]/5'
                        : 'border-[#d4c3a3] hover:border-[#cfa248]/60 hover:bg-[#fcf8f1]'
                      }`}
                    >
                      <input
                        ref={inputRef} type="file" className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp"
                        onChange={(e) => { if (e.target.files[0]) manejarArchivo(e.target.files[0]); }}
                      />
                      {archivo ? (
                        <div className="flex items-center justify-center gap-4">
                          <span className="text-4xl">{iconPorTipo(archivo.type)}</span>
                          <div className="text-left">
                            <p className="font-bold text-[#3a473d] text-sm">{archivo.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{formatBytes(archivo.size)}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setArchivo(null); setNombrePersonalizado(''); }}
                            className="ml-2 p-1.5 rounded-full hover:bg-red-50 text-red-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <FilePlus size={40} className="mx-auto text-[#d4c3a3] mb-2" />
                          <p className="text-sm font-semibold text-[#6e9277]">Arrastra un archivo o haz clic para seleccionar</p>
                          <p className="text-xs text-gray-400 mt-1.5">PDF, Word, Excel, PowerPoint, Imágenes · Máx. 20 MB</p>
                        </>
                      )}
                    </div>

                    {/* Nombre personalizado */}
                    {archivo && (
                      <div className="mt-4">
                        <label className="text-xs font-bold text-[#6e9277] uppercase tracking-wider ml-1">
                          Nombre visible del documento
                        </label>
                        <input
                          type="text"
                          value={nombrePersonalizado}
                          onChange={e => setNombrePersonalizado(e.target.value)}
                          placeholder="Ej: Ejercicios de relajación — Semana 1"
                          className="w-full mt-2 p-3 text-sm border-2 border-[#cfa248]/40 rounded-xl outline-none focus:border-[#cfa248] bg-white text-[#3a473d] placeholder-gray-300 transition-colors"
                        />
                      </div>
                    )}

                    {/* Feedback */}
                    {msg.texto && (
                      <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 text-sm font-medium ${
                        msg.tipo === 'ok'
                          ? 'bg-green-50 text-green-700 border border-green-100'
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {msg.tipo === 'ok' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {msg.texto}
                      </div>
                    )}

                    <button
                      onClick={subirArchivo}
                      disabled={!archivo || subiendo}
                      className={`mt-4 flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all duration-200 ${
                        !archivo || subiendo
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#cfa248] hover:bg-[#bf7b56] hover:shadow-lg hover:scale-[1.02]'
                      }`}
                    >
                      {subiendo ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                      {subiendo ? 'Subiendo...' : 'Subir documento'}
                    </button>
                  </div>

                  {/* Lista de materiales */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#d4c3a3] overflow-hidden">
                    <div className="bg-[#6e9277] px-6 py-4 flex items-center gap-3">
                      <FileText size={18} className="text-white" />
                      <h3 className="text-white font-black uppercase text-xs tracking-widest">
                        Documentos del paciente
                      </h3>
                      <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {materiales.length}
                      </span>
                    </div>

                    {cargandoMat ? (
                      <div className="flex items-center justify-center py-12 gap-2 text-[#76937c]">
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-sm font-medium">Cargando documentos...</span>
                      </div>
                    ) : materiales.length === 0 ? (
                      <div className="py-12 text-center px-6">
                        <FileText size={40} className="mx-auto text-gray-200 mb-3" />
                        <p className="text-gray-400 italic text-sm">Este paciente no tiene documentos aún.</p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-[#efdfc2]">
                        {materiales.map(m => (
                          <li key={m._id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#fffcf5] transition-colors group">
                            <span className="text-2xl flex-shrink-0">{iconPorTipo(m.tipo)}</span>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-[#3a473d] text-sm truncate">{m.nombre}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {formatBytes(m.tamano)} · {new Date(m.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={() => descargar(m._id, m.nombre)}
                                title="Descargar"
                                className="p-2 rounded-xl text-[#6e9277] hover:bg-[#6e9277]/10 transition-colors"
                              >
                                <Download size={16} />
                              </button>
                              <button
                                onClick={() => eliminar(m._id)}
                                title="Eliminar"
                                className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
