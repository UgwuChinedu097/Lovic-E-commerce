import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white pt-16">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-xl font-semibold mb-3">Lumina Jewels</h4>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Discover handcrafted jewelry for every occasion. Explore elegance,
            simplicity, and charm in every piece we sell.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-amber-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-amber-500">
              <FaWhatsapp />
            </a>
            <a href="#" className="hover:text-amber-500">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-lg font-bold mb-3">Shop</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/categories" className="hover:text-amber-600">All Jewelry</Link></li>
            <li><Link to="/category/necklace" className="hover:text-amber-600">Necklaces</Link></li>
            <li><Link to="/category/ring" className="hover:text-amber-600">Rings</Link></li>
            <li><Link to="/category/earrings" className="hover:text-amber-600">Earrings</Link></li>
            <li><Link to="/category/bracelet" className="hover:text-amber-600">Bracelets</Link></li>
            <li><Link to="/category/sets" className="hover:text-amber-600">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold mb-3">About</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/our-story" className="hover:text-amber-600">Our Story</Link></li>
            <li><Link to="/contact-us" className="hover:text-amber-600">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-amber-600">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold mb-3">Customer Care</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/privacy-policy" className="hover:text-amber-600">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-amber-600">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-12 pb-6 px-4 sm:px-6 lg:px-8">
        © 2025 Lumina Jewels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
