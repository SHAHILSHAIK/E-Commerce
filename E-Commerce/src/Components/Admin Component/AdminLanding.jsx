import React from "react";
import { Link } from "react-router-dom";

const AdminLanding = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white px-8 py-10 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Admin Panel</h2>

        <div className="space-y-4">
          <Link
            to="/AdminSignUp"
            className="block w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Admin Sign-Up
          </Link>
          <Link
            to="/AdminLogin"
            className="block w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Admin Sign-In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
