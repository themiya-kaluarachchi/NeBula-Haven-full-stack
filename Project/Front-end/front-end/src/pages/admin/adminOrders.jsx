import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-3xl hover:text-accent"
      >
        <FiPlusCircle />
      </Link>

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
                <th className=" sticky top-0 z-10 p-4">Image</th>
                <th className=" sticky top-0 z-10 p-4">Product ID</th>
                <th className=" sticky top-0 z-10 p-4">Product Name</th>
                <th className=" sticky top-0 z-10 p-4">Price</th>
                <th className=" sticky top-0 z-10 p-4">Labelled Price</th>
                <th className=" sticky top-0 z-10 p-4">Stock</th>
                <th className=" sticky top-0 z-10 p-4">Category</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((item) => {
                return (
                  <tr
                    key={item.productID}
                    className="border-b border-gray-200 hover:bg-primary/40 transition"
                  >
                    <td className="p-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>

                    <td className="p-4 font-medium">{item.productID}</td>

                    <td className="p-4">{item.name}</td>

                    <td className="p-4 font-semibold text-secondary">
                      Rs. {item.price}
                    </td>

                    <td className="p-4 text-gray-500 line-through">
                      Rs. {item.labelledPrice}
                    </td>

                    <td className="p-4 text-gray-500">{item.stock}</td>

                    <td className="p-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
                        {item.category}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
