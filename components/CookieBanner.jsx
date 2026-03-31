'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing for a smoother entry
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-4xl w-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="hidden md:flex flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full items-center justify-center text-amber-600">
          <Cookie size={32} />
        </div>
        
        <div className="flex-grow space-y-2">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Cookie className="md:hidden text-amber-600" size={20} />
            Configuración de Cookies
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar su experiencia de usuario y realizar tareas de analítica. Al continuar navegando entendemos que acepta nuestra <Link href="/politica-cookies" className="text-amber-700 hover:text-amber-800 underline font-medium decoration-2 underline-offset-4 transition-colors">política de cookies</Link>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-400 rounded-xl transition-all duration-300 bg-white/50"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-8 py-2.5 text-sm font-bold text-white bg-[#cfa248] hover:bg-[#cfa248] rounded-xl shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Aceptar todas
          </button>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
