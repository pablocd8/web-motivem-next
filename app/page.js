import Header from "@/components/Header";
import Body from "@/components/Body";
import CarruselReseñas from "@/components/CarruselReseñas";
import Footer from "@/components/Footer";
import CarruselFotosMotivem from "@/components/CarruselFotoMotivem";

export const metadata = {
  title: "Motivem | Centro de Psicología y Aprendizaje Integral en Ontinyent(Valencia)",
  description: "En Motivem ayudamos a niños, adolescentes y adultos a través de la psicología clínica y el apoyo al aprendizaje. Crecemos contigo en Ontinyent(Valencia).",
};

export default function Home() {
    return (
        <>
            <Header showLogo={true} />
            <Body />
            <CarruselFotosMotivem />
            <CarruselReseñas />
            <Footer />
        </>
    );
}
