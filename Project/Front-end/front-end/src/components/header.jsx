import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-accent h-[100px] text-white px-[40px]">
        
        <div className="w-full h-full flex relative">
            <img src="/public/logo2.png" className="h-full absolute w-[170px] left-0 object-cover" />
            <div className="h-full flex justify-center items-center w-full gap-[20px] text-lg">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <Link to="/cart" className="absolute right-0 top-0 h-full flex items-center justify-center px-4 text-3xl">
                <AiOutlineShoppingCart />
            </Link>
        </div>
    </header>
  )
}
