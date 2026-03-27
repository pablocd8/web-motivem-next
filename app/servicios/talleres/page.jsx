import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { infoTalleres } from "@/data/talleresData";
import Footer from "@/components/Footer";
export default function Talleres() {
    return (
        <>
            <Header showLogo={false} />

            <div className="min-h-screen w-full bg-[#efdfc2] pb-16 -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10">

                    {/* Letrero Principal */}
                    <div className="flex justify-center pt-0">
                        <Link href="/servicios">
                            <Image
                                src="/talleres-letrero.png"
                                alt="Talleres"
                                width={500}
                                height={250}
                                priority
                                className="w-[500px] h-auto transition-transform hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>
                    
                    {/* Texto Introductivo */}
                    <section className="max-w-3xl mx-auto text-center -mt-10">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                            {infoTalleres.titulo}
                        </h2>

                        {infoTalleres.descripcion.map((parrafo, i) => (
                            <p
                                key={i}
                                className="mb-4 text-lg text-slate-800 leading-relaxed"
                            >
                                {parrafo}
                            </p>
                        ))}

                        <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mt-8 mb-4">
                            ¿Cómo obtener los talleres?
                        </h2>

                        <ul className="space-y-3 mb-10 text-left inline-block">
                            {infoTalleres.opciones.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-lg text-slate-800"
                                >
                                    <span className="mt-1 flex h-5 w-5 shrink-0 rounded-full bg-[#cfa248] text-white items-center justify-center text-[10px] font-bold">
                                        ✓
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="#talleres">
                            <button className="bg-[#6e9277] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all cursor-pointer">
                                Talleres existentes
                            </button>
                        </a>
                    </section>

                    {/* GRID DE TARJETAS */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
                        id="talleres"
                    >
                        {infoTalleres.tarjetas.map((taller) => (
                            <div
                                key={taller.id}
                                className={`${taller.color} ${taller.textColor} px-6 py-8 rounded-[40px] flex flex-col items-center text-center shadow-md hover:scale-[1.02] transition-transform`}
                            >
                                <h3 className="text-3xl font-bold mb-2">
                                    {taller.titulo}
                                </h3>

                                <p className="text-base mb-6 leading-snug opacity-90 flex-grow">
                                    {taller.texto}
                                </p>

                                <Link href={taller.buttonLink}
                                    className="bg-white text-gray-400 px-8 py-2 rounded-full font-semibold hover:shadow-lg transition-all cursor-pointer"
                                >
                                    Saber más
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <Footer />

        </>
    );
};

