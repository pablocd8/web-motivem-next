'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from "lucide-react";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header = ({ showLogo = true }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const menuItems = [
    { label: 'SERVICIOS', color: '#6e9277', route: '/servicios' },
    { label: 'MATERIALES', color: '#cfa248', route: '/materiales' },
    { label: 'QUIENES SOMOS', color: '#bf7b56', route: '/quienes-somos' },
    { label: 'CONTACTO', color: '#94a3b8', route: '/contacto' },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#efdfc2] flex flex-col items-center justify-center h-20
             shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-b border-[#d4c3a3]"
    >
      {/* Botón de menú móvil */}
      <button
        className="md:hidden absolute top-6 left-4 md:left-6 z-20"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <svg width="32" height="32" fill="none" stroke="#8b5e3b" strokeWidth="3" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Teléfono y CTA */}
      <div className="absolute top-6 right-3 md:right-6 z-20 flex items-center gap-2 md:gap-4 font-medium text-[#8b5e3b]">
        <span className="hidden md:flex items-center gap-1 text-base">
          <Phone className="w-5 h-5 text-black" />
          644 54 27 90
        </span>
        <Link href="/solicitar-cita">
          <button className="bg-[#cfa248] text-white text-[13px] md:text-base px-3 py-2 md:px-5 md:py-2 rounded shadow hover:bg-[#bf7b56] transition cursor-pointer whitespace-nowrap">
            Solicitar cita
          </button>
        </Link>

        {isAuthenticated && user?.rol === 'admin' && (
          <Link href="/admin/citas" className="hidden md:block">
            <button className="bg-[#76937c] text-white text-[13px] md:text-base px-3 py-2 md:px-5 md:py-2 rounded shadow hover:bg-[#3a473d] transition cursor-pointer whitespace-nowrap">
              Panel de Control
            </button>
          </Link>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="border-2 border-[#6e9277] text-[#6e9277] bg-transparent hover:bg-[#6e9277] hover:text-white text-[13px] md:text-base px-3 py-1.5 md:px-5 md:py-1.5 rounded transition cursor-pointer whitespace-nowrap"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link href="/login">
            <button className="border-2 border-[#6e9277] text-[#6e9277] bg-transparent hover:bg-[#6e9277] hover:text-white text-[13px] md:text-base px-3 py-1.5 md:px-5 md:py-1.5 rounded transition cursor-pointer whitespace-nowrap">
              Iniciar sesión
            </button>
          </Link>
        )}
      </div>

      {/* Menú horizontal */}
      <div className="hidden md:flex items-center gap-3 absolute top-6 left-5 z-20">
        {menuItems.map(({ label, color, route }) => (
          <button
            key={label}
            onClick={() => router.push(route)}
            className="px-2 py-2 rounded text-white text-sm hover:opacity-90 transition shadow cursor-pointer"
            style={{ backgroundColor: color }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 flex md:hidden">
          <div className="relative bg-[#efdfc2] w-2/3 h-full shadow-lg p-6 flex flex-col gap-4 transform transition-transform duration-300 ease-out translate-x-0">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="absolute top-4 right-4 p-1"
            >
              <svg width="28" height="28" fill="none" stroke="#8b5e3b" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <div className="mt-12 flex flex-col gap-3">
              <img src="/logo-motivem-color.png" alt="Logo Motivem" className="block mb-4 max-w-[150px] mx-auto" />
              {menuItems.map(({ label, color, route }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(route);
                  }}
                  className="text-sm py-3 rounded-lg font-bold uppercase tracking-wider cursor-pointer shadow-sm active:scale-95 transition-all"
                  style={{ backgroundColor: color, color: '#fff' }}
                >
                  {label}
                </button>
              ))}

              <div className="w-full h-px bg-[#d4c3a3] my-4"></div>

              {isAuthenticated && user?.rol === 'admin' && (
                <Link href="/admin/citas" onClick={() => setMenuOpen(false)} className="w-full">
                  <button className="w-full bg-[#76937c] text-white py-4 rounded-xl font-black shadow-lg hover:bg-[#3a473d] transition-all uppercase text-xs tracking-[0.2em]">
                    ⚙️ PANEL DE CONTROL
                  </button>
                </Link>
              )}

              <Link href="/solicitar-cita" onClick={() => setMenuOpen(false)} className="w-full">
                <button className="w-full bg-[#cfa248] text-white py-4 rounded-xl font-black shadow-lg hover:bg-[#bf7b56] transition-all uppercase text-xs tracking-[0.2em]">
                  📅 SOLICITAR CITA
                </button>
              </Link>

              {!isAuthenticated && (
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full border-2 border-[#6e9277] text-[#6e9277] py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#6e9277] hover:text-white transition-all mt-2">
                    Iniciar Sesión
                  </button>
                </Link>
              )}

              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-[10px] text-[#8b5e3b] font-bold uppercase tracking-widest opacity-60">Contacto directo</span>
                <span className="flex items-center gap-2 text-lg font-black text-[#5a6a5d]">
                  <Phone className="w-5 h-5 text-[#cfa248]" />
                  644 54 27 90
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
