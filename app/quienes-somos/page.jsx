import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QuienesSomos() {
    return (
        <>
            <Header showLogo={false} />
            <div className="min-h-screen w-full bg-[#efdfc2] -mt-6">
                <div className="max-w-6xl mx-auto px-6 md:px-10 pt-0 pb-8">
                    <div className="flex justify-center pt-0">
                        <Link href="/">
                            <Image
                                src="/quienes-somos-letrero.png"
                                alt="quienes-somos"
                                width={500}
                                height={250}
                                priority
                                className="w-[500px] h-auto transition-transform hover:scale-105 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="flex justify-center text-slate-800 leading-relaxed">
                        <section className="max-w-3xl text-center">
                            <p className="mb-3 text-2xl">Soy Mar, psicóloga especializada en Educación Especial.</p>
                            <div className="flex justify-center pt-0">
                                <Image
                                    src="/foto-motivem-mar.jpg"
                                    alt="quienes-somos"
                                    width={500}
                                    height={600}
                                    className="w-[500px] h-auto transition-transform hover:scale-95 cursor-pointer rounded-lg mb-6"
                                />
                            </div>
                            <p className="mb-3 text-lg">Desde pequeña he ido buscando mis pasiones, para que de mayor pudiera disfrutar con mi trabajo. Poco a poco descubrí que entre lo que me hacían feliz estaban las cosas que intentaba hacer día a día: hacer reír y ayudar a los demás.</p>
                            <p className="mb-3 text-2xl">Tomar una decisión.</p>
                            <p className="mb-3 text-lg">A los años, decidí estudiar psicología en la Universitat de València, donde me formé y realicé las prácticas en el Ayuntamiento de Valencia junto con la FAD (Fundación FAD Juventud). En mi etapa de prácticas tuve la gran suerte de coincidir con mi tutora Laura, la que me acercó un poco más al ámbito educativo. Valoré realmente la importancia de la educación y del papel fundamental que juega en nuestras vidas.</p>
                            <p className="mb-3 text-lg">Más tarde, realicé la Dipu et Beca en el centro ocupacional Juan Antonio Bodoque. Durante esta etapa, crecí emocionalmente gracias al cariño, agradecimiento y felicidad que me aportaban todos los usuarios/as del centro. Aquí aprendí a que pase lo que nos pase y que siempre hay una forma de ayudar a los demás.</p>
                            <p className="mb-3 text-2xl">Un poco después…</p>
                            <p className="mb-3 text-lg">Tiempo después, hice prácticas en el CRIS de Ontinyent, donde Sara me acercó al ámbito de los trastornos mentales. Ella me transmitió la pasión, la constancia y la sensibilidad que hace falta en este trabajo.</p>
                            <p className="mb-3 text-lg">Tras mis periodos de prácticas, decidí estudiar un máster que unía lo que más me gustaba: la educación y las necesidades especiales. Hice las prácticas del máster en el colegio La Concepción y actualmente estoy finalizando mi TFM sobre el autismo.</p>
                            <p className="mb-6 text-lg">Ahora que he emprendido este proyecto de Motivem, una amiga me hizo recordar algo que dije cuando era pequeña mientras realizábamos un trabajo de clase: « A mí me gustaría dejar huella en este mundo´´. Ese es mi objetivo, dejar huella en los corazones de cada persona que entre a Motivem, a los niños/as y a los no tan niños y mejorar esta sociedad desde el corazón.</p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
