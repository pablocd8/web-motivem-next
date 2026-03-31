import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = ({ className = "mt-8" }) => {
    return (
        <footer className={className}>
            {/* Contenedor de la Ola */}
            <div className="leading-[0] bg-transparent -mb-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 200"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#76937c"
                        fillOpacity="1"
                        d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128V200H0Z"
                    ></path>
                </svg>
            </div>

            {/* Bloque Verde Principal */}
            <div className="bg-[#76937c] text-white px-6 pb-12 ">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-center md:text-left ">

                    {/* Info / Contacto */}
                    <div className="flex flex-col items-center md:items-start mt-6">
                        <h3 className="font-bold text-xl mb-4">Info / Contacto</h3>
                        <div className="space-y-2 text-sm md:text-base opacity-95">
                            <p>Avd. Albaida, 19 (bajo)</p>
                            <p>46870, Ontinyent (Valencia)</p>
                            <p>Teléfono: +34 644 54 27 90</p>
                            <p>Email: motivem.info@gmail.com</p>
                        </div>
                    </div>

                    {/* Información Legal */}
                    <div className="flex flex-col items-center md:items-start mt-6">
                        <h3 className="font-bold text-xl mb-4">Información Legal</h3>
                        <ul className="space-y-2 text-sm md:text-base opacity-95">
                            <li><Link href="/aviso-legal" className="hover:underline">Aviso Legal</Link></li>
                            <li><Link href="/politica-privacidad" className="hover:underline">Política de Privacidad</Link></li>
                            <li><Link href="/politica-cookies" className="hover:underline">Política de Cookies</Link></li>
                            <li><Link href="/accesibilidad" className="hover:underline">Accesibilidad</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Franja final (Copyright | Redes | SEO) */}
            <div className="bg-[#76937c] text-white pb-10 px-6">
                <div className="max-w-7xl mx-auto border-t border-white/20 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-[12px] opacity-90 uppercase tracking-wider">

                        {/* Izquierda: Copyright */}
                        <p className="w-full lg:w-1/3 text-center lg:text-left">
                            © 2026, MOTIVEM psicología.
                        </p>

                        {/* Centro: Redes Sociales */}
                        <div className="w-full lg:w-1/3 flex justify-center gap-4">
                            <a href="https://www.instagram.com/motivem.psicologia" className="bg-[#d4ac50] p-2 rounded-full hover:scale-110 transition-transform">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/motivem.psicologia" className="bg-[#d4ac50] p-2 rounded-full hover:scale-110 transition-transform">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://wa.me/34644542790" className="bg-[#d4ac50] p-2 rounded-full hover:scale-110 transition-transform">
                                <FaWhatsapp size={20} />
                            </a>
                        </div>

                        {/* Derecha: SEO Links */}
                        <div className="w-full lg:w-1/3 flex flex-col sm:flex-row justify-center lg:justify-end gap-4 sm:gap-6 text-center lg:text-right">
                            <a href="#" className="hover:text-gray-200">Psicólogo en Ontinyent</a>
                            <a href="#" className="hover:text-gray-200">Psicología infantil</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
