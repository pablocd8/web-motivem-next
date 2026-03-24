import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function ResolucionConflictos() {
    return (
        <>
            <Header showLogo={false} />
            <div className="min-h-screen w-full" style={{ backgroundColor: "#efdfc2" }}>
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-2 pb-8 -mt-6">
                    {/* Letrero */}
                    <div className="flex flex-col items-center ">
                        <Link href="/servicios/talleres">
                            <img
                                src="/resolucion-conflictos-letrero.png"
                                alt="Resolución de Conflictos"
                                className="w-[450px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"   
                            />
                        </Link>
                    </div>
                    {/* Contenido principal */}
                    <div className="flex flex-col items-center text-slate-800 leading-relaxed ">
                        <section className="max-w-3xl w-full text-left">
                            {/* Descripción Superior */}
                            <p className="mb-8 text-lg">
                                En este taller conseguirás habilidades de mediación para manejar los conflictos, aprenderás sobre qué tipos de conflicto puede haber y el procedimiento para su resolución.
                            </p>
                            <div className="space-y-5 mb-8 text-[#6e9277] font-medium text-lg">
                                {/* Icono Taller - Birrete */}
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>  
                                    <span>Taller presencial</span>
                                </div>

                                {/* Icono Edades - Usuarios */}
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    <span>Edades: 4 - 18 años</span>
                                </div>
                                {/* Icono Duración - Reloj */}
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    <span>Duración: 90-120 min</span>
                                </div>
                                
                            </div>
                            <p className="mb-8 text-lg">La resolución de conflictos es un proceso mediante el cual se busca encontrar una solución satisfactoria a un problema o situación de desacuerdo entre dos o más personas.

                                En los niños/as, este proceso implica enseñarles habilidades y estrategias para resolver conflictos de manera efectiva y pacífica, lo que les
                                permitirá enfrentar situaciones desafiantes de manera más positiva y constructiva.</p>
                            {/* Beneficios del taller */}
                            <div className="mb-10">
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                    Beneficios del taller
                                </h2>
                                <ul className="list-none space-y-3 text-lg">
                                    {[
                                        "Aprendizaje de estrategias para manejar la ansiedad y hacer frente a situaciones estresantes",
                                        "Aumentar nuestra empatía",
                                        "Aprender de estrategias básicas de negociación, escucha y diálogo",
                                        "Poner en práctica las habilidades de toma de decisiones",
                                        "Desarrollar resiliencia para enfrentarnos a situaciones difíciles",
                                    ].map((benefit, i) => (
                                        <li key={benefit} className="flex items-start gap-3 text-[#cfa248]">
                                            <span className="mt-1 font-bold">✓</span>
                                            <span className="text-slate-800">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}
