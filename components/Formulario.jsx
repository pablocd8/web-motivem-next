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
        <div className="w-full bg-[#efdfc2] px-4 mt-4.5">
            <div className="max-w-4xl mx-auto py-10">

                <h2 className="text-[#cfa248] text-2xl font-bold mb-8 text-center md:text-left">
                    Escríbenos y te llamaremos para saber cómo podemos ayudar
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Nombre*
                        </label>
                        <input
                            name="nombre"
                            type="text"
                            required
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors text-[#3a473d]"
                        />
                    </div>

                    {/* Apellidos */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Apellidos*
                        </label>
                        <input
                            name="apellidos"
                            type="text"
                            required
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors text-[#3a473d]"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Teléfono*
                        </label>
                        <input
                            name="telefono"
                            type="tel"
                            required
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors text-[#3a473d]"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Email*
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors text-[#3a473d]"
                        />
                    </div>

                    {/* Mensaje */}
                    <div className="flex flex-col md:col-span-2 mt-4">
                        <label className="text-sm font-semibold text-[#3a473d] mb-2">
                            Cuéntanos más aquí...
                        </label>
                        <textarea
                            name="mensaje"
                            required
                            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#76937c] text-[#3a473d]"
                        />
                    </div>

                    {/* Política */}
                    <div className="md:col-span-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            required
                            className="accent-[#76937c]"
                        />
                        <label
                            htmlFor="privacy"
                            className="text-xs text-gray-700 cursor-pointer"
                        >
                            Acepto las políticas de privacidad
                        </label>
                    </div>

                    {/* Botón y Mensajes de estado */}
                    <div className="md:col-span-2 mt-4 flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`border border-[#76937c] text-[#76937c] px-8 py-2 rounded-md transition-all uppercase text-sm tracking-widest ${
                                isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#76937c] hover:text-white cursor-pointer'
                            }`}
                        >
                            {isPending ? 'Enviando...' : 'Enviar'}
                        </button>

                        {status === 'success' && (
                            <p className="text-sm text-green-700 font-medium">
                                ¡Mensaje enviado con éxito! Te contactaremos pronto.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="text-sm text-red-600 font-medium">
                                Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.
                            </p>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Formulario;
