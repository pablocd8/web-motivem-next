import Image from "next/image";
import Link from "next/link";

const Body = () => {
    return (
        <>
            <div className="text-center mt-40 max-w-[420px] md:max-w-[600px] mx-auto">
                <Image
                    src="/imagen-motivem.png"
                    alt="Logo Motivem"
                    width={600}
                    height={400}
                    priority
                    className="mx-auto w-full h-auto block transition-transform duration-300 ease-in-out hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 600px"
                />
            </div>

            {/* Espacio */}
            <div className="h-72"></div>

            {/* Sección principal */}
            <section className="bg-[#efdfc2] pt-12 pb-12 px-4 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Bloque 1 */}
                    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                        <Image 
                            src="/diseña-tu-taller.png" 
                            alt="diseña tu taller" 
                            width={500}
                            height={300}
                            className="w-full max-w-md rounded" 
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <Link href="/crear-taller" className="mt-4 px-6 py-2 border border-[#bf7b56] text-[#bf7b56] hover:bg-[#bf7b56] hover:text-white transition-colors duration-300 rounded">
                            SABER MÁS
                        </Link>
                    </div>

                    {/* Bloque 2 */}
                    <div className="flex flex-col items-center" data-aos="fade-up">
                        <Image 
                            src="/guia-para-familias.png" 
                            alt="guia para familias" 
                            width={500}
                            height={300}
                            className="w-full max-w-md rounded" 
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <Link href="/guia-familias" className="mt-4 px-6 py-2 border border-[#e6ca92] text-[#8b5e3b] hover:bg-[#e7d0a3] hover:text-white transition-colors duration-300 rounded">
                            SABER MÁS
                        </Link>
                    </div>

                    {/* Bloque 3 */}
                    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                        <Image 
                            src="/historias-que-inspiran.png" 
                            alt="historias que inspiran" 
                            width={500}
                            height={300}
                            className="w-full max-w-md rounded" 
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <Link href="/otra-pagina" className="mt-4 px-6 py-2 border border-[#94a3b8] text-[#94a3b8] hover:bg-[#94a3b8] hover:text-white transition-colors duration-300 rounded">
                            SABER MÁS
                        </Link>
                    </div>

                </div>
            </section>

            {/* DIVIDER */}
            <div className="divider">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f5eedc7a" />
                </svg>
            </div>

            {/* Sección blanca */}
            <section style={{ backgroundColor: "#efdfc2", height: "300px" }} />
        </>
    );
};

export default Body;
