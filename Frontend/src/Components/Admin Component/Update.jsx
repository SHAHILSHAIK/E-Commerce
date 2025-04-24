import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Ensure toast is imported

export default function Update()
{
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
    
    const param = useParams();

  const data = { category, name, image, description, price };
    

  // Fetch product data when the component mounts
  useEffect(() => {
    function getdata() {
      axios
        .get(`http://localhost:3005/api/products/${param.id}`)
        .then((res) => {
          console.log(res.data)
          setCategory(res.data.category);
          setDescription(res.data.description);
          setImage(res.data.image);
          setName(res.data.name);
          setPrice(res.data.price);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getdata();
  }, [param.id]); 

  let navigate = useNavigate();

    function Updatedata(e)
    {
    e.preventDefault()
    axios
      .put(`http://localhost:3005/api/products/${param.id}`, data)
      .then((res) => {
        toast.success("Product updated successfully");
        navigate("/AdminHome/ViewItems");
        console.log(res)
      })
      .catch((err) => {
        toast.error("Failed to update product");
      });
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={Updatedata}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-[600px] space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-blue-500">
          Update Product
        </h2>

        {/* Category */}
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Men's">Men's</option>
            <option value="Women's">Women's</option>
            <option value="Kid's">Kid's</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>{" "}
            {/* ✅ Added Furniture */}
          </select>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Image (URL Input) */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
