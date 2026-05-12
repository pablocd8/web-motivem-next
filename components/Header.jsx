'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const Header = ({ showLogo = true }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const navLinks = [
    { label: 'Servicios', route: '/servicios' },
    { label: 'Quiénes somos', route: '/quienes-somos' },
    { label: 'Talleres', route: '/talleres' },
    { label: 'Contacto', route: '/contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? 'bg-[#efdfc2]/90 backdrop-blur-md shadow-md border-b border-[#d4c3a3]/60'
            : 'bg-[#efdfc2] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-[#d4c3a3]'
          }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-5 md:px-8 h-[68px]">

          {/* HAMBURGUESA — solo móvil, izquierda */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="md:hidden p-1.5 -ml-1 rounded-lg text-[#5a4a3a] hover:bg-[#d4c3a3]/40 transition-colors duration-200 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* NAV — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, route }) => (
              <Link
                key={route}
                href={route}
                className="px-4 py-2 text-[15px] font-medium text-[#5a4a3a] hover:text-[#cfa248] transition-colors duration-200 rounded-lg hover:bg-[#cfa248]/8"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ACCIONES — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+34644542790"
              className="flex items-center gap-1.5 text-[15px] text-[#5a4a3a]/70 hover:text-[#cfa248] transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              644 54 27 90
            </a>

            <div className="w-px h-4 bg-[#d4c3a3]" />

            {isAuthenticated && (
              <Link href="/perfil">
                <button className="text-[15px] font-medium text-[#cfa248] hover:text-[#b8903f] transition-colors duration-200 cursor-pointer">
                  Mi Perfil
                </button>
              </Link>
            )}

            {isAuthenticated && user?.rol === 'admin' && (
              <>
                <Link href="/admin/citas">
                  <button className="text-[15px] font-medium text-[#6e9277] hover:text-[#4a6a55] transition-colors duration-200 cursor-pointer">
                    Citas
                  </button>
                </Link>
                <Link href="/admin/materiales">
                  <button className="text-[15px] font-medium text-[#6e9277] hover:text-[#4a6a55] transition-colors duration-200 cursor-pointer">
                    Materiales
                  </button>
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => { logout(); router.push('/'); }}
                className="text-[15px] font-medium text-[#5a4a3a]/60 hover:text-[#bf7b56] transition-colors duration-200 cursor-pointer"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link href="/login">
                <button className="text-[15px] font-medium text-[#5a4a3a]/60 hover:text-[#5a4a3a] transition-colors duration-200 cursor-pointer">
                  Iniciar sesión
                </button>
              </Link>
            )}

            <Link href="/solicitar-cita">
              <button className="bg-[#cfa248] text-white text-[15px] font-semibold px-5 py-2 rounded-full hover:bg-[#b8903f] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap">
                Solicitar cita
              </button>
            </Link>
          </div>

          {/* CTA — solo móvil, derecha */}
          <Link href="/solicitar-cita" className="md:hidden">
            <button className="bg-[#cfa248] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#b8903f] transition-all duration-200 cursor-pointer whitespace-nowrap">
              Solicitar cita
            </button>
          </Link>

        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* DRAWER MÓVIL — mismo diseño que desktop */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[75vw] max-w-[300px] bg-[#f7f0e3] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Cabecera del drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4c3a3]/50">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo-motivem-color.png"
              alt="Motivem"
              width={120}
              height={48}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="p-1.5 rounded-lg text-[#5a4a3a] hover:bg-[#d4c3a3]/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-5 gap-0.5 flex-1">
          {navLinks.map(({ label, route }) => (
            <Link
              key={route}
              href={route}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[17px] font-medium text-[#3d2c1e] hover:bg-[#cfa248]/10 hover:text-[#cfa248] transition-colors duration-200 group"
            >
              {label}
              <ChevronRight className="w-4 h-4 text-[#d4c3a3] group-hover:text-[#cfa248] transition-colors" />
            </Link>
          ))}

          <div className="h-px bg-[#d4c3a3]/60 my-3 mx-2" />

          {/* Teléfono */}
          <a
            href="tel:644542790"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[17px] text-[#5a4a3a]/70 hover:text-[#cfa248] transition-colors duration-200"
          >
            <Phone className="w-4 h-4 text-[#cfa248]" />
            644 54 27 90
          </a>

          {isAuthenticated && (
            <Link
              href="/perfil"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[17px] font-medium text-[#cfa248] hover:bg-[#cfa248]/10 transition-colors duration-200 group"
            >
              Mi Perfil
              <ChevronRight className="w-4 h-4 text-[#d4c3a3] group-hover:text-[#cfa248] transition-colors" />
            </Link>
          )}

          {isAuthenticated && user?.rol === 'admin' && (
            <>
              <Link
                href="/admin/citas"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[17px] font-medium text-[#6e9277] hover:bg-[#6e9277]/10 transition-colors duration-200 group"
              >
                Citas
                <ChevronRight className="w-4 h-4 text-[#d4c3a3] group-hover:text-[#6e9277] transition-colors" />
              </Link>
              <Link
                href="/admin/materiales"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[17px] font-medium text-[#6e9277] hover:bg-[#6e9277]/10 transition-colors duration-200 group"
              >
                Materiales
                <ChevronRight className="w-4 h-4 text-[#d4c3a3] group-hover:text-[#6e9277] transition-colors" />
              </Link>
            </>
          )}
        </nav>

        {/* Footer del drawer */}
        <div className="px-6 pb-8 flex flex-col gap-3">
          <Link href="/solicitar-cita" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-[#cfa248] text-white text-[16px] font-semibold py-3 rounded-full hover:bg-[#b8903f] active:scale-95 transition-all duration-200 shadow-sm cursor-pointer">
              Solicitar cita
            </button>
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => { logout(); router.push('/'); setMenuOpen(false); }}
              className="w-full border border-[#d4c3a3] text-[#5a4a3a]/70 text-[15px] font-medium py-3 rounded-full hover:bg-[#d4c3a3]/30 transition-colors duration-200 cursor-pointer"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full border border-[#d4c3a3] text-[#5a4a3a] text-[15px] font-medium py-3 rounded-full hover:bg-[#d4c3a3]/30 transition-colors duration-200 cursor-pointer">
                Iniciar sesión
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
