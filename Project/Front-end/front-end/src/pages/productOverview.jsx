import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";

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
  }, [params.id]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] text-secondary bg-primary/20 py-10 px-4 md:px-10">
      {status === "loading" && (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader />
          <p className="text-secondary/50 font-light tracking-widest uppercase text-sm animate-pulse">
            Loading details...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <h1 className="text-xl font-light text-red-500 bg-red-50 px-6 py-4 rounded-xl border border-red-100">
            Failed to load product details. Please try again later.
          </h1>
        </div>
      )}

      {status === "success" && product && (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Side: Image Slider */}
          <div className="w-full lg:w-1/2 flex items-start justify-center pt-4">
            <ImageSlider images={product.images} />
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 pb-12">
            {/* Meta data (Category & ID) */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-secondary/40 font-mono tracking-wider">
                SKU: {product.productID}
              </span>
            </div>

            {/* Title & Alt Names */}
            <h1 className="text-4xl md:text-5xl font-light text-secondary leading-tight mb-2">
              {product.name}
            </h1>

            {product.altNames && product.altNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.altNames.map((alt, index) => (
                  <span
                    key={index}
                    className="text-sm text-secondary/50 font-light italic"
                  >
                    {index > 0 ? `| ${alt}` : alt}
                  </span>
                ))}
              </div>
            )}

            {/* Pricing Block */}
            <div className="my-6 p-6 bg-white rounded-2xl shadow-sm border border-secondary/5">
              {product.labelledPrice > product.price ? (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-baseline">
                    <p className="text-3xl text-accent font-medium">
                      LKR {product.price.toFixed(2)}
                    </p>
                    <p className="text-lg text-secondary/40 line-through font-light">
                      LKR {product.labelledPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-green-600 tracking-wide uppercase">
                    You Save LKR{" "}
                    {(product.labelledPrice - product.price).toFixed(2)}!
                  </p>
                </div>
              ) : (
                <p className="text-3xl text-accent font-medium">
                  LKR {product.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-2 mb-10 text-secondary/80 leading-relaxed font-light text-justify">
              {product.description}
            </div>

            {/* Action Buttons (Pushed to bottom naturally) */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                className="flex-1 bg-accent text-white px-8 py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-accent/30 hover:bg-[#4a6352] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart");
                }}
              >
                Add to Cart
              </button>
              <Link
                to="/checkout"
                state={[
                  {
                    image: product.images[0],
                    productID: product.productID,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    quantity: 1,
                  },
                ]}
                className="flex-1 text-center bg-white border-2 border-accent text-accent px-8 py-4 rounded-xl font-medium tracking-wide hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
