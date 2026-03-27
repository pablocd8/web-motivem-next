import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DescargarPDF from "@/components/DescargarPDF";

export default function GuiaFamilias() {
    return (
        <>
            <Header showLogo={false} />
            <div className="min-h-screen w-full bg-[#efdfc2] -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/">
                            <Image 
                                src="/guia-familias-letrero.png" 
                                alt="Guía para Familias" 
                                width={500}
                                height={200}
                                priority
                                className="w-[500px] max-w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" 
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-slate-800 leading-relaxed -mt-4">
                        <section className="max-w-3xl text-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-7">Guía para familias</h2>
                            <p className="mb-3 text-xl">Ser madre, padre o tutor no siempre es sencillo. A veces notamos cambios en nuestros hijos o adolescentes que nos generan dudas o preocupaciones: cambios de humor, bajada en el rendimiento escolar, aislamiento, impulsividad o dificultades para gestionar emociones.</p>
                            <p className="mb-6 text-xl">En este apartado encontrarás una guía práctica en formato PDF, pensada para orientarte sobre cómo actuar cuando detectas que algo le pasa a tu hijo o hija. El documento incluye pautas claras, señales de alerta y recomendaciones que pueden ayudarte a dar los primeros pasos y acompañarle de la mejor manera posible.</p>
                            <p className="mb-6 text-xl">Nuestro objetivo es ofrecerte herramientas para que te sientas acompañado en este proceso y puedas tomar decisiones con mayor seguridad.</p>
                        </section>
                        <section className="mt-6">
                            <Image 
                                src="/como-empezamos.png" 
                                alt="Guía para Familias" 
                                width={500}
                                height={400}
                                className="w-[500px] max-w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" 
                            />
                        </section>
                    </div>
                </div>
                <DescargarPDF />
            </div>
            <Footer />
        </>
    );
}
