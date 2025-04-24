import React from "react";
import AdminLogin from "./Components/Admin Component/AdminLogin";
import UserLogin from "./Components/User Component/UserLogin";

function Landing() {
  return (
    <div className="flex justify-center align-bottom items-center w-full h-screen bg-blue-50 ">
      <div className="bg-white flex p-6 rounded-lg">
        {/* Admin Login Component */}
        <div className="w-full max-w-md ">
          <AdminLogin />
          
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-400 h-auto mx-6" />

        {/* User Login Component */}
        <div className="w-full max-w-md  ">
          <UserLogin />
        </div>
      </div>
    </div>
  );
}

export default Landing;
