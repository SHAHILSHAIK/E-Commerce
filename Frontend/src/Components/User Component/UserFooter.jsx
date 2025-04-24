import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-blue-600 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/Cart"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="/Cart"
                  className="hover:text-orange-500 transition duration-200 ease-in-out"
                >
                  Checkout
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social Media & Contact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-3xl hover:text-orange-500 transition duration-200 ease-in-out" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-3xl hover:text-orange-500 transition duration-200 ease-in-out" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-3xl hover:text-orange-500 transition duration-200 ease-in-out" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-3xl hover:text-orange-500 transition duration-200 ease-in-out" />
              </a>
            </div>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:support@ecommerce.com"
                className="text-orange-500"
              >
                support@ecommerce.com
              </a>
            </p>
            <p>Phone: +1 (234) 567-890</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-blue-700 text-center py-6 mt-8">
        <p className="text-sm font-light">
          © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
