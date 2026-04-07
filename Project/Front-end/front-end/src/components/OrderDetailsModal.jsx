import React from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function OrderDetailsModal({
  closeModel,
  selectedOrder,
  refresh,
  isModelOpen,
}) {
  if (!isModelOpen || !selectedOrder) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={closeModel}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModel}
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
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
            <p className="text-xs text-secondary/60 mb-1">Status</p>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
              {selectedOrder.status}
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
              <h3 className="text-xl font-semibold text-secondary">Ordered Items</h3>
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

        <div className="border-t border-accent/10 pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-secondary/60">Total Amount</p>
            <p className="text-3xl font-bold text-accent">
              LKR {selectedOrder.total.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => {
              if (refresh) refresh();
              closeModel();
            }}
            className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}