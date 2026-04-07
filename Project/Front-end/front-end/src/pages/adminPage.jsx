import React from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FiCodesandbox, FiUsers } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddNewProduct from "./admin/adminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrders";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[95%] h-[100px] bg-accent items-center rounded-2xl mb-[20px]">
          <img src="/logo2.png" alt="Nebula Haven" className="h-[70px]" />
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `w-[90%] flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
    ${
      isActive
        ? "bg-accent text-white shadow-md"
        : "text-secondary hover:bg-accent/10"
    }`
          }
        >
          <FaChartLine className="text-xl" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `w-[90%] flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
    ${
      isActive
        ? "bg-accent text-white shadow-md"
        : "text-secondary hover:bg-accent/10"
    }`
          }
        >
          <BsCart4 className="text-xl" />
          Orders
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `w-[90%] flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
    ${
      isActive
        ? "bg-accent text-white shadow-md"
        : "text-secondary hover:bg-accent/10"
    }`
          }
        >
          <FiCodesandbox className="text-xl" />
          Products
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `w-[90%] flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
    ${
      isActive
        ? "bg-accent text-white shadow-md"
        : "text-secondary hover:bg-accent/10"
    }`
          }
        >
          <FiUsers className="text-xl" />
          Users
        </NavLink>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden">
        <div className="h-full w-full max-w-full max-h-full overflow-y-scroll">
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="add-product" element={<AdminAddNewProduct />} />
            <Route path="update-product" element={<AdminUpdateProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
