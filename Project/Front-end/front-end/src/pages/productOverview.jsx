import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function ProductOverview() {
    const params = useParams();
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_API_URL + "/api/products/"+params.id).then(
                (res) => {
                    setProduct(res.data);
                    setStatus("success");
                }
            ).catch(
                () => {
                    toast.error("Failed to fetch product details.");
                    setStatus("error");
                }
            )
        }
    ,[])
    

  return (
    <div className="w-full h-screen flex items-center justify-center">
        {
            status == "loading" && <Loader/>
        }
        {
            status == "success" && (
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <img className="w-[300px] h-[300px] object-cover" src={product.images[0]} alt="" />
                    <p className="text-lg">{product.description}</p>
                    <p className="text-xl font-semibold text-accent">Price: LKR{product.price.toFixed(2)}</p>
                    <p className="text-lg">Stock: {product.stock}</p>
                </div>
            )
                
        }
        {
            status == "error" && <h1 className="text-red-500">Failed to load product details</h1>
        }
    </div>
  )
}
