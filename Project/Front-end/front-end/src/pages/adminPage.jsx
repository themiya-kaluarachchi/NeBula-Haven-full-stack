import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2">
      <div className="w-[300px] h-full bg-primary flex flex-col">
        <div className="flex flex-row w-[95%] h-[100px] bg-accent items-center rounded-2xl">
          <img src="/logo2.png" alt="Nebula Haven" className="h-[70px]" />
          <span className="text-white text-xl ml-4">Admin Panel</span>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[2px] border-accent rounded-[20px] overflow-hidden">
        <div>
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<h1>Products</h1>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
          </Routes> 
        </div>
      </div>
    </div>
  );
}
