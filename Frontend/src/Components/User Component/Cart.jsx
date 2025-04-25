import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import UserNavbar from "./UserNavbar";

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

 
  const discounts = {
    "Men's": 20,
    "Women's": 25,
    "Kid's": 30,
    Electronics: 40,
    Furniture: 35,
  };

  
  const getDiscountedPrice = (price, category) => {
    const discount = discounts[category] || 0;
    return price - (price * discount) / 100;
  };

 
  const subtotal = cart.reduce(
    (total, item) =>
      total + getDiscountedPrice(item.price, item.category) * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold pb-4 border-b">
                Cart Items ({cart.length})
              </h2>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {cart.map((item) => {
                    const discount = discounts[item.category] || 0; 
                    const discountedPrice = getDiscountedPrice(
                      item.price,
                      item.category
                    );
                    const savings = item.price - discountedPrice; 
                    return (
                      <div
                        key={item._id}
                        className="flex py-4 border-b last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 bg-gray-200 rounded object-cover mr-4"
                        />
                        <div className="flex-grow flex flex-col justify-between">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{item.name}</h3>

                            {/* Show Discounted Price and Savings */}
                            <div className="text-right">
                              <span className="font-semibold text-blue-600 text-lg">
                                ₹{discountedPrice.toFixed(2)}
                              </span>
                              {discount > 0 && (
                                <>
                                  <p className="text-gray-500 line-through text-sm">
                                    ₹{item.price}
                                  </p>
                                  <p className="text-green-600 text-sm font-semibold">
                                    You Save ₹{savings.toFixed(2)} ({discount}%
                                    OFF)
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Quantity and Remove Button */}
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <button
                                className="w-8 h-8 bg-gray-200 rounded"
                                onClick={() =>
                                  dispatch(decreaseQuantity(item._id))
                                }
                              >
                                -
                              </button>
                              <span className="mx-3 font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 bg-gray-200 rounded"
                                onClick={() =>
                                  dispatch(increaseQuantity(item._id))
                                }
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-red-600 text-sm"
                              onClick={() => dispatch(removeFromCart(item._id))}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Clear Cart Button */}
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={cart.length=== 0 ? null:() => navigate("/Address")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
              >
                Place Order
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => navigate("/Home")}
                  className="text-blue-600 hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
