import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import UserNavbar from "./UserNavbar";

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50  flex flex-col items-center">
      {/* User Navbar */}
      <div className="w-full ">
        <UserNavbar />
      </div>

      {/* Order Placed Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="bg-white rounded-2xl p-10 mt-10 shadow-xl text-center max-w-md w-full"
      >
        {/* Checkmark Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="text-green-600" size={64} />
        </motion.div>

        {/* Success Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-bold text-green-700 mb-2"
        >
          Order Placed Successfully!
        </motion.h2>

        {/* Sub Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Thank you for your purchase. Your order has been successfully placed
          and is being processed.
        </motion.p>

        {/* Home Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => navigate("/Home")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderPlaced;
