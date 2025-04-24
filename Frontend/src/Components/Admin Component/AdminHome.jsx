import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Route, Routes } from "react-router-dom";
import ViewItems from "./ViewItems";
import Dashboard from "./Dashboard";
import AddItems from "./AddItems";
import Update from "./Update";
function AdminHome() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/ViewItems" element={<ViewItems />}></Route>
        <Route path="/AddItems" element={<AddItems />}></Route>
        <Route path="/Update/:id" element={<Update />}></Route>
      </Routes>
    </div>
  );
}

export default AdminHome;
