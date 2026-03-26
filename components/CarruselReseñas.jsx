'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Formulario from './Formulario';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reseñas = [
  {
    text: "Me encanta el cariño y la implicación de Mar en todo lo que hace...",
    author: "I. Moncho"
  },
  {
    text: "Recomendación 10/10 El trabajo que hace con los niños es estupendo...",
    author: "A. Andrade"
  },
  {
    text: "Un trato genial, muy profesional y sobre todo nos ayudó mucho.",
    author: "P. Rodríguez"
  },
];

const CarruselReseñas = () => {
  return (
    <>
      <section className="py-12 -mt-65">
        <div className="max-w-4xl mx-auto px-4">
          <Swiper
            style={{ '--swiper-navigation-color': 'rgba(255, 255, 255, 0.5)' }}
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
          >
            {reseñas.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#6e9277] text-white rounded-[40px] shadow-lg p-8 min-h-[280px] flex flex-col justify-center items-center text-center transition-all duration-300">
                  <p className="text-base md:text-lg mb-4 leading-relaxed max-w-3xl">
                    {testimonial.text}
                  </p>
                  <p className="font-bold text-lg">– {testimonial.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <a
              href="https://share.google/rHdUAeBxOJRN5Ahxc"
              className="inline-block px-6 py-2 border border-[#6e9277] text-[#6e9277] hover:bg-[#6e9277] hover:text-white transition-colors duration-300 cursor-pointer rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              AÑADE UNA RESEÑA
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] block">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f5eedc7a" />
        </svg>
      </div>

      {/* Sección blanca */}
      <section style={{ backgroundColor: "#efdfc2", height: "300px" }} />
      <Formulario />
    </>
  );
};

export default CarruselReseñas;
