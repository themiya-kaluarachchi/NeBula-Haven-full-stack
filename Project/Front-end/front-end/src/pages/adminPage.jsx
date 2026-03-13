import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FiCodesandbox, FiUsers } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[95%] h-[100px] bg-accent items-center rounded-2xl mb-[20px]">
          <img src="/logo2.png" alt="Nebula Haven" className="h-[70px]" />
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>

        <Link
          to="/admin"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FaChartLine className="text-xl" />
          Dashboard
        </Link>
        <Link
          to="/admin/orders"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <BsCart4 className="text-xl" />
          Orders
        </Link>
        <Link
          to="/admin/products"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FiCodesandbox className="text-xl" />
          Products
        </Link>
        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FiUsers className="text-xl" />
          Users
        </Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden">
        <div className="h-full w-full max-w-full max-h-full overflow-y-scroll">
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="orders" element={<h1>Orders</h1>} />
            <Route path="users" element={<h1>Users</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
