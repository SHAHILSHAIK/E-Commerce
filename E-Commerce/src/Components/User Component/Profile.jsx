import React from "react";
import UserNavbar from "./UserNavbar";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // Replace with real image URL
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <UserNavbar />

      {/* Profile Card */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-blue-500"
        />

        {/* Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-600 text-sm mb-6">{user.email}</p>

        {/* Edit Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
