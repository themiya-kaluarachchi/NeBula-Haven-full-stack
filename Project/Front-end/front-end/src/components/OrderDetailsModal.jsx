import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircle } from "react-icons/io5";

export default function OrderDetailsModal({
  closeModel,
  selectedOrder,
  refresh,
  isModelOpen,
}) {
  const [currentStatus, setCurrentStatus] = useState(null);

  if (!isModelOpen || !selectedOrder) return null;

  const displayStatus =
    currentStatus ?? selectedOrder.status?.toLowerCase() ?? "pending";

  function getStatusClasses(status) {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-accent/10 text-accent";
    }
  }

  function formatStatus(status) {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={closeModel}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-white rounded-3xl shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModel}
          className="absolute top-4 right-4 text-red-300 hover:text-red-400 transition"
        >
          <IoCloseCircle size={32} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-secondary tracking-tight">
            Order Details
          </h2>
          <p className="text-sm text-secondary/60 mt-1">
            View complete information about the selected order.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Order ID</p>
            <p className="text-base font-semibold text-secondary">
              {selectedOrder.orderID}
            </p>
          </div>

          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-2">Current Status</p>
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${getStatusClasses(
                displayStatus,
              )}`}
            >
              {formatStatus(displayStatus)}
            </span>
          </div>

          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Customer Name</p>
            <p className="text-base font-medium text-secondary">
              {selectedOrder.customerName}
            </p>
          </div>

          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Email</p>
            <p className="text-base font-medium text-secondary break-all">
              {selectedOrder.email}
            </p>
          </div>

          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Phone</p>
            <p className="text-base font-medium text-secondary">
              {selectedOrder.phone}
            </p>
          </div>

          <div className="bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Date</p>
            <p className="text-base font-medium text-secondary">
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
          </div>

          <div className="sm:col-span-2 bg-primary/40 rounded-2xl p-4 border border-accent/10">
            <p className="text-xs text-secondary/60 mb-1">Address</p>
            <p className="text-base font-medium text-secondary">
              {selectedOrder.address}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-secondary">
                Ordered Items
              </h3>
              <p className="text-sm text-secondary/60 mt-1">
                {selectedOrder.items.length} item(s) in this order
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-primary/30 border border-accent/10 rounded-2xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-accent/10"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-secondary truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-secondary/60 mt-1">
                    Product ID: {item.productID}
                  </p>
                  <p className="text-sm text-secondary/60">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm text-secondary/60">
                    LKR {item.price.toFixed(2)} each
                  </p>
                  <p className="text-lg font-semibold text-accent mt-1">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-primary/40 rounded-2xl p-4 border border-accent/10">
          <p className="text-sm text-secondary/60 mb-2">Update Order Status</p>

          <select
            value={displayStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-accent/20 text-secondary font-medium focus:outline-none focus:ring-2 focus:ring-accent/40 hover:border-accent/40 transition-all duration-200"
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="border-t border-accent/10 pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-secondary/60">Total Amount</p>
            <p className="text-3xl font-bold text-accent">
              LKR {selectedOrder.total.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              axios
                .put(
                  `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                  { status: displayStatus },
                  { headers: { Authorization: `Bearer ${token}` } },
                )
                .then(() => {
                  toast.success("Order status updated successfully");
                  refresh();
                  closeModel();
                })
                .catch((error) => {
                  console.error(error);
                  toast.error("Failed to update order status");
                });
            }}
            disabled={displayStatus === selectedOrder.status?.toLowerCase()}
            className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
