'use client';

import React, { useState } from "react";
import Image from "next/image";

const images = [
    "/foto-motivem-sofa.jpg",
    "/foto-tarjetas.jpg",
    "/foto-cuadros.jpg",
    "/foto-mostrador.jpg",
    "/foto-cuadros-niños.jpg"
];

const CarruselFotosMotivem = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    return (
        <>
            <div className="w-full bg-[#efdfc2] py-16 -mt-70">
                <div className="max-w-6xl mx-auto px-6">

                    {/* CONTENEDOR CARRUSEL */}
                    <div className="relative overflow-hidden rounded-[40px] shadow-lg">

                        {/* IMÁGENES */}
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {images.map((img, index) => (
                                <div key={index} className="relative w-full flex-shrink-0 h-[300px] md:h-[450px]">
                                    <Image
                                        src={img}
                                        alt={`Motivem ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 1152px"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* FLECHA IZQUIERDA */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-700 w-10 h-10 rounded-full flex items-center justify-center shadow transition"
                        >
                            ‹
                        </button>

                        {/* FLECHA DERECHA */}
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-700 w-10 h-10 rounded-full flex items-center justify-center shadow transition"
                        >
                            ›
                        </button>

                        {/* INDICADORES */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`w-3 h-3 rounded-full transition ${current === index
                                            ? "bg-[#6e9277]"
                                            : "bg-white/70"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            {/* DIVIDER */}
            <div className="divider mt-23">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f5eedc7a" />
                </svg>
            </div>

            {/* Sección blanca */}
            <section style={{ backgroundColor: "#efdfc2", height: "300px" }} />
        </>
    );
};

export default CarruselFotosMotivem;
