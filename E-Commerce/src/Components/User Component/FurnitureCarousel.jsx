import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";
import React from "react";
const FurnitureCarousel = () => {
  const images = [
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-01.jpeg?raw=true",
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-03.png?raw=true",
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-04.jpeg?raw=true",
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-05.jpeg?raw=true",
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-06.jpeg?raw=true",
    "https://github.com/MuzzammilAfridi/oasifront/blob/main/public/article-07.jpeg?raw=true",
  ];

  return (
    <div className="overflow-hidden py-10 bg-gray-50 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center my-6">
        Furniture Collection
      </h1>
      <div className="w-full px-6">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[FreeMode, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[250px] rounded-lg shadow-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Furniture ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FurnitureCarousel;
