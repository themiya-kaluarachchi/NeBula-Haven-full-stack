import React, { useState } from "react";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { FaChevronCircleDown, FaChevronCircleUp, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-8 py-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-secondary tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-secondary/60 mt-1">
              Review your selected products
            </p>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white/70 text-secondary text-sm font-medium border border-accent/10">
            {cart.length} items
          </span>
        </div>

        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full min-h-[145px] bg-white/75 border border-accent/10 rounded-[30px] shadow-sm px-5 py-4 flex items-center gap-6"
            >
              <div className="w-[110px] h-[110px] rounded-[22px] overflow-hidden bg-primary shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-[18px] sm:text-[20px] font-semibold text-secondary leading-snug">
                  {item.name}
                </h2>
                <p className="text-sm text-secondary/45 mt-2 tracking-wide">
                  SKU: {item.productID}
                </p>
              </div>

              <div className="shrink-0">
                <div className="flex items-center gap-4 bg-primary/45 border border-accent/10 rounded-full px-5 py-3 min-w-[130px] justify-center">
                  <FaChevronCircleDown
                    className="text-[18px] text-secondary/55 cursor-pointer hover:text-accent transition"
                    onClick={() => {
                      addToCart(item, -1);
                      setCart(loadCart());
                    }}
                  />
                  <span className="text-secondary font-semibold text-[28px] leading-none min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <FaChevronCircleUp
                    className="text-[18px] text-secondary/55 cursor-pointer hover:text-accent transition"
                    onClick={() => {
                      addToCart(item, 1);
                      setCart(loadCart());
                    }}
                  />
                </div>
              </div>

              <div className="w-[150px] shrink-0 flex flex-col items-end">
                {item.labelledPrice > item.price && (
                  <span className="text-sm text-secondary/35 line-through mb-1">
                    LKR {item.labelledPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[20px] sm:text-[22px] font-semibold text-accent leading-none">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>

              <div className="shrink-0 pl-2">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-secondary/25 hover:bg-red-50 hover:text-red-400 transition"
                  onClick={() => {
                    addToCart(item, -item.quantity);
                    setCart(loadCart());
                  }}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          );
        })}

        <div className="w-full bg-white/80 border border-accent/10 rounded-[30px] shadow-sm px-8 py-6 flex items-center justify-between">
          <span className="text-lg font-medium text-secondary">
            Total Amount
          </span>
          <span className="text-3xl font-semibold text-accent">
            LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}