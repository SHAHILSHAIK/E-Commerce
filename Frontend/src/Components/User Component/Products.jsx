import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import UserNavbar from "./UserNavbar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
const Products = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://e-commerce-5a5i.onrender.com/api/products");
        setProducts(response.data);

        if (query) {
          const filtered = response.data.filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.category.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [query]);

  const discountList = {
    "Men's": 20,
    "Women's": 25,
    "Kid's": 30,
    Electronics: 40,
    Furniture: 35,
    };
    

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNavbar />
      <SearchBar />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {query ? `Search Results for "${query}"` : "All Products"}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const discount = discountList[product.category] || 0;
              const discountedPrice =
                product.price - (product.price * discount) / 100;

              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div
                    key={product._id}
                    className="bg-white text-center shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 w-full"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-lg"
                    />

                    {/* Product Name & Category */}
                    <h3 className="text-lg font-semibold text-gray-800 mt-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{product.category}</p>

                    {/* Discount Information */}
                    {discount > 0 && (
                      <p className="text-red-500 text-sm">
                        Discount: {discount}% OFF
                      </p>
                    )}

                    {/* Price Display */}
                    <p className="text-green-600 font-bold text-lg mt-2">
                      ₹{discountedPrice.toFixed(2)}{" "}
                      {discount > 0 && (
                        <span className="text-gray-500 line-through ml-2 text-sm">
                          ₹{product.price}
                        </span>
                      )}
                    </p>

                    {/* Product Description */}
                    <p className="text-gray-500 text-sm truncate">
                      {product.description}
                    </p>

                    {/* Add to Cart Button */}
                    <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
