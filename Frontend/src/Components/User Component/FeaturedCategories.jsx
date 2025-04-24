import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men's Wear",
    image:
      "https://res.cloudinary.com/dn7qeezsk/image/upload/v1740688131/sltz1j69yttyenlp6ejo.jpg",
  },
  {
    name: "Women's Wear",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/d/j/u/m-he-yellowwhite-utsaahit-original-imah7yhggffnxndd.jpeg?q=70",
  },
  {
    name: "Electronics",
    image: "https://oasifront.onrender.com/Mobiles.webp",
  },
  {
    name: "Furniture",
    image:
      "https://raw.githubusercontent.com/MuzzammilAfridi/oasifront/refs/heads/main/public/furniture.webp",
  },
];

const categoryLinks = {
  "Men's Wear": "/Fashion",
  "Women's Wear": "/Fashion",
  Electronics: "/Electronics",
  Furniture: "/Furn",
};

const FeaturedCategories = () => {
  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Shop by Category
      </h2>
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((cat, index) => (
          <Link key={index} to={categoryLinks[cat.name] || "/"}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-center py-3 text-lg font-semibold text-gray-800">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
