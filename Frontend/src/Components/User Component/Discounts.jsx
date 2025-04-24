import React from "react";

const offers = [
  {
    title: "Summer Sale - Up to 50% OFF!",
    description:
      "Get the best deals on furniture & home decor. Limited time offer!",
    coupon: "SUMMER50",
    bg: "bg-red-500",
  },
  {
    title: "Buy 1 Get 1 Free!",
    description: "Exclusive offer on selected furniture items. Don't miss out!",
    coupon: "B1G1FREE",
    bg: "bg-green-500",
  },
  {
    title: "Flat 20% Off on Electronics",
    description: "Apply the coupon below at checkout for an extra discount!",
    coupon: "ELEC20",
    bg: "bg-blue-500",
  },
];

const Discounts = () => {
  return (
    <div className="py-10 px-4 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Special Offers & Discounts
      </h2>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`p-6 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${offer.bg}`}
          >
            <h3 className="text-lg md:text-xl font-bold mb-2">{offer.title}</h3>
            <p className="text-sm md:text-base mb-4">{offer.description}</p>
            <div className="bg-white text-gray-800 px-4 py-2 inline-block rounded-md text-sm font-semibold">
              Use Code: <span className="text-red-600">{offer.coupon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
