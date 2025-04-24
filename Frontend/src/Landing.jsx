import React from "react";
import AdminLogin from "./Components/Admin Component/AdminLogin";
import UserLogin from "./Components/User Component/UserLogin";

function Landing() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-6xl rounded-xl shadow-xl overflow-hidden">
        {/* Admin Login Section */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <AdminLogin />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300" />

        {/* User Login Section */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
          <div className="w-full max-w-sm">
            <UserLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
