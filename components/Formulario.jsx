'use client';

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

const Formulario = () => {
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    async function handleSubmit(event) {
        event.preventDefault();
        setIsPending(true);
        setStatus(null);

        const formData = new FormData(event.target);
        const result = await sendEmail(formData);

        setIsPending(false);
        if (result.success) {
            setStatus('success');
            event.target.reset(); // Limpiar formulario
        } else {
            setStatus('error');
        }
    }

    return (
        <div className="w-full px-4 mt-12 mb-20">
            <div className="max-w-4xl mx-auto bg-[#efdfc2] rounded-3xl shadow-2xl p-8 md:p-12 border border-[#d4c3a3]/30">

                <h2 className="text-[#cfa248] text-2xl font-bold mb-8 text-center md:text-left">
                    Escríbenos y te llamaremos para saber cómo podemos ayudar
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">

                    {/* Nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">
                            Nombre*
                        </label>
                        <input
                            name="nombre"
                            type="text"
                            required
                            placeholder="Tu nombre"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                        />
                    </div>

                    {/* Apellidos */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">
                            Apellidos*
                        </label>
                        <input
                            name="apellidos"
                            type="text"
                            required
                            placeholder="Tus apellidos"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">
                            Teléfono*
                        </label>
                        <input
                            name="telefono"
                            type="tel"
                            required
                            placeholder="Ej: 600 000 000"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">
                            Email*
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="tu@email.com"
                            className="p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20"
                        />
                    </div>

                    {/* Mensaje */}
                    <div className="flex flex-col md:col-span-2 mt-2 gap-2">
                        <label className="text-sm font-semibold text-[#6e9277]">
                            Cuéntanos más aquí...
                        </label>
                        <textarea
                            name="mensaje"
                            required
                            placeholder="Describe brevemente cómo podemos ayudarte"
                            className="w-full h-36 p-4 text-base text-black/40 border-2 border-[#cfa248]/50 placeholder-black/40 rounded-xl outline-none transition-all duration-300 focus:border-[#cfa248] focus:ring-2 focus:ring-[#cfa248]/20 resize-none"
                        />
                    </div>

                    {/* Política */}
                    <div className="md:col-span-2 flex items-center gap-3 mt-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            required
                            className="w-5 h-5 accent-[#cfa248] cursor-pointer"
                        />
                        <label
                            htmlFor="privacy"
                            className="text-sm text-[#5a6a5d] cursor-pointer hover:text-[#cfa248] transition-colors"
                        >
                            Acepto las políticas de privacidad
                        </label>
                    </div>

                    {/* Botón y Mensajes de estado */}
                    <div className="md:col-span-2 mt-4 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`p-4 text-base font-semibold text-white bg-[#cfa248] hover:bg-[#bf7b56] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                                isPending ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            {isPending ? 'Enviando...' : 'Enviar mensaje'}
                        </button>

                        {status === 'success' && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm flex items-center gap-3">
                                <span className="text-lg">✅</span>
                                ¡Mensaje enviado con éxito! Te contactaremos pronto.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex items-center gap-3">
                                <span className="text-lg">⚠️</span>
                                Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Formulario;
