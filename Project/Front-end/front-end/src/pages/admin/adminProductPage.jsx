import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidEdit } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { IoCloseCircle, IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

function ProductDeleteConfirm(props) {
  const productId = props.productID;
  const close = props.close;
  const refresh = props.refresh;

  function deleteProduct() {
    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("Product deleted successfully!");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to delete product.");
      });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex items-center justify-center">
      <div className="w-[500px] h-[200px] bg-primary relative flex flex-col items-center justify-center gap-[40px]">
        <button
          onClick={close}
          className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 hover:bg-red-700 text-white flex justify-center items-center rounded-full font-bold transition-colors"
        >
          <IoCloseCircle size={24} />
        </button>
        <p className="text-xl font-semibold">
          Are you sure you want to delete product {productId}?
        </p>
        <div className="flex gap-[40px]">
          <button
            onClick={close}
            className="w-[100px] bg-accent p-[5px] text-white hover:bg-red-400"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="w-[100px] bg-accent p-[5px] text-white hover:bg-blue-400"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
        axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary">
      {
        isDeleteConfirmVisible && (
            <ProductDeleteConfirm
                refresh={() => {setIsLoading(true)}}
                productID={productToDelete}
                close={() => {
                setIsDeleteConfirmVisible(false);
                }}
            />
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-3xl hover:text-accent"
      >
        <FiPlusCircle />
      </Link>

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

                    <td className="p-4 text-gray-500">{item.stock}</td>

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
                            onClick={() => {
                              setProductToDelete(item.productID);
                              setIsDeleteConfirmVisible(true);
                            }}
                          />
                        </button>

                        <button className="p-2 rounded-lg hover:bg-accent/10 transition">
                          <BiSolidEdit
                            className="text-gray-600 hover:text-accent"
                            onClick={() => {
                              navigate("/admin/update-product", {
                                state: item,
                              });
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
        )}
      </div>
    </div>
  );
}
