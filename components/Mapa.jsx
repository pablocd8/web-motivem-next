import React from "react";

const Mapa = () => {
    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
            <iframe
                title="Ubicación del negocio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.378125436117!2d-0.6015681236576125!3d38.82380025104266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd619d29ebaf6ae9%3A0x2ff2f64fc7d33bcf!2sMotivem!5e0!3m2!1ses!2ses!4v1770031683851!5m2!1ses!2ses"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />
        </div>
    );
};

export default Mapa;
