import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Accesibilidad() {
    return (
        <>
            <Header showLogo={false} />

            <div className="min-h-screen w-full bg-[#efdfc2] mt-24">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pb-16">

                    <div className="flex justify-center text-slate-800 leading-relaxed">
                        <section className="max-w-3xl text-center">

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                DECLARACIÓN DE ACCESIBILIDAD
                            </h2>

                            <p className="mb-4 text-lg text-justify">
                                MOTIVEM Psicología se ha comprometido a hacer accesible su sitio web,
                                de conformidad con el Real Decreto 1112/2018, sobre accesibilidad de
                                los sitios web y aplicaciones para dispositivos móviles, y siguiendo
                                las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1),
                                conforme a los requisitos de la norma UNE-EN 301 549:2022.
                            </p>

                            <p className="mb-8 text-lg text-justify">
                                La presente declaración de accesibilidad se aplica al sitio web
                                 https://motivem.es 
                                y fue preparada en fecha junio de 2024.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                SITUACIÓN DE CUMPLIMIENTO
                            </h2>

                            <p className="mb-8 text-lg text-justify">
                                Este sitio web es parcialmente conforme con las pautas
                                WCAG 2.1 debido a las excepciones y contenidos no accesibles que se
                                detallan a continuación.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                CONTENIDO NO ACCESIBLE
                            </h2>

                            <p className="mb-4 text-lg text-justify">
                                El contenido que se recoge a continuación no es accesible por los
                                siguientes motivos:
                            </p>

                            <ul className="list-disc list-inside space-y-3 mb-8 text-lg text-justify">
                                <li>
                                    Algunos vídeos publicados en el sitio web no disponen actualmente
                                    de transcripción textual o audiodescripción, al tratarse de vídeos
                                    sin audio.
                                </li>
                                <li>
                                    Pueden existir elementos gráficos puntuales sin una alternativa
                                    textual adecuada.
                                </li>
                            </ul>

                            <p className="mb-8 text-lg text-justify">
                                Estos contenidos están en proceso de revisión y mejora para
                                garantizar su accesibilidad.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                PREPARACIÓN DE LA PRESENTE DECLARACIÓN DE ACCESIBILIDAD
                            </h2>

                            <p className="mb-4 text-lg text-justify">
                                La presente declaración fue preparada mediante una autoevaluación
                                realizada por el titular del sitio web durante el proceso de diseño
                                y desarrollo del mismo, utilizando herramientas automáticas de
                                evaluación de accesibilidad, tales como:
                            </p>

                            <ul className="list-disc list-inside space-y-3 mb-8 text-lg text-justify">
                                <li>
                                    <a
                                        href="https://wave.webaim.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        WAVE
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.tawdis.net/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        TAW
                                    </a>
                                </li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-4">
                                OBSERVACIONES Y DATOS DE CONTACTO
                            </h2>

                            <p className="mb-4 text-lg text-justify">
                                Si encuentra dificultades de acceso al contenido del sitio web o
                                desea realizar cualquier consulta o sugerencia relacionada con la
                                accesibilidad, puede ponerse en contacto con:
                            </p>

                            <p className="text-lg text-justify">
                               MOTIVEM Psicología <br />
                                Maria del Mar Cerdá Donat<br />
                                Avda. Albaida 19 (bajo izq)<br />
                                46870 – Ontinyent (Valencia)<br />
                                Teléfono: 644 54 27 90<br />
                                Correo electrónico:{" "}
                                <a
                                    href="mailto:motivem.info@gmail.com"
                                    className="underline"
                                >
                                    motivem.info@gmail.com
                                </a>
                            </p>

                        </section>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

