import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import AdminNavbar from "./AdminNavbar";

export default function ProductForm() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  let data = { category, name, image, description, price };

  function Postdata(e) {
    e.preventDefault()
    // Prevent default form submission
    axios
      .post("http://localhost:3005/api/products", data)
      .then((res) => {
        toast.success("Data Posted Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setCategory("")
        setDescription("")
        setImage("")
        setName("")
        setPrice("")
      })
      .catch((err) => {
        toast.error("Invalid data");
      });
  }

  return (
    <main className="h-screen w-full">
      <nav>
        <AdminNavbar />
      </nav>
      <section className="pt-24 bg-gray-50">
        <div className="flex justify-center items-center px-4">
          <form
            method="post"
            onSubmit={Postdata}
            className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-lg space-y-4 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-center text-blue-600 uppercase tracking-wide">
              Add Product
            </h2>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select Category</option>
                <option value="Men's">Men's</option>
                <option value="Women's">Women's</option>
                <option value="Kid's">Kid's</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                rows="2"
                placeholder="Enter product description"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Add Product
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </section>
    </main>
  );
}
