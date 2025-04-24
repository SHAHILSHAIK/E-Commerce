import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import UserNavbar from "./UserNavbar";
import { FaTimes } from "react-icons/fa";

const discountList = [
  { id: "Men's", discount: 20 },
  { id: "Women's", discount: 25 },
  { id: "Kid's", discount: 30 },
  { id: "Electronics", discount: 40 },
  { id: "Furniture", discount: 35 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for image modal

  // 🛒 Get Cart Products from Redux
  const cartItems = useSelector((state) => state.cart.products) || [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/products`);
        const related = response.data.filter(
          (item) =>
            item.category === product?.category && item._id !== product?._id
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("❌ Error fetching related products:", error);
      }
    };

    if (product) fetchRelatedProducts();
  }, [product]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // ✅ Get Discount for the Category
  const categoryDiscount =
    discountList.find((item) => item.id === product.category)?.discount || 0;

  const discountedPrice =
    categoryDiscount > 0
      ? product.price - (product.price * categoryDiscount) / 100
      : product.price;

  // 🛒 Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div
            className="flex justify-center mb-4  cursor-pointer"
            onClick={() => setSelectedImage(product.image)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-[400px] h-[400px] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 text-lg mt-2 capitalize">
              {product.category}
            </p>
            <p className="text-gray-700 mt-4 text-lg">{product.description}</p>

            {/* ✅ Discounted Price Display */}
            <div className="mt-6">
              {categoryDiscount > 0 ? (
                <div>
                  <p className="text-red-500 text-lg font-bold">
                    {categoryDiscount}% OFF
                  </p>
                  <p className="text-gray-500 line-through text-lg">
                    ₹{product.price}
                  </p>
                  <p className="text-green-600 text-3xl font-bold">
                    ₹{discountedPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-green-600 text-3xl font-bold">
                  ₹{product.price}
                </p>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={isProductInCart} // ✅ Disable if product is already in cart
            className={`mt-6 w-full py-3 text-lg font-semibold rounded-lg transition ${
              isProductInCart
                ? "bg-gray-400 cursor-not-allowed" // ✅ Disabled style
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isProductInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 px-10 py-7 bg-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map((item) => {
              // ✅ Apply category-based discount to related products
              const relatedCategoryDiscount =
                discountList.find((d) => d.id === item.category)?.discount || 0;
              const relatedDiscountedPrice =
                relatedCategoryDiscount > 0
                  ? item.price - (item.price * relatedCategoryDiscount) / 100
                  : item.price;

              return (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center relative">
                    {/* Discount Badge */}
                    {relatedCategoryDiscount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        {relatedCategoryDiscount}% OFF
                      </span>
                    )}

                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[300px] h-[350px] object-contain rounded-lg shadow-md"
                    />

                    {/* Product Details */}
                    <h3 className="font-semibold text-lg mt-4 text-gray-800 text-center">
                      {item.name}
                    </h3>

                    {/* Pricing with Discount Styling */}
                    <div className="mt-2 text-center">
                      {relatedCategoryDiscount > 0 ? (
                        <>
                          <p className="text-gray-500 line-through text-sm">
                            ₹{item.price}
                          </p>
                          <p className="text-green-600 font-bold text-xl">
                            ₹{relatedDiscountedPrice.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-green-600 font-bold text-xl">
                          ₹{item.price}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

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
};

export default ProductDetail;
