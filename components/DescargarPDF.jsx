'use client';

import React, { useState } from "react";
import Link from "next/link";

const DescargarPDF = () => {
  const [showModal, setShowModal] = useState(false);

  const descargarPDF = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('/api/pdf/descargar', {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        setShowModal(true);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "guia-para-familias.pdf";
      link.click();
    } catch (error) {
      console.error(error);
      alert("⚠️ Error al descargar el PDF");
    }
  };

  return (
    <div>
      <button
        onClick={descargarPDF}
        className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#94a3b8] to-[#64748b] rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        📄 Descargar PDF
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-10 max-w-md w-[90%] relative shadow-2xl text-center animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="text-6xl mb-5">🔒</div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Para descargar el PDF necesitas tener una cuenta en Motivem
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <Link
                href="/login"
                className="px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#94a3b8] to-[#64748b] rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 no-underline"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="px-6 py-4 text-base font-semibold text-[#94a3b8] bg-white border-2 border-[#94a3b8] rounded-xl hover:bg-[#94a3b8] hover:text-white transition-all duration-300 no-underline"
              >
                Crear Cuenta
              </Link>
            </div>

            <p className="text-sm text-gray-400 m-0">
              Es gratis y solo toma un minuto
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescargarPDF;
