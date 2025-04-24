import React from "react";
import UserNavbar from "./UserNavbar";

function Orders() {
  return (
    <main className="min-h-screen bg-gray-100 w-full flex flex-col items-center">
      {/* Navbar */}
      <UserNavbar />

      {/* Orders Section */}
      <section className="mt-16 bg-white p-6 rounded-xl shadow-md w-full max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Orders
        </h2>
        <p className="text-gray-500">No orders found.</p>
      </section>
    </main>
  );
}

export default Orders;
