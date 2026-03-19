import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export function ProductPage() {

    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error) => {
                console.error("Failed to fetch products:", error);
                setIsLoading(false);
                toast.error("Failed to load products.")
            });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary py-12 px-4">

            <div className="max-w-7xl mx-auto mb-12 text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-light text-secondary tracking-wide mb-4">
                    Shop Our Collection
                </h1>
                <p className="text-secondary/70 max-w-2xl text-base font-light leading-relaxed">
                    Discover our premium, thoughtfully sourced cosmetics designed to nourish, protect, and bring out your natural glow.
                </p>
                {/* Subtle decorative line */}
                <div className="w-24 h-px bg-accent/40 mt-8"></div>
            </div>

            {
                isLoading ? <Loader />
                :
                <div className="w-full h-full flex flex-row flex-wrap justify-center">
                    {
                        products.map((item) => {
                            return (
                                <ProductCard key={item.productID} product={item} />
                            )
                        })
                    }
                </div>
            }
        </div>
    );

}