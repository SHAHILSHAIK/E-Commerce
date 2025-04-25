import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function UserProductList() {
  const [Items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products); 

  useEffect(() => {
    axios
      .get("https://e-commerce-5a5i.onrender.com/api/products")
      .then((res) => setItems(res.data))
      .catch(() => console.log("Failed to fetch products"));
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? Items
      : Items.filter((item) => item.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "Men's", name: "Men's Wear" },
    { id: "Women's", name: "Women's Wear" },
    { id: "Kid's", name: "Kid's Wear" },
    { id: "Electronics", name: "Electronics" },
    { id: "Furniture", name: "Furniture" },
  ];

  const discountList = [
    { id: "Men's", discount: 20 },
    { id: "Women's", discount: 25 },
    { id: "Kid's", discount: 30 },
    { id: "Electronics", discount: 40 },
    { id: "Furniture", discount: 35 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

     
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(() => {
            // Step 1: Group products by category
            const categoryGroups = filteredProducts.reduce((acc, product) => {
              acc[product.category] = acc[product.category] || [];
              acc[product.category].push(product);
              return acc;
            }, {});

            
            const categoryOrder = Object.keys(categoryGroups);

            
            const orderedProducts = [];
            let index = 0;
            let added = true;

            while (added) {
              added = false;
              for (const category of categoryOrder) {
                if (categoryGroups[category][index]) {
                  orderedProducts.push(categoryGroups[category][index]);
                  added = true;
                }
              }
              index++;
            }

           
            return orderedProducts.map((item) => {
              const isInCart = cart.some((p) => p._id === item._id);

              const categoryDiscount = discountList.find(
                (d) => d.id === item.category
              );
              const discountPercent = categoryDiscount
                ? categoryDiscount.discount
                : 0;
              const discountedPrice =
                item.price - (item.price * discountPercent) / 100;

              return (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition duration-300 flex flex-col items-center"
                  > {/* 🖼️ Image */}
                    <div className="w-full h-60 flex items-center justify-center">
                      <img
                        src={item.image || "https://via.placeholder.com/200"}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                   
                    <h4 className="text-xl font-semibold mt-3 text-gray-800 text-center">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 text-center">
                      {item.description}
                    </p>

                    
                    <div className="mt-2">
                      {discountPercent > 0 ? (
                        <h4 className="text-lg font-bold text-red-500">
                          ₹{discountedPrice.toFixed(2)}
                          <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{item.price}
                          </span>
                          <span className="text-green-600 text-sm ml-1">
                            ({discountPercent}% Off)
                          </span>
                        </h4>
                      ) : (
                        <h4 className="text-lg font-bold text-green-500">
                          ₹{item.price}
                        </h4>
                      )}
                    </div>

                    
                    <h1 className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </h1>

                    
                    <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </div>
                </Link>
              );
            });
          })()}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-600 mt-12">
          <p className="text-xl font-semibold">No products available</p>
        </div>
      )}
    </div>
  );
}
