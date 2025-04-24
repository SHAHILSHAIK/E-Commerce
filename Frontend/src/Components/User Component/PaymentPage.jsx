import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08; // 8% Tax
  const total = subtotal + tax;

  const handlePayment = () => {
    alert("Razorpay Payment Gateway will open here!");
  };

  return (
    <div className="">
      <UserNavbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold text-center mb-4">
            Payment Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
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
            onClick={handlePayment}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
          >
            Pay Now
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/cart")}
              className="text-blue-600 hover:underline"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
