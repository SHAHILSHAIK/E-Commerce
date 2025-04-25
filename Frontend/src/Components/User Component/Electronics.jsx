import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import UserNavbar from "./UserNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa"; 

function Electronics() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(80000);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showTabletFilters, setShowTabletFilters] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    axios
      .get("https://e-commerce-5a5i.onrender.com/api/products")
      .then((res) => {
        const electronicsProducts = res.data.filter(
          (product) => product.category === "Electronics"
        );
        setProducts(electronicsProducts);
      })
      .catch((err) => console.log(err));
  }, []);

 
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
            src="https://oasifront.onrender.com/Mobiles.webp"
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
      {/* Filter Button for Mobile & Tablet */}
      <div className="p-4 md:hidden flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <FaFilter className="mr-2" /> Filters
        </button>
      </div>

      <div className="flex">
        {/* Sidebar for Desktop (Always Visible) & Tablet (Collapsible) */}
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
            Electronics Collection
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300">
                  <div className="w-full h-52 flex items-center justify-center">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mt-2 text-center">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 text-center">
                    {product.description}
                  </p>
                  <div className="flex flex-col items-center mt-2">
                    <h4 className="text-lg font-bold text-green-500">
                      ₹{(product.price * 0.85).toFixed(2)}
                      <span className="text-gray-500 line-through text-sm ml-2">
                        ₹{product.price}
                      </span>
                    </h4>
                    <p className="text-red-500 text-sm font-semibold">
                      15% OFF
                    </p>
                    <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Electronics;
