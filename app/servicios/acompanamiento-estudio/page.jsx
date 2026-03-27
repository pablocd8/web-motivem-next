import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function AcompañamientoEstudio() {
    return (
        <>
            <Header showLogo={false} />

            <div className="min-h-screen w-full bg-[#efdfc2] -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">

                    {/* Letrero */}
                    <div className="flex flex-col items-center">
                        <Link href="/servicios">
                            <Image
                                src="/acompañamiento-estudio-letrero.png"
                                alt="Acompañamiento para el Estudio"
                                width={450}
                                height={200}
                                priority
                                className="w-[500px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Contenido */}
                    <div className="flex justify-center text-slate-800 leading-relaxed ">
                        <section className="max-w-3xl text-center">

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                Acompañamiento para el estudio
                            </h2>

                            <p className="mb-3 text-lg">
                                El acompañamiento para el estudio es un servicio diseñado para
                                apoyar a los estudiantes en la organización, planificación y
                                desarrollo de sus actividades académicas.
                            </p>

                            <p className="mb-6 text-lg">
                                En <strong>MOTIVEM</strong>, ofrecemos un enfoque integral que
                                combina técnicas de estudio con estrategias para mejorar la
                                motivación y la autoconfianza.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                ¿Cómo funciona el acompañamiento para el estudio?
                            </h2>

                            <ul className="space-y-3 mb-6 text-lg">
                                {[
                                    "Evaluación de las necesidades y estilo de aprendizaje.",
                                    "Desarrollo de un plan de estudio personalizado.",
                                    "Técnicas de organización y gestión del tiempo.",
                                    "Estrategias para mejorar la concentración y la memoria.",
                                    "Apoyo emocional y motivacional.",
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

