import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AvisoLegal() {
    return (
        <>
            <Header showLogo={false} />
            <div className="min-h-screen w-full bg-[#efdfc2] mt-30">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">
                    {/* Contenido */}
                    <div className="flex justify-center text-slate-800 leading-relaxed ">
                        <section className="max-w-3xl text-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                AVISO LEGAL
                            </h2>
                            <p className="mb-3 text-lg text-justify">
                                En cumplimiento del artículo 10 de la Ley 34 / 2002, de 11 de julio,
                                de Servicios de la Sociedad de la Información y Comercio Electrónico,
                                Maria del Mar Cerdá Donat, en adelante «MOTIVEM Psicologia» le
                                informa que se encuentra inscrita en el Registro Mercantil de
                                Valencia, siendo sus datos identificativos los siguientes:
                            </p>
                            <p className="mb-3 text-lg text-justify">
                                Denominación social: MOTIVEM Psicologia. N.I.F.: 48607908F Domicilio
                                social: Avda Albaida 19(bajo izq) 46870 – ONTINYENT(VALENCIA) Teléfono:
                                644 54 27 90 Correo electrónico a efectos de comunicación:
                                info@motivem.es Todas las notificaciones y comunicaciones entre los usuarios y
                                MOTIVEM Psicologia se considerarán eficaces, a todos los efectos,
                                cuando se realicen a través de correo postal o cualquier otro medio de
                                los detallados anteriormente.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                CONDICIONES DE ACCESO Y UTILIZACIÓN
                            </h2>
                            <p className="mb-3 text-lg text-justify">
                                El presente aviso legal regula el uso del sitio web
                                www.motivem.es(en adelante, LA WEB), del que es titular MOTIVEM. La navegación por la web de
                                Motivem atribuye la condición de usuario del mismo e implica la
                                aceptación plena y sin reservas de todas y cada una de las disposiciones
                                incluidas en este Aviso Legal, que pueden sufrir modificaciones.
                            </p>
                            <p className="mb-3 text-lg text-justify">
                                El sitio web y sus servicios son de acceso libre y gratuito,
                                no obstante, MOTIVEM Psicologia condiciona la utilización de algunos de los
                                servicios ofrecidos en su web a la previa cumplimentación del
                                correspondiente formulario.
                            </p>
                            <p className="mb-3 text-lg text-justify">
                                Todos los contenidos del sitio web, como textos, fotografías,
                                gráficos, imágenes, iconos, tecnología, software, así como su diseño
                                y códigos fuente, constituyen una obra cuya propiedad pertenece a
                                MOTIVEM Psicologia sin que puedan entenderse cedidos al usuario ninguno de
                                los derechos de explotación sobre los mismos más allá de lo
                                estrictamente necesario para el correcto uso de la web. El usuario
                                garantiza la autenticidad y actualidad de todos aquellos datos que
                                comunique a MOTIVEM Psicologia y será el único responsable de las
                                manifestaciones falsas o inexactas que realice. El usuario se obliga a
                                hacer un uso correcto del sitio web de conformidad con las leyes, la
                                buena fe, el orden público, los usos del tráfico y el presente Aviso
                                Legal.El usuario responderá frente a MOTIVEM Psicologia o frente a terceros,
                                de cualesquiera daños y perjuicios que pudieran causarse como
                                consecuencia del incumplimiento de dicha obligación.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                POLÍTICA DE ENLACES Y EXENCIONES DE RESPONSABILIDADES
                            </h2>
                            <p className="mb-3 text-lg text-justify">
                                MOTIVEM Psicologia no se hace responsable del contenido de las
                                páginas web a las que el usuario pueda acceder a través de los
                                enlaces establecidos en www.motivem.es y declara que en ningún caso
                                procederá a examinar o ejercitar ningún tipo de control sobre el
                                contenido de otras páginas de la red.Asimismo, tampoco garantizará
                                la disponibilidad técnica, exactitud, veracidad, validez o legalidad
                                de páginas ajenas a su propiedad a las que se pueda acceder por
                                medio de los enlaces. MOTIVEM Psicologia declara haber adoptado todas
                                las medidas necesarias para evitar cualesquiera daños que, a los
                                usuarios de www.motivem.es, pudieran derivarse de la navegación por
                                la misma.En consecuencia, MOTIVEM Psicologia no se hace responsable,
                                en ningún caso, de los eventuales daños que por la navegación por
                                Internet pudiera sufrir el usuario.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                USO DE COOKIES Y DATOS ESTADÍSTICOS
                            </h2>
                            <p className="mb-3 text-lg text-justify">
                                Esta página web puede recoger datos de sus visitantes por medio
                                del uso de cookies, donde se recabará información personal
                                relacionada con su navegación.Para conocer de manera clara y precisa
                                las cookies que utilizamos, cuáles son sus finalidades y cómo puede
                                configurarlas o deshabilitarlas, consulte nuestra política de cookies,
                                en su caso. El usuario tiene la posibilidad de configurar su
                                navegador de modo que se le informe de la recepción de cookies,
                                pudiendo, si así lo desea, impedir que sean instaladas en su disco
                                duro.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#6e9277] mb-3">
                                PROTECCIÓN DE DATOS
                            </h2>
                            <p className="mb-3 text-lg text-justify">
                                En el caso de que en la web se recojan datos de carácter
                                personal, para más información consultar la política de privacidad.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
