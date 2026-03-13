import axios from "axios";
import { useState } from "react";


export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

    axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
      (response) => {
        setProducts(response.data);
      }
    );

  return (
    <div className="w-full h-full p-[10px]">
      <table className="border w-full text-center">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Labelled Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.productID}>
                <td>
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded py-[5px]" />
                </td>
                <td>{item.productID}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.labelledPrice}</td>
                <td>{item.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
