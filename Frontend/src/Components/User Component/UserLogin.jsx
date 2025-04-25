import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
const UserLogin = () => {
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
    let[error,setError]=useState(false)
  

  const [UserpasswordVisible, setUserPasswordVisible] = useState(false);

  const navigator = useNavigate();

  let data = { UserEmail, UserPassword };

  const userLogin = () => {
    getLogin();
  };

  function getLogin() {
    axios
      .post("https://e-commerce-5a5i.onrender.com/api/user/login", data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigator("/Home");
        setError(false);
      })
      .catch((err) => {
        console.error(err.response);
        setError(true);
      });
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="w-96  px-6 py-8 ">
        <div className="flex justify-center mb-2">
          <FaUser size={40} className="text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-center mb-6 text-blue-600">
          User Login
        </p>

        {/* User Email Input */}
        <label htmlFor="userEmail" className="block text-gray-700 mb-2">
          User Email:
        </label>
        <input
          type="email"
          id="userEmail"
          value={UserEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border  border-blue-500 rounded-lg w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* User Password Input */}
        <label htmlFor="userPassword" className="block text-gray-700 mb-2">
          User Password:
        </label>
        <div className="relative">
          <input
            type={UserpasswordVisible ? "text" : "password"}
            id="userPassword"
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="border border-blue-500 rounded-lg w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setUserPasswordVisible(!UserpasswordVisible)}
            className="absolute top-1/3 right-3 transform -translate-y-1/3 text-blue-600"
          >
            {UserpasswordVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        </div>

        
        <button
          onClick={userLogin}
          className="w-full bg-blue-600 py-2 text-white rounded-lg font-semibold mt-6 cursor-pointer hover:bg-blue-700 transition duration-300"
        >
          Login as User
        </button>
        <p className="text-red-600 text-center">
          {error ? "Invalid Password or Email" : ""}
        </p>

        
        <p className="text-gray-500 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/UserSignUp" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
