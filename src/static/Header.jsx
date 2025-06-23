import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuSearch,
  LuUser,
  LuShoppingCart,
  LuMenu,
  LuX,
} from "react-icons/lu";
import CTAButton from "../ui/CTAButton";
import { useGetUserCartQuery } from "../service/CartApi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isShopVisible, setIsShopVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: cartItems } = useGetUserCartQuery();
  const Nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "necklace",
    "ring",
    "bangle",
    "watches",
    "cufflinks",
    "sets",
    "bracelet",
  ];

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term !== "") {
      Nav(`/search/${encodeURIComponent(term)}`);
      setIsSearchVisible(false);
      setSearchTerm("");
    }
  };

  const cartQty =
    cartItems?.cart?.items?.reduce((acc, item) => acc + item.qty, 0) ?? 0;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white flex flex-col items-center z-[1000] shadow-lg transform transition-transform duration-300 ${
          isShowed ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between py-6 border-b border-neutral-300 w-[80%]">
          <h2 className="text-lg font-bold">Lumina Jewel</h2>
          <LuX className="cursor-pointer" onClick={() => setIsShowed(false)} />
        </div>

        <div className="flex flex-col gap-4 py-8 w-[80%]">
          <span
            className="hover:text-amber-600 cursor-pointer"
            onClick={() => {
              Nav("/");
              setIsShowed(false);
            }}
          >
            Home
          </span>

          <div>
            <span
              className="hover:text-amber-600 cursor-pointer flex justify-between items-center"
              onClick={() => setIsShopVisible(!isShopVisible)}
            >
              Shop
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  isShopVisible ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
            {isShopVisible && (
              <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                {categories.map((item, index) => (
                  <span
                    key={index}
                    className="hover:text-amber-600 cursor-pointer"
                    onClick={() => {
                      Nav(`/category/${item.toLowerCase()}`);
                      setIsShowed(false);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-auto mb-5 pt-4 border-t border-neutral-300 w-[80%]">
          <span className="hover:text-amber-600 cursor-pointer">Login</span>
          <span className="hover:text-amber-600 cursor-pointer">
            Create Account
          </span>
        </div>
      </div>

      <header
        className={`py-5 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Menu */}
          <div className="flex items-center">
            <LuMenu
              className="lg:hidden mr-4 cursor-pointer"
              onClick={() => setIsShowed(true)}
            />
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => Nav("/")}
            >
              Lumina Jewel
            </h1>
          </div>


          <div className="hidden lg:flex items-center space-x-8 text-[16px] font-medium relative">
            <nav
              className="hover:text-amber-600 cursor-pointer"
              onClick={() => Nav("/")}
            >
              Home
            </nav>
            <div
              className="relative group"
              onMouseEnter={() => setIsShopVisible(true)}
              onMouseLeave={() => setIsShopVisible(false)}
            >
              <nav className="hover:text-amber-600 cursor-pointer">Shop</nav>
              <div
                className={`absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 transition-all duration-300 ${
                  isShopVisible ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {categories.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => Nav(`/category/${item.toLowerCase()}`)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[20px] font-bold">
            <LuSearch
              className="hover:text-amber-600 cursor-pointer"
              onClick={() => setIsSearchVisible(true)}
            />
            <LuUser
              className="hover:text-amber-600 cursor-pointer"
              onClick={() => Nav("/signin")}
            />
            <div
              className="relative cursor-pointer"
              onClick={() => Nav("/cartpage")}
            >
              <LuShoppingCart className="hover:text-amber-600" />
              {cartQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full">
                  {cartQty}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 right-0 h-40 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isSearchVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-center h-full gap-4 px-4 sm:px-6">
          <input
            type="text"
            placeholder="Search for jewelry..."
            className="w-full max-w-md border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CTAButton
            text="Search"
            className="bg-amber-600 p-2 px-5 rounded-md"
            onClick={handleSearch}
          />
          <LuX
            className="cursor-pointer text-xl hover:bg-neutral-200 rounded-full p-1"
            onClick={() => setIsSearchVisible(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
