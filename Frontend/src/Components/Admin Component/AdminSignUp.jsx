import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";
function SignUp() {
  let [AdminName, setAdminName] = useState("");
  let [AdminEmail, setAdminEmail] = useState("");
  let [AdminPassword, setAdminPassword] = useState("");

  let data = { AdminName, AdminEmail, AdminPassword };

  let navigator = useNavigate();



  function postdata() {
    axios
      .post("https://e-commerce-5a5i.onrender.com/api/admin/signup", data)
      .then((res) => {
        console.log(res.data); 
        toast.success(res.data.message); 
        navigator("/AdminHome"); 
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message); 
        console.log(err.response); 
      });
  }




  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 py-4">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
        onSubmit={postdata}
      >
        <p className="text-2xl font-bold text-center mb-8 text-blue-600">
          Admin Sign Up
        </p>

        <label htmlFor="name" className="block text-gray-700 mb-2">
          Full Name:
        </label>
        <input
          type="text"
          id="AdminName"
          value={AdminName}
          onChange={(e) => setAdminName(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="AdminEmail"
          value={AdminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="AdminPassword"
          value={AdminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 text-white rounded-sm font-semibold mt-6 cursor-pointer hover:bg-blue-700 transition duration-300"
        >
          Create Account
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/Landing" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
