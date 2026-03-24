import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrientacionFamiliar() {
    return (
        <>
            <Header showLogo={false} />

            <div className="min-h-screen w-full bg-[#efdfc2] -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">

                    {/* Letrero */}
                    <div className="flex flex-col items-center">
                        <Link href="/servicios">
                            <img
                                src="/orientacion-familiar-letrero.png"
                                alt="Orientación Familiar"
                                className="w-[500px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Contenido */}
                    <div className="flex justify-center text-slate-800 leading-relaxed ">
                        <section className="max-w-3xl text-center">

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                Orientación familiar
                            </h2>

                            <p className="mb-3 text-lg">
                                La orientación familiar es un servicio diseñado para apoyar a las
                                familias en la resolución de conflictos y mejora de la comunicación.
                            </p>

                            <p className="mb-6 text-lg">
                                En <strong>MOTIVEM</strong>, ofrecemos un espacio seguro y
                                confidencial para mejorar la convivencia y el bienestar emocional.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                ¿Cómo funciona la orientación familiar?
                            </h2>

                            <ul className="space-y-3 mb-6 text-lg">
                                {[
                                    "Evaluación de la dinámica familiar.",
                                    "Sesiones de orientación individualizadas.",
                                    "Estrategias de comunicación y resolución de conflictos.",
                                    "Apoyo emocional para todos los miembros.",
                                    "Fomento de un ambiente familiar saludable.",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 justify-center">
                                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 rounded-full bg-[#cfa248] text-white items-center justify-center text-xs font-bold">
                                            ✓
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                        </section>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

