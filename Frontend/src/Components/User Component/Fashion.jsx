import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import UserNavbar from "./UserNavbar";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Mens from "./Mens";
import Electronics from "./Electronics";
import Womens from "./Womens";
import Kids from "./Kids";
import { FaArrowRight } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { FaFilter, FaTimes } from "react-icons/fa"; // Import icons

const categories = [
  {
    name: "Men",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/g/j/o/l-tblhn-dp-d144-tripr-original-imaha8k2mc8zcwgy.jpeg?q=70",
    link: "/Fashion/Mens",
  },
  {
    name: "Women",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/u/b/r/xxl-red-paak-tabeedah-original-imah8h73rqxdrvzz.jpeg?q=70",
    link: "/Fashion/Womens",
  },
  {
    name: "Kids",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-t-shirt/e/v/h/11-12-years-cb-2-906-style-hood-blk-grey-m-uzee-original-imaguxrrxthps5vd.jpeg?q=70",
    link: "/Fashion/Kids",
  },
];

// Discount List
const discountList = [
  { id: "Men's", discount: 20 },
  { id: "Women's", discount: 25 },
  { id: "Kid's", discount: 30 },
];

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const cart = useSelector((state) => state.cart.products);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/products")
      .then((res) => {
        // Filter only Men's, Women's, and Kid's products
        const filteredProducts = res.data.filter(
          (product) =>
            product.category === "Men's" ||
            product.category === "Women's" ||
            product.category === "Kid's"
        );
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isFashionMainPage = location.pathname === "/Fashion";
  const isMensPage = location.pathname === "/Fashion/Mens";
  const isWomensPage = location.pathname === "/Fashion/Womens";
  const isKidsPage = location.pathname === "/Fashion/Kids";

  // Main Fashion Page Filters
  const filteredItems = isFashionMainPage
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.price <= maxPrice &&
          (category === "All" || product.category === category)
      )
    : products; // No filtering if on category pages

  // Category-Specific Filters
  const mensFilteredItems = isMensPage
    ? products.filter((product) => product.category === "Men's")
    : filteredItems;

  const womensFilteredItems = isWomensPage
    ? products.filter((product) => product.category === "Women's")
    : mensFilteredItems;

  const kidsFilteredItems = isKidsPage
    ? products.filter((product) => product.category === "Kid's")
    : womensFilteredItems;

  if (sortOrder === "lowToHigh") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <UserNavbar />

      <div className="w-full flex flex-col md:flex-row justify-evenly items-center py-12 px-4 gap-8">
        <div className="text-black text-4xl md:text-5xl font-extrabold uppercase tracking-widest flex items-center">
          Fashion Hub <FaArrowRight className="ml-3 text-yellow-400" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="w-32 h-32">
              <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer w-full h-full p-2 bg-white">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-lg font-bold">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Routes>
        <Route path="Mens" element={<Mens />} />
        <Route path="Womens" element={<Womens />} />
        <Route path="Kids" element={<Kids />} />
        <Route path="Electronics" element={<Electronics />} />
      </Routes>
      <div className="p-4 md:hidden flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <FaFilter className="mr-2" /> Filters
        </button>
      </div>
      <div className="flex">
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
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Category</h3>
              <select
                className="w-full p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Men's">Men's</option>
                <option value="Women's">Women's</option>
                <option value="Kid's">Kid's</option>
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
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Category</h3>
            <select
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Men's">Men's</option>
              <option value="Women's">Women's</option>
              <option value="Kid's">Kid's</option>
            </select>
          </div>
        </div>

        {location.pathname === "/Fashion" && (
          <div className="w-full md:w-3/4 min-h-screen bg-gray-100 p-6">
            {loading ? (
              <p className="text-center text-lg font-semibold text-gray-600">
                Loading products...
              </p>
            ) : (
              <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  All Products
                </h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => {
                    const categoryDiscount = discountList.find(
                      (d) => d.id === item.category
                    );
                    const discountPercent = categoryDiscount
                      ? categoryDiscount.discount
                      : 0;
                    const discountedPrice =
                      item.price - (item.price * discountPercent) / 100;
                    const isAddedToCart = cart.some(
                      (cartItem) => cartItem._id === item._id
                    );

                    return (
                      <Link to={`/product/${item._id}`} key={item._id}>
                        <div
                          key={item._id}
                          className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition"
                        >
                          {/* Image with Proper Rounded Corners */}
                          <div className="w-full h-52 flex items-center justify-center">
                            <img
                              src={
                                item.image || "https://via.placeholder.com/200"
                              }
                              alt={item.name}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>

                          <h3 className="text-lg font-semibold text-gray-800 mt-2 text-center">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-center">
                            {item.description}
                          </p>

                          <div className="flex flex-col items-center mt-2">
                            {discountPercent > 0 ? (
                              <div className="text-green-600 font-semibold">
                                ₹{discountedPrice.toFixed(2)}
                                <span className="text-gray-500 line-through text-sm ml-2">
                                  ₹{item.price}
                                </span>
                              </div>
                            ) : (
                              <p className="text-md text-green-600 font-medium">{`₹ ${item.price}`}</p>
                            )}

                            {discountPercent > 0 && (
                              <p className="text-red-500 text-sm font-semibold">
                                {discountPercent}% OFF
                              </p>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                            View Details
                          </button>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fashion;
