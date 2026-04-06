import React, { useState } from "react";
import {
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaTrash,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();

  const [cart, setCart] = useState(location.state);

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-8 py-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-secondary tracking-tight">
              Checkout
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
                      const newCart = [...cart];
                      if (newCart[index].quantity > 1) {
                        newCart[index].quantity -= 1;
                      }

                      setCart(newCart);
                    }}
                  />
                  <span className="text-secondary font-semibold text-[28px] leading-none min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <FaChevronCircleUp
                    className="text-[18px] text-secondary/55 cursor-pointer hover:text-accent transition"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
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
                  onClick={() => {}}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          );
        })}

        <div className="w-full bg-white/85 backdrop-blur-sm border border-accent/10 rounded-[30px] shadow-md px-8 py-6 flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-secondary/60 tracking-wide">
              Total Amount
            </span>
            <span className="text-3xl font-bold text-accent leading-tight">
              LKR {getTotal().toFixed(2)}
            </span>
          </div>

          {/* RIGHT SIDE CTA */}
          <button
            className="px-10 py-3 bg-accent text-white font-semibold rounded-full shadow-lg  hover:bg-accent/90 hover:scale-[1.05] active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            Place Order →
          </button>
        </div>
      </div>
    </div>
  );
}
