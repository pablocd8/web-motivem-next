import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Formulario from "@/components/Formulario";

export const metadata = {
  title: "Nuestros Servicios de Psicología y Aprendizaje",
  description: "Explora nuestros servicios de psicoterapia, dificultades de aprendizaje, orientación familiar y talleres en Valencia.",
};

export default function Servicios() {
    return (
        <>
            <Header showLogo={false} />
            <div className="bg-[#efdfc2] min-h-screen -mt-6">
                <div className="flex flex-col items-center pt-4">
                    <Link href="/">
                        <Image 
                            src="/servicio-letrero.png" 
                            alt="Servicios" 
                            width={500} 
                            height={200}
                            priority
                            className="w-[500px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" 
                        />
                    </Link>
                </div>
                <section className="pb-10 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                            <Image 
                                src="/psicoterapia-imagen.png" 
                                alt="Psicoterapia" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/psicoterapia" className="mt-4 px-6 py-2 border-2 border-[#bf7b56] text-[#bf7b56] font-medium hover:bg-[#bf7b56] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                            <Image 
                                src="/dificultades-aprendizaje.png" 
                                alt="Dificultades de aprendizaje" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/dificultades-aprendizaje" className="mt-4 px-6 py-2 border-2 border-[#94a3b8] text-[#94a3b8] font-medium hover:bg-[#94a3b8] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                            <Image 
                                src="/motivacion-estudio.png" 
                                alt="Motivación al estudio" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/motivacion-estudio" className="mt-4 px-6 py-2 border-2 border-[#e6ca92] text-[#8b5e3b] font-medium hover:bg-[#e7d0a3] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                            <Image 
                                src="/acompañamiento-estudio.png" 
                                alt="Acompañamiento al estudio" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/acompanamiento-estudio" className="mt-4 px-6 py-2 border-2 border-[#94a3b8] text-[#94a3b8] font-medium hover:bg-[#94a3b8] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                            <Image 
                                src="/orientacion-familiar.png" 
                                alt="Orientación familiar" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/orientacion-familiar" className="mt-4 px-6 py-2 border-2 border-[#bf7b56] text-[#bf7b56] font-medium hover:bg-[#bf7b56] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                            <Image 
                                src="/talleres.png" 
                                alt="Talleres" 
                                width={500}
                                height={350}
                                className="w-full max-w-md rounded shadow-sm" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Link href="/servicios/talleres" className="mt-4 px-6 py-2 border-2 border-[#e6ca92] text-[#8b5e3b] font-medium hover:bg-[#e7d0a3] hover:text-white transition-colors duration-300">SABER MÁS</Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
