import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TecnicasEstudio() {
    return (
        <>
            <Header showLogo={false} /> 
            <div className="min-h-screen w-full -mt-6" style={{ backgroundColor: "#efdfc2" }}>
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-2 pb-8">
                    {/* Letrero */} 
                    <div className="flex flex-col items-center ">
                        <Link href="/servicios/talleres">
                            <img
                                src="/tecnicas-estudio-letrero.png"
                                alt="Técnicas de Estudio"
                                className="w-[450px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>
                    {/* Contenido principal */}
                    <div className="flex flex-col items-center text-slate-800 leading-relaxed ">
                        <section className="max-w-3xl w-full text-left">
                            {/* Descripción Superior */}
                            <p className="mb-8 text-lg">
                                En este taller se trabajarán técnicas de estudio y la organización y optimización del tiempo.
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
                                    <span>Edades: 8 - 18 años</span>
                                </div>
                                {/* Icono Duración - Reloj */}
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    <span>Duración: 90-120 min</span>
                                </div>
                            </div>
                            <p className="mb-8 text-lg">
                                Estudiar también requiere un aprendizaje.Se ha demostrado que el fracaso escolar está asociado con aquellos alumnos que no poseen unas correctas técnicas de estudio, por ello, la adquisición temprana de estas puede resultar altamente positivo.
                            </p>
                            {/* Beneficios del taller */}
                            <div className="mb-10">
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                    Beneficios del taller
                                </h2>
                                <p className="mb-5 text-lg">
                                    Este taller te ayudará a:
                                </p>
                                <ul className="list-disc list-inside space-y-3 text-lg">
                                    {[
                                        "Aprovechar mejor el tiempo",
                                        "Aumentar la autoestima y motivación",
                                        "Mejorar el rendimiento académico",
                                        "Automatizar el estudio",
                                        "Adquirir técnicas de planificación, organización, lectura, comprensión, selección y memorización",
                                    ].map((benefit, index) => (
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
