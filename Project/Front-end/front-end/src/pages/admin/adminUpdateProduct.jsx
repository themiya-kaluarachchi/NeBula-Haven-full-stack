import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminUpdateProduct() {

    const location = useLocation();

    const [productId, setProductId] = useState(location.state?.productID || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altNames, setAltNames] = useState(location.state?.altNames?.join(",") || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(location.state?.price || 0);
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || 0);
    const [category, setCategory] = useState(location.state?.category || "cream");
    const [stock, setStock] = useState(location.state?.stock || 0);

    const navigate = useNavigate();

    async function updateProduct() {
         const token = localStorage.getItem("token");
         if(token == null) {
            navigate("/login");
            return
         }

         const promises = [];
         for(let i=0; i<images.length; i++) {
            promises[i] = mediaUpload(images[i])
         }
         try {
            let urls = await Promise.all(promises);

            if (urls.length == 0) {
                urls = location.state.images;
            }

            const alternativeNames = altNames.split(",")

            const product = {
                productID: productId,
                name: name,
                altNames: alternativeNames,
                description: description,
                images: urls,
                price: price,
                labelledPrice: labelledPrice,
                category: category,
                stock: stock
            }

            await axios.put(import.meta.env.VITE_API_URL+"/api/products/" + productId, product, {
                headers : {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product updated successfully!");
            navigate("/admin/products");
         } catch  {
            toast.error("Ann Error Occurred")
         }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-primary/20 p-6 md:p-12">
            
            {/* Form Container */}
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-secondary/10">
                
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-light text-secondary tracking-wide">Update Product</h2>
                    <p className="text-sm text-secondary/60 mt-2 font-light">
                        Enter the details for the updated cosmetic item below.
                    </p>
                </div>

                {/* Two-Column Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* Product Name (Full Width) */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Product Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Radiant Glow Serum" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Product ID */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Product ID</label>
                        <input 
                            disabled
                            type="text" 
                            placeholder="e.g. NH-001" 
                            value={productId} 
                            onChange={(e) => setProductId(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm cursor-pointer appearance-none"
                        >
                            <option value="cream">Cream</option>
                            <option value="lotion">Lotion</option>
                            <option value="serum">Serum</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Selling Price (Rs)</label>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Labelled Price */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Labelled Price (Rs - Original)</label>
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            value={labelledPrice} 
                            onChange={(e) => setLabelledPrice(parseFloat(e.target.value))} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Initial Stock</label>
                        <input 
                            type="number" 
                            placeholder="0" 
                            value={stock} 
                            onChange={(e) => setStock(parseInt(e.target.value))} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Alternative Names */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Alternative Names</label>
                        <input 
                            type="text" 
                            placeholder="Comma separated" 
                            value={altNames} 
                            onChange={(e) => setAltNames(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Description (Full Width) */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Description</label>
                        <input 
                            type="text" 
                            placeholder="Describe the product, ingredients, and benefits..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary placeholder-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                        />
                    </div>

                    {/* Images (Full Width) */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-secondary/80 ml-1">Product Images</label>
                        <input 
                            type="file" 
                            multiple 
                            onChange={(e) => setImages(e.target.files)} 
                            className="w-full px-4 py-3 rounded-xl bg-white border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-sm
                                       file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-secondary hover:file:bg-primary/80 file:transition-colors file:cursor-pointer"
                        />
                    </div>
                </div>

                {/* Submit Action Area */}
                <div className="mt-10 pt-8 border-t border-secondary/10 flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/admin/products")
                        }}
                        className="px-8 py-3.5 bg-red-400 text-white font-medium rounded-4xl shadow-lg hover:shadow-accent/40 hover:bg-[#f84a84] active:scale-[0.98] transition-all duration-300"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={updateProduct} 
                        className="px-8 py-3.5 bg-accent text-white font-medium rounded-4xl shadow-lg hover:shadow-accent/40 hover:bg-[#4a6352] active:scale-[0.98] transition-all duration-300"
                    >
                        Save Product
                    </button>
                </div>
                
            </div>
        </div>
    );
}