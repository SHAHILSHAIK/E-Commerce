import React from "react";
import AdminSignUp from "./Components/Admin Component/AdminSignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Admin Component/AdminLogin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminHome from "./Components/Admin Component/AdminHome";
import UserHome from "./Components/User Component/UserHome";
import UserSignUp from "./Components/User Component/UserSignUp";
import Cart from "./Components/User Component/Cart";
import Fashion from "./Components/User Component/Fashion";
import Furniture from "./Components/User Component/Furn";
import Electronics from "./Components/User Component/Electronics";
import Products from "./Components/User Component/Products";
import PaymentPage from "./Components/User Component/PaymentPage";
import ProductDetail from "./Components/User Component/ProductDetail";
import Landing from "./Landing";
import Address from "./Components/User Component/Address";
import OrderPlaced from "./Components/User Component/OrderPlaced";
import Orders from "./Components/User Component/Orders";
import Profile from "./Components/User Component/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Landing" element={<Landing />} />
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/UserSignUp" element={<UserSignUp />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/address" element={<Address />} />
          <Route path="/Fashion/*" element={<Fashion />}></Route>
          <Route path="/Electronics" element={<Electronics />}></Route>
          <Route path="/Furn" element={<Furniture />}></Route>
          <Route path="/AdminSignUp" element={<AdminSignUp />}></Route>
          <Route path="/AdminHome/*" element={<AdminHome />}></Route>
          <Route path="/products" element={<Products />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;
