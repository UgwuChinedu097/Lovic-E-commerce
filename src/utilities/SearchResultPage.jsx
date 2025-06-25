import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import Header from "../static/Header";
import Footer from "../static/Footer";
import CTAButton from "../ui/CTAButton";
import { useGetAllProductsQuery } from "../service/ProductApi";
import { useAddToCartMutation } from "../service/CartApi";

const SearchResultsPage = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [addToCart] = useAddToCartMutation();

  const filteredProducts = useMemo(() => {
    if (!data?.allProduct || !keyword) return [];
    const term = decodeURIComponent(keyword.toLowerCase().trim());
    return data.allProduct.filter((prod) =>
      prod?.name?.toLowerCase().includes(term)
    );
  }, [data, keyword]);

  const handleAddToCart = async (product) => {
    if (!token) {
      toast.error("Please sign in to add to cart");
      return;
    }

    try {
      await addToCart({ productId: product._id, qty: 1 }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="p-6 text-center">Searching products…</div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="p-6 text-center text-red-500">
          Failed to fetch products.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <section className="py-16 bg-neutral-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1500px]">
          <h2 className="text-[30px] font-bold text-black text-center capitalize">
            Search Results for “{decodeURIComponent(keyword)}”
          </h2>
          <p className="text-[16px] text-gray-600 text-center mt-1 mb-10">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              const productImage = Array.isArray(product.image)
                ? product.image[0]
                : typeof product.image === "string"
                ? product.image.split(",")[0]
                : "/placeholder.png";

              return (
                <div
                  key={product._id}
                  className="relative bg-white shadow-md rounded-2xl overflow-hidden w-full hover:shadow-lg transition-shadow duration-300"
                  onClick={() => navigate(`/productdetails/${product._id}`)}
                >
                  {isOutOfStock && (
                    <div className="absolute top-3 -left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-r-xl shadow-md z-10">
                      Out of Stock
                    </div>
                  )}

                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-1 truncate">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-base font-bold text-black">
                        ₦{product.price}
                      </span>

                      <div
                        className={`relative group ${
                          isOutOfStock ? "cursor-not-allowed" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CTAButton
                          className={`px-4 py-1 rounded-full text-sm flex items-center gap-2 ${
                            isOutOfStock
                              ? "bg-gray-300 text-gray-500"
                              : "bg-amber-600 text-white"
                          }`}
                          text={<FiShoppingCart className="text-base" />}
                          onClick={() =>
                            !isOutOfStock && handleAddToCart(product)
                          }
                          disabled={isOutOfStock}
                        />
                        {isOutOfStock && (
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Out of stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
