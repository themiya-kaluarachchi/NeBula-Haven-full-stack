import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product details.");
        setStatus("error");
      });
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] text-secondary">
      {status == "loading" && (
        <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {status == "success" && (
        <div className="w-full h-full flex">
            <div className="w-[50%] h-full flex items-center justify-center">
                <ImageSlider images={product.images}/>
            </div>
            <div className="w-[50%] h-full bg-red-200">

            </div>
        </div>
      )}
      {status == "error" && (
        <h1 className="text-red-500">Failed to load product details</h1>
      )}
    </div>
  );
}
