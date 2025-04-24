import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function ViewItems() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); // State for image modal

  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initially show all products
      })
      .catch(() => {
        toast.error("Failed to fetch products");
      });
  }, []);

  // Delete a product
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3005/api/products/${id}`)
      .then(() => {
        toast.success("Product deleted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  };

  // Navigate to update page
  const updateData = (id) => {
    navigate(`/AdminHome/Update/${id}`);
  };

  // Filter products based on selected category
  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  // Categories for filtering
  const categories = [
    { id: "All", name: "All" },
    { id: "Men's", name: "Men's" },
    { id: "Women's", name: "Women's" },
    { id: "Kid's", name: "Kid's" },
    { id: "Furniture", name: "Furniture" },
    { id: "Electronics", name: "Electronics" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        View All Products
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilter(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-200 flex flex-col w-full max-w-[320px] mx-auto min-h-[400px]"
            >
              {/* Image - Opens Modal on Click */}
              <div
                className="flex justify-center mb-4 bg-slate-300 cursor-pointer"
                onClick={() => setSelectedImage(product.image)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-[200px] object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-blue-500">{`₹ ${product.price}`}</span>
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex justify-between items-center space-x-4">
                <button
                  onClick={() => updateData(product._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Image Modal */}
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
  );
}
