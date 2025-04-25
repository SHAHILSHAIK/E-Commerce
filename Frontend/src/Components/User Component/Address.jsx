import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import axios from "axios";

const Address = () => {
  const [DoorNo, setDoorNo] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [District, setDistrict] = useState("");
  const [State, setState] = useState("");
  const [Pincode, setPincode] = useState("");

  const data = { DoorNo, State, Street, Pincode, City, District };

  const navigate = useNavigate(); 

  function handleSubmit(e) {
    e.preventDefault(); 

    axios
      .post("https://e-commerce-5a5i.onrender.com/api/user/address", data)
      .then((res) => {
        console.log(res.data);
        
        navigate("/order-placed");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const cart = useSelector((state) => state.cart.products);

  const discounts = {
    "Men's": 20,
    "Women's": 25,
    "Kid's": 30,
    Electronics: 40,
    Furniture: 35,
  };

  const getDiscountedPrice = (price, category) => {
    const discount = discounts[category] || 0;
    return price - (price * discount) / 100;
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + getDiscountedPrice(item.price, item.category) * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="bg-gray-100 min-h-screen">
      <UserNavbar />
      <section className="flex flex-col md:flex-row items-start justify-center gap-10 p-6">
        {/* Address Form */}
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Shipping Address
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                placeholder="Door No"
                type="text"
                id="DoorNo"
                name="DoorNo"
                value={DoorNo}
                onChange={(e) => setDoorNo(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <input
                placeholder="Street"
                type="text"
                id="Street"
                name="Street"
                value={Street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <input
                placeholder="City"
                type="text"
                id="City"
                name="City"
                value={City}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <input
                placeholder="District"
                type="text"
                id="District"
                name="District"
                value={District}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <input
                placeholder="State"
                type="text"
                id="State"
                name="State"
                value={State}
                onChange={(e) => setState(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <div>
              <input
                placeholder="Pincode"
                type="text"
                id="Pincode"
                name="Pincode"
                value={Pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Submit Order
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Address;
