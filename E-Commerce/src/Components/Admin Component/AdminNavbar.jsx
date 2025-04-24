import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { BiSearch } from "react-icons/bi"; // Search icon
import SearchBar from "../User Component/SearchBar";
import { Tooltip } from "react-tooltip";

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 fixed w-full z-50">
      <header className="flex items-center justify-between w-full h-[80px] px-6 md:px-10 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/AdminHome/">
            <img
              className="w-14 h-14 rounded-full border-2 border-white"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHsHcSRrBzAiYKjRuU6K7zzPNWZdtg6iP6Q&s"
              alt="Logo"
            />
          </Link>
        </div>
        {/* <div className="flex justify-center py-3 px-4">
          <div className="flex items-center w-full max-w-3xl bg-white border border-gray-300 rounded-full px-5 py-1.5 shadow-md">
            <BiSearch className="text-lg text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-black text-sm py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 py-1 rounded-full ml-2 hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div> */}

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-6 sm:gap-10 text-sm sm:text-lg">
          <Link to="/AdminHome/">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/AdminHome/ViewItems">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              View Items
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/AdminHome/AddItems">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Add Products
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/">
            <li className="cursor-pointer hover:text-red-500 transition duration-200 ease-in-out flex items-center">
              <IoMdLogOut size={30} />
            </li>
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          data-tooltip-id="logout-tooltip"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <Tooltip id="logout-tooltip" place="bottom" effect="solid">
          Logout
        </Tooltip>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-600 py-4 space-y-4 text-white text-lg">
          <Link to="/AdminHome/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/AdminHome/ViewItems" onClick={() => setMenuOpen(false)}>
            View Items
          </Link>
          <Link to="/AdminHome/AddItems" onClick={() => setMenuOpen(false)}>
            Add Products
          </Link>
          <Link to="/">
            <IoMdLogOut size={30} />
          </Link>
        </div>
      )}
    </div>
  );
}
