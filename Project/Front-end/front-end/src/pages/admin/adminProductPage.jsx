import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-primary">
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-3xl hover:text-accent"
      >
        <FiPlusCircle />
      </Link>

      {/* Card container */}
      <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Table */}
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
              <th className=" sticky top-0 z-10 p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((item) => {
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

                  <td className="p-4 text-gray-500">
                     {item.stock}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-5 text-lg">
                      <button className="p-2 rounded-lg hover:bg-red-100 transition">
                        <IoTrashOutline 
                            className="text-gray-600 hover:text-red-600" 
                        />
                      </button>

                      <button className="p-2 rounded-lg hover:bg-accent/10 transition">
                        <BiSolidEdit 
                            className="text-gray-600 hover:text-accent" 
                            onClick={() =>{
                                navigate("/admin/update-product", {
                                    state : item
                                })
                            }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
