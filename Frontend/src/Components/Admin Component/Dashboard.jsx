import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowDown, FaTimes } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to track clicked image

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/products")
      .then((response) => {
        const products = response.data;
        const categoryCounts = {};
        products.forEach((product) => {
          categoryCounts[product.category] =
            (categoryCounts[product.category] || 0) + 1;
        });
        setCategoryData(categoryCounts);
      })
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const categorizedProducts = {
    "Men's Collections": products.filter((p) => p.category === "Men's"),
    "Women's Collections": products.filter((p) => p.category === "Women's"),
    "Kid's Collections": products.filter((p) => p.category === "Kid's"),
    "Electronics Collections": products.filter(
      (p) => p.category === "Electronics"
    ),
    "Furniture Collections": products.filter((p) => p.category === "Furniture"),
  };

  return (
    <main>
      <nav>
        <AdminNavbar />
      </nav>
      <section className="min-h-screen w-full">
        <div className="flex flex-col md:flex-row bg-gray-100">
          {/* Sidebar */}
          <div className="w-full hidden md:block mt-20 md:w-1/5 bg-gray-900 text-white p-4 shadow-lg fixed left-0 z-50 md:h-screen">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Admin Dashboard
            </h1>
            <h2 className="text-lg text-gray-300 text-center md:text-left mt-2">
              Products Overview
            </h2>
            <ul className="mt-4 flex md:block overflow-x-auto md:overflow-visible justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
              {Object.entries(categoryData).map(([category, count]) => (
                <li
                  key={category}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md text-black text-sm md:text-lg min-w-[140px] md:min-w-full"
                >
                  <span className="capitalize font-semibold">{category}</span>
                  <span className="font-bold text-white bg-blue-500 px-3 py-1 rounded-full">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 md:ml-[20%] pt-20 md:pt-24 md:mt-0 p-5">
            {Object.entries(categorizedProducts).map(
              ([title, items], index) => (
                <div key={index} className="py-6 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold uppercase flex items-center justify-center">
                    {title}
                    <FaArrowDown className="ml-3 text-yellow-400 text-xl md:text-2xl" />
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 pt-0 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {loading ? (
                      <p className="text-center text-gray-500 col-span-full text-lg">
                        Loading products...
                      </p>
                    ) : items.length > 0 ? (
                      items.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white text-center p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200 flex flex-col w-full max-w-xs mx-auto cursor-pointer"
                        >
                          <div
                            className="flex justify-center mb-3"
                            onClick={() => setSelectedImage(product.image)}
                          >
                            <img
                              src={
                                product.image ||
                                "https://via.placeholder.com/150"
                              }
                              alt={product.name}
                              className="w-full h-40 object-contain rounded-lg"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-700 text-sm">
                            {product.description}
                          </p>
                          <span className="text-lg font-semibold text-blue-500">
                            ₹ {product.price}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-full text-lg">
                        No products found.
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          {selectedImage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
              <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-7 max-w-full sm:max-w-[650px] overflow-hidden">
                <button
                  className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
                  onClick={() => setSelectedImage(null)}
                >
                  <FaTimes size={24} />
                </button>
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="w-full max-w-[90vw] max-h-[80vh] object-contain rounded-lg 
              sm:w-[600px] sm:h-[450px] sm:max-w-none sm:max-h-none"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
