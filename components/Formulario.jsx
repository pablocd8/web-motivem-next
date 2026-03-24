import React from "react";

const Formulario = () => {
    return (
        <div className="w-full bg-[#efdfc2] px-4 mt-4.5">
            <div className="max-w-4xl mx-auto py-10">

                <h2 className="text-[#cfa248] text-2xl font-bold mb-8 text-center md:text-left">
                    Escríbenos y te llamaremos para saber cómo podemos ayudar
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Nombre*
                        </label>
                        <input
                            type="text"
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors"
                        />
                    </div>

                    {/* Apellidos */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Apellidos*
                        </label>
                        <input
                            type="text"
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Teléfono*
                        </label>
                        <input
                            type="tel"
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#3a473d]">
                            Email*
                        </label>
                        <input
                            type="email"
                            className="bg-transparent border-b border-gray-500 py-2 focus:outline-none focus:border-[#76937c] transition-colors"
                        />
                    </div>

                    {/* Mensaje */}
                    <div className="flex flex-col md:col-span-2 mt-4">
                        <label className="text-sm font-semibold text-[#3a473d] mb-2">
                            Cuéntanos más aquí...
                        </label>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#76937c]"
                        />
                    </div>

                    {/* Política */}
                    <div className="md:col-span-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            className="accent-[#76937c]"
                        />
                        <label
                            htmlFor="privacy"
                            className="text-xs text-gray-700 cursor-pointer"
                        >
                            Acepto las políticas de privacidad
                        </label>
                    </div>

                    {/* Botón */}
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="border border-[#76937c] text-[#76937c] px-8 py-2 rounded-md hover:bg-[#76937c] hover:text-white transition-all uppercase text-sm tracking-widest"
                        >
                            Enviar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Formulario;
