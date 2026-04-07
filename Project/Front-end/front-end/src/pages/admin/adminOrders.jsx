import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import OrderDetailsModal from "../../components/OrderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary">
        <OrderDetailsModal
        closeModel={() => setIsModelOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => setIsLoading(true)}
        isModelOpen={isModelOpen}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-secondary tracking-tight">
            Order Management
          </h1>
          <p className="text-sm text-secondary/60 mt-1">
            Manage all orders, update status, and track shipments.
          </p>
        </div>

        {/* PRODUCT COUNT */}
        <span className="px-4 py-1.5 rounded-full bg-white/80 text-secondary text-sm font-medium border border-accent/10 shadow-sm">
          {orders.length} Orders
        </span>
      </div>

      {/* Card container */}
      <div className="w-full bg-primary rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Table */}
        {isLoading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-sm text-secondary">
            {/* Table Head */}
            <thead className="bg-accent text-white">
              <tr className="text-left">
                <th className=" sticky top-0 z-10 p-4">Order ID</th>
                <th className=" sticky top-0 z-10 p-4">Number of Items</th>
                <th className=" sticky top-0 z-10 p-4">Customer Name</th>
                <th className=" sticky top-0 z-10 p-4">Email</th>
                <th className=" sticky top-0 z-10 p-4">Phone</th>
                <th className=" sticky top-0 z-10 p-4">Address</th>
                <th className=" sticky top-0 z-10 p-4">Total</th>
                <th className=" sticky top-0 z-10 p-4">Status</th>
                <th className=" sticky top-0 z-10 p-4">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((item) => {
                return (
                  <tr
                    key={item.orderID}
                    className="border-b border-gray-200 hover:bg-secondary/10 transition hover:cursor-pointer"
                    onClick={
                        () => {
                            setSelectedOrder(item);
                            setIsModelOpen(true);
                        }
                    }
                  >

                    <td className="p-4 font-medium">
                        {item.orderID}
                    </td>

                    <td className="p-4 font-medium">
                        {item.items.length}
                    </td>

                    <td className="p-4 font-semibold text-secondary">
                      {item.customerName}
                    </td>

                    <td className="p-4 font-medium">
                      {item.email}
                    </td>

                    <td className="p-4 text-gray-500">
                        {item.phone}
                    </td>

                    <td className="p-4 font-medium">
                      {item.address}
                    </td>

                    <td className="p-4 font-semibold text-secondary">
                      LKR {item.total.toFixed(2)}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                    <td
                        className="px-4 py-12 text-center text-secondary/60"
                        colSpan={9}
                    >
                        No Orders to display
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
