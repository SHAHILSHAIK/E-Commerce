
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaUserCircle } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5"; 
import { useSelector } from "react-redux"; 

export default function UserNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false); 

  const cartItems = useSelector((state) => state.cart.products);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <div className="bg-blue-600 text-white w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHsHcSRrBzAiYKjRuU6K7zzPNWZdtg6iP6Q&s"
              alt="Logo"
            />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6 sm:gap-10 text-sm sm:text-lg">
          <Link to="/">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/Fashion">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Fashion
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/Electronics">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Electronics
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
          <Link to="/Furn">
            <li className="relative group cursor-pointer hover:text-orange-500 transition duration-200 ease-in-out">
              Furniture
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </Link>
        </ul>

        <div className="flex items-center gap-6">
          <Link to="/Cart" className="relative">
            <FaCartPlus className="text-2xl sm:text-3xl hover:text-orange-500 transition duration-200 ease-in-out" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="relative hidden md:block z-10 ">
            <button
              className="flex items-center gap-1 hover:text-orange-500 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-2xl" />
              Account
            </button>

            {dropdownOpen && (
              <ul className="absolute top-full right-0 mt-1 w-40 bg-white text-black shadow-lg rounded-md z-50">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 pb-4 text-lg bg-blue-700 w-full">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="cursor-pointer hover:text-orange-400 transition duration-200">
              Home
            </li>
          </Link>
          <Link to="/Fashion" onClick={() => setMenuOpen(false)}>
            <li className="cursor-pointer hover:text-orange-400 transition duration-200">
              Fashion
            </li>
          </Link>
          <Link to="/Electronics" onClick={() => setMenuOpen(false)}>
            <li className="cursor-pointer hover:text-orange-400 transition duration-200">
              Electronics
            </li>
          </Link>
          <Link to="/Furn" onClick={() => setMenuOpen(false)}>
            <li className="cursor-pointer hover:text-orange-400 transition duration-200">
              Furniture
            </li>
          </Link>

          <li
            className="cursor-pointer flex flex-col items-center hover:text-orange-400 transition duration-200"
            onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
          >
            <div className="flex items-center gap-1">
              <FaUserCircle className="text-xl" />
              Account
            </div>

            {mobileAccountOpen && (
              <ul className="w-full text-center mt-2 bg-blue-800 rounded-md">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Landing"
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      setMobileAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
