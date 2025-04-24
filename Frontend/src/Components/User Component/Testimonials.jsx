import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa"; // For rating stars

const testimonials = [
  {
    name: "John Doe",
    review: "Amazing furniture quality! Highly recommend.",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    review: "Great service and fast delivery. Love my new sofa!",
    rating: 4,
  },
  {
    name: "Michael Lee",
    review: "Affordable and stylish designs. Worth the price!",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    review: "Excellent customer support and product quality.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        What Our Customers Say
      </h2>
      <div className="max-w-3xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
