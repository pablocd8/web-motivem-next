'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from "lucide-react";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header = ({ showLogo = true }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

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
        className="md:hidden absolute top-6 left-6 z-20"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <svg width="32" height="32" fill="none" stroke="#8b5e3b" strokeWidth="3" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Teléfono y CTA */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4 font-medium text-[#8b5e3b]">
        <span className="flex items-center gap-1 text-base">
          <Phone className="w-5 h-5 text-black" />
          644 54 27 90
        </span>
        <Link href="/contacto">
          <button className="bg-[#cfa248] text-white text-base px-5 py-2 rounded shadow hover:bg-[#bf7b56] transition cursor-pointer">
            Solicitar cita
          </button>
        </Link>
        
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="border-2 border-[#6e9277] text-[#6e9277] bg-transparent hover:bg-[#6e9277] hover:text-white text-base px-5 py-1.5 rounded transition cursor-pointer"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link href="/login">
            <button className="border-2 border-[#6e9277] text-[#6e9277] bg-transparent hover:bg-[#6e9277] hover:text-white text-base px-5 py-1.5 rounded transition cursor-pointer">
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

            <div className="mt-12 flex flex-col gap-4">
              <img src="/logo-motivem-color.png" alt="Logo Motivem" className="block" />
              {menuItems.map(({ label, color, route }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(route);
                  }}
                  className="text-base py-2 rounded mb-2 cursor-pointer"
                  style={{ backgroundColor: color, color: '#fff' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
