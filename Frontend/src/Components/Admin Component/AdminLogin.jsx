import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { RiAdminFill } from "react-icons/ri";
function AdminLogin() {
  let [AdminEmail, setAdminEmail] = useState("");
  let [AdminPassword, setAdminPassword] = useState("");
  let[error,setError]=useState(false)

  const navigator = useNavigate();

  const [AdminpasswordVisible, setAdminPasswordVisible] = useState(false);

  let AdminData = { AdminEmail, AdminPassword };

  function GetData() {
    axios
      .post("https://e-commerce-5a5i.onrender.com/api/admin/login", AdminData)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        navigator("/AdminHome");
        setError(false)

      })
      .catch((err) => {
        console.error(err.response);
        setError(true)
      });
  }

  const AdminLogin = () => {
    GetData();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-96  px-6 py-8 ">
        <div className="flex justify-center mb-2">
          <RiAdminFill size={40} className="text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-center mb-6 text-blue-600">
          Admin Login
        </p>

        {/* Admin Email Input */}
        <label htmlFor="adminEmail" className="block text-gray-700 mb-2">
          Admin Email:
        </label>
        <input
          type="email"
          id="adminEmail"
          value={AdminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="border border-blue-500 rounded-lg w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Admin Password Input */}
        <label htmlFor="adminPassword" className="block text-gray-700 mb-2">
          Admin Password:
        </label>
        <div className="relative">
          <input
            type={AdminpasswordVisible ? "text" : "password"}
            id="adminPassword"
            value={AdminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="border border-blue-500 rounded-lg w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setAdminPasswordVisible(!AdminpasswordVisible)}
            className="absolute top-1/3 right-3 transform -translate-y-1/3 text-blue-600"
          >
            {AdminpasswordVisible ? (
              <IoEyeOff size={20} />
            ) : (
              <IoEye size={20} />
            )}
          </button>
        </div>

        {/* Admin Login Button */}
        <button
          onClick={AdminLogin}
          className="w-full bg-blue-600 py-2 text-white rounded-lg font-semibold mt-6 cursor-pointer hover:bg-blue-700 transition duration-300"
        >
          Login as Admin
        </button>
        <p className="text-red-600 text-center">
          {error ? "Invalid Password or Email" : ""}
        </p>

        <p className="text-gray-500 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/AdminSignUp" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
