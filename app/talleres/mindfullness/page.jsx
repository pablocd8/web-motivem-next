import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Mindfullness() {
    return(
        <>
        <Header showLogo={false} />
        <div className="min-h-screen w-full -mt-6" style={{ backgroundColor: "#efdfc2" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-2 pb-8">
            {/* Let rero */}
            <div className="flex flex-col items-center ">
            <Link href="/servicios/talleres">
                <Image
                src="/mindfullness-letrero.png"
                alt="Mindfullness"
                width={450}
                height={200}
                priority
                className="w-[450px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                />
            </Link>
            </div>
            {/* Contenido principal */}
            <div className="flex flex-col items-center text-slate-800 leading-relaxed ">
            <section className="max-w-3xl w-full text-left">
                {/* Descripción Superior */}
                <p className="mb-8 text-lg">
                El mindfulness es una práctica que consiste en prestar atención plena y consciente al momento presente, sin juzgar ni distraerse con pensamientos o emociones. En los niños/as, el mindfulness implica enseñarles a prestar atención a su entorno y a sus emociones, lo que les permite desarrollar habilidades para manejar el estrés y la ansiedad de manera efectiva.
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
                        <span>Duración: 60 min</span>
                    </div>
                </div>
                {/* Beneficios del taller */}
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                        Beneficios del taller
                    </h2>
                    <ul className="list-none space-y-3 text-lg">
                        {[
                            "Mejora la atención, concentración y memoria",
                            "Disminuye el estrés y ansiedad",
                            "Aumenta la calma y la tranquilidad",
                            "Favorece el control de los impulsos",
                            "Aumenta la inteligencia emocional",
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
