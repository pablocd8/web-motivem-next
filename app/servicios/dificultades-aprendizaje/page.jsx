import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function DificultadesAprendizaje() {
    return (
        <>
            <Header showLogo={false} />

            <div className="min-h-screen w-full bg-[#efdfc2] -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">

                    {/* Letrero */}
                    <div className="flex flex-col items-center">
                        <Link href="/servicios">
                            <img
                                src="/dificultades-aprendizaje-letrero.png"
                                alt="Dificultades de Aprendizaje"
                                className="w-[500px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Contenido */}
                    <div className="flex justify-center text-slate-800 leading-relaxed">
                        <section className="max-w-3xl text-center">

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                Dificultades de aprendizaje
                            </h2>

                            <p className="mb-3 text-lg">
                                Las dificultades de aprendizaje son trastornos que afectan la
                                capacidad de una persona para adquirir y utilizar habilidades
                                académicas, como la lectura, la escritura o las matemáticas.
                            </p>

                            <p className="mb-6 text-lg">
                                En <strong>MOTIVEM</strong>, ofrecemos apoyo especializado para
                                niños y adolescentes que enfrentan estas dificultades.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                ¿Cómo podemos ayudar?
                            </h2>

                            <ul className="space-y-3 mb-6 text-lg">
                                {[
                                    "Evaluación individualizada para identificar las áreas de dificultad.",
                                    "Diseño de planes de intervención personalizados.",
                                    "Técnicas de enseñanza adaptadas a las necesidades del estudiante.",
                                    "Apoyo emocional y motivacional.",
                                    "Colaboración con familias y escuelas para un enfoque integral.",
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

