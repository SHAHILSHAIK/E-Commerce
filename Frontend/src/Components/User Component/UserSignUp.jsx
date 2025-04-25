import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  const data = { UserName, UserEmail, UserPassword };

  const navigator = useNavigate();

  const postData = () => {
    axios
      .post("https://e-commerce-5a5i.onrender.com/api/user/signup", data)
      .then((res) => {
        console.log(res.data); 
        toast.success(res.data.message); 
        navigator("/Home");
      })
      .catch((err) => {
        console.log(err.response); 
        toast.error(err.response?.data?.message || err.message); 
      });
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 py-4">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="text-2xl font-bold text-center mb-8 text-blue-600">
          User Sign Up
        </p>

        
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Full Name:
        </label>
        <input
          type="text"
          id="name"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

       
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="UserEmail"
          value={UserEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="UserPassword"
          value={UserPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="border border-blue-500 rounded-sm w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 text-white rounded-sm font-semibold mt-6 cursor-pointer hover:bg-blue-700 transition duration-300"
          onClick={postData}
        >
          Create Account
        </button>

        
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
