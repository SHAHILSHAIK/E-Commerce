import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import UserNavbar from "./UserNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa"; // Import icons

function Furn() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showTabletFilters, setShowTabletFilters] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/products")
      .then((res) => {
        const furnitureProducts = res.data.filter(
          (product) => product.category === "Furniture"
        );
        setProducts(furnitureProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price <= maxPrice &&
      (category === "All" || product.subcategory === category)
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <UserNavbar />
      <div className="p-6">
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src="https://raw.githubusercontent.com/MuzzammilAfridi/oasifront/refs/heads/main/public/furniture-3.webp"
            alt="Latest Electronics Deals"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-6 py-4">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Latest Electronics Deals
            </h1>
            <p className="text-lg sm:text-xl mt-2">
              Discover the best discounts on top electronic devices and gadgets.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:hidden flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <FaFilter className="mr-2" /> Filters
        </button>
      </div>
      {/* Page Layout: Sidebar + Products */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-transform transform ${
            showMobileFilters ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="w-3/4 bg-white h-full p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {/* Search Filter */}
            <div className="mb-4 mt-4">
              <h3 className="text-lg font-semibold">Search</h3>
              <input
                type="text"
                placeholder="Search kids' fashion..."
                className="p-2 border w-full rounded mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <input
                type="range"
                min="0"
                max="3000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full mt-2"
              />
              <p className="mt-1 font-semibold">Max Price: ₹{maxPrice}</p>
            </div>

            {/* Sort by Price */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Sort by Price</h3>
              <select
                className="w-full p-2 border rounded"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Tablet & Desktop Filters */}
        <div className="hidden md:block w-1/4 min-h-screen bg-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Search</h3>
            <input
              type="text"
              placeholder="Search kids' fashion..."
              className="p-2 border w-full rounded mt-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Price Range</h3>
            <input
              type="range"
              min="0"
              max="3000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full mt-2"
            />
            <p className="mt-1 font-semibold">Max Price: ₹{maxPrice}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Sort by Price</h3>
            <select
              className="w-full p-2 border rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">None</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4 min-h-screen bg-gray-100 p-6">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
            Furniture Collection
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 text-center">
              No matching furniture found.
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const discountPercent = 25;
                const discountedPrice =
                  product.price - (product.price * discountPercent) / 100;

                const isAddedToCart = cart.some(
                  (cartItem) => cartItem._id === product._id
                );

                return (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center hover:shadow-2xl transition duration-300 cursor-pointer border border-gray-200">
                      {/* Image Container */}
                      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/200"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Name */}
                      <h4 className="text-xl font-semibold mt-3 text-gray-900 text-center">
                        {product.name}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 text-sm text-center mt-1">
                        {product.description}
                      </p>

                      {/* Price & Discount Section */}
                      <div className="flex flex-col items-center mt-3">
                        <h4 className="text-lg font-bold text-green-600">
                          ₹{discountedPrice.toFixed(2)}
                          <span className="text-gray-400 line-through text-sm ml-2">
                            ₹{product.price}
                          </span>
                        </h4>
                        <p className="text-red-500 text-xs font-semibold">
                          ({discountPercent}% OFF)
                        </p>
                      </div>

                      {/* Button */}
                      <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                        View Details
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Furn;
