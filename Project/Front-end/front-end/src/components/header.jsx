import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header className="w-full bg-accent h-[100px] text-white px-[40px]">
      <div className="w-full h-full flex relative">
        <img
          src="/public/logo2.png"
          className="hidden lg:flex h-full absolute w-[170px] left-0 object-cover"
        />
        <div className="lg:hidden w-full flex justify-center items-center relative">
          <MdMenu
            className="absolute left-0 text-3xl cursor-pointer"
            onClick={() => setIsSideBarOpen(true)}
          />
          <img
            src="/public/logo2.png"
            className="h-full  w-[170px]  object-cover"
          />
        </div>

        {isSideBarOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] z-100 text-secondary">
            <div className="w-[300px] bg-primary h-full flex flex-col">
              <div className="lg:hidden h-[100px] w-full bg-accent flex justify-center items-center relative">
                <MdMenu
                  className="absolute left-2 text-3xl cursor-pointer"
                  onClick={() => setIsSideBarOpen(false)}
                />
                <img
                  src="/public/logo2.png"
                  className="h-full  w-[170px]  object-cover"
                />
              </div>
              <a
                href="/"
                className="p-4 border-b border-secondary/10 cursor-pointer hover:bg-accent/20"
              >
                Home
              </a>
              <a
                href="/products"
                className="p-4 border-b border-secondary/10 cursor-pointer hover:bg-accent/20"
              >
                Products
              </a>
              <a
                href="/about"
                className="p-4 border-b border-secondary/10 cursor-pointer hover:bg-accent/20"
              >
                About
              </a>
              <a
                href="/contact"
                className="p-4 border-b border-secondary/10 cursor-pointer hover:bg-accent/20"
              >
                Contact
              </a>
              <div className="p-4 border-b border-secondary/10 cursor-pointer flex hover:bg-accent/20">
                Cart
                <a
                  href="/cart"
                  className="ml-2 flex justify-center items-center text-xl"
                >
                  <AiOutlineShoppingCart />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="hidden h-full lg:flex justify-center items-center w-full gap-[20px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link
          to="/cart"
          className="absolute  right-0 top-0 h-full hidden lg:flex items-center justify-center px-4 text-3xl"
        >
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </header>
  );
}
