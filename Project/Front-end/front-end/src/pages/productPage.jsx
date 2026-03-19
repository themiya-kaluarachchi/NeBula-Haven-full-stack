import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";

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
        <div className="w-full h-[calc(100vh-100px)]">
            {
                isLoading ? <Loader />
                :
                <div className="w-full h-full flex">
                    {
                        products.map((item) => {
                            return (
                                <div>
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );

}