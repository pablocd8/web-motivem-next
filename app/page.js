import Header from "@/components/Header";
import Body from "@/components/Body";
import CarruselReseñas from "@/components/CarruselReseñas";
import Footer from "@/components/Footer";
import CarruselFotosMotivem from "@/components/CarruselFotoMotivem";

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
