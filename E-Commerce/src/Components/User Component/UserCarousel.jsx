import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserCarousel = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      title: "Summer Collection",
      description: "Shop the latest summer trends",
    },
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "Electronics Sale",
      description: "Up to 40% off on electronics",
    },
    {
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
      title: "Kids Fashion",
      description: "New arrivals for kids",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="h-[250px] sm:h-[420px] w-full" // Reduced height for mobile
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-xl">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserCarousel;
