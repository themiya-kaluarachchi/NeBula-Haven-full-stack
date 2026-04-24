import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaTrash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const [cart, setCart] = useState(location.state);

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You need to be logged in to place an order.");
      navigate("/login");
      return;
    }
    try {
      const items = [];
      for (let i = 0; i < cart.length; i++) {
        items.push({
          productID: cart[i].productID,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,
          customerName: name==""?null:name,
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary tracking-tight">
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

        {/* Items */}
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full bg-white/75 border border-accent/10 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5"
            >
              {/* Image */}
              <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-xl overflow-hidden bg-primary shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-[16px] sm:text-[18px] font-semibold text-secondary">
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm text-secondary/45 mt-1">
                  SKU: {item.productID}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 bg-primary/45 border border-accent/10 rounded-full px-4 py-2">
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
                <span className="text-secondary font-semibold text-xl min-w-[20px] text-center">
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

              {/* Price */}
              <div className="flex flex-col items-center lg:items-end">
                {item.labelledPrice > item.price && (
                  <span className="text-xs sm:text-sm text-secondary line-through">
                    LKR {item.labelledPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg sm:text-xl font-semibold text-accent">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>

              {/* Delete */}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full text-secondary/30 hover:bg-red-50 hover:text-red-400 transition"
                onClick={() => {}}
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          );
        })}

        <div className="w-full bg-white/85 border border-accent/10 rounded-2xl shadow-md p-5 sm:p-6">
          
           <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <label
              htmlFor="name"
              className="text-sm text-secondary whitespace-nowrap sm:w-[180px]"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 h-[45px] border border-secondary/40 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label
              htmlFor="address"
              className="text-sm text-secondary whitespace-nowrap sm:w-[180px]"
            >
              Shipping Address
            </label>

            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 h-[45px] border border-secondary/40 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Total Section */}
        <div className="w-full bg-white/85 border border-accent/10 rounded-2xl shadow-md p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Total */}
          <div className="text-center sm:text-left">
            <span className="text-sm text-secondary/60">Total Amount</span>
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              LKR {getTotal().toFixed(2)}
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-semibold rounded-full shadow-lg hover:bg-accent/90 hover:scale-[1.05] active:scale-95 transition-all duration-200 text-center"
            onClick={purchaseCart}
          >
            Place Order →
          </button>
        </div>
      </div>
    </div>
  );
}
