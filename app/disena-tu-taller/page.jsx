'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sendEmail } from '@/app/actions/sendEmail';
import { 
  Palette, Users, Calendar, Mail, Phone, User, 
  MessageSquare, ChevronRight, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';

const DisenaTuTaller = () => {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(event.target);
    formData.append('asunto', 'Nueva Solicitud de Taller Personalizado');
    
    const result = await sendEmail(formData);

    setIsPending(false);
    if (result.success) {
      setStatus('success');
      event.target.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#efdfc2]">
      <Header />

      <main className="flex-grow py-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#cfa248]/10 rounded-full mb-6">
              <Palette size={16} className="text-[#cfa248]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#cfa248]">Talleres a medida</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#3d2c1e] mb-6 leading-tight">
              Diseña tu propio taller
            </h1>
            <p className="text-lg text-[#5a6a5d] max-w-2xl mx-auto leading-relaxed">
              Cuéntanos qué necesitas y prepararemos una experiencia educativa y terapéutica adaptada a tu grupo.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#d4c3a3]/30 overflow-hidden">
            <div className="h-2 bg-[#cfa248]"></div>
            
            <div className="p-8 md:p-14">
              {status === 'success' ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#3d2c1e] mb-4">¡Solicitud Enviada!</h2>
                  <p className="text-[#5a6a5d] mb-8">
                    Gracias por confiar en Motivem. Revisaremos tu propuesta y te contactaremos muy pronto.
                  </p>
                  <button 
                    onClick={() => setStatus(null)}
                    className="px-8 py-4 bg-[#6e9277] text-white font-bold rounded-2xl hover:bg-[#5a7a63] transition-all shadow-lg hover:shadow-[#6e9277]/20"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* 1. Temática */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#3d2c1e] flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#cfa248]/20 flex items-center justify-center text-[#cfa248] text-sm font-bold">1</span>
                      Temática del taller
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Autoestima', 'Gestión de la frustración', 'Técnicas de estudio', 
                        'Control de impulsos', 'Afrontamiento de miedos', 'Mindfulness', 'Otros'
                      ].map((item) => (
                        <label key={item} className="relative flex items-center p-4 border-2 border-[#cfa248]/20 rounded-2xl cursor-pointer hover:bg-[#fcf8f1] transition-all has-[:checked]:border-[#cfa248] has-[:checked]:bg-[#fcf8f1] group">
                          <input type="radio" name="tematica" value={item} required className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-[#d4c3a3] rounded-full mr-3 peer-checked:border-[#cfa248] peer-checked:border-[6px] transition-all"></div>
                          <span className="text-black/50 font-medium group-hover:text-[#3d2c1e] transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 2. Edad e Integrantes */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#3d2c1e] flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#6e9277]/20 flex items-center justify-center text-[#6e9277] text-sm font-bold">2</span>
                        Edad
                      </h3>
                      <select 
                        name="edad" 
                        required 
                        className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 bg-white rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled selected>Selecciona un rango...</option>
                        <option value="3-5">3 – 5 años</option>
                        <option value="6-8">6 – 8 años</option>
                        <option value="9-12">9 – 12 años</option>
                        <option value="13-16">13 – 16 años</option>
                        <option value="17+">17 años en adelante</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#3d2c1e] flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#6e9277]/20 flex items-center justify-center text-[#6e9277] text-sm font-bold">3</span>
                        Integrantes
                      </h3>
                      <div className="relative">
                        <input 
                          type="number" 
                          name="num_integrantes" 
                          min="4" 
                          required 
                          placeholder="Mínimo 4 personas"
                          className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Responsable */}
                  <div className="space-y-6 pt-6 border-t border-[#efdfc2]">
                    <h3 className="text-xl font-bold text-[#3d2c1e] flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#cfa248]/20 flex items-center justify-center text-[#cfa248] text-sm font-bold">4</span>
                      Información del Responsable
                    </h3>
                    
                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#6e9277] ml-1">Nombre y apellidos</label>
                        <input 
                          type="text" 
                          name="responsable" 
                          required 
                          placeholder="Tu nombre completo" 
                          className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white" 
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#6e9277] ml-1">Correo electrónico</label>
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="tu@email.com" 
                            className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#6e9277] ml-1">Teléfono</label>
                          <input 
                            type="tel" 
                            name="telefono" 
                            required 
                            placeholder="600 000 000" 
                            className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#6e9277] ml-1">Observaciones o necesidades especiales</label>
                        <textarea 
                          name="observaciones" 
                          rows="4" 
                          placeholder="Cuéntanos más detalles..." 
                          className="w-full p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 bg-white resize-none" 
                        />
                      </div>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm flex items-center gap-3">
                      <AlertCircle size={20} />
                      Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-3 p-5 bg-[#cfa248] hover:bg-[#bf7b56] text-white font-bold text-lg rounded-[1.25rem] transition-all duration-300 shadow-xl hover:shadow-[#cfa248]/30 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          Enviando solicitud...
                        </>
                      ) : (
                        <>
                          Enviar solicitud
                          <ChevronRight />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisenaTuTaller;
