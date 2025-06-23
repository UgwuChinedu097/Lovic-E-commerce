import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CTAButton from "../ui/CTAButton";
import Header from "../static/Header";
import { useAddToCartMutation } from "../service/CartApi";
import {
  useGetProductsByCategoryQuery,
  useGetAllProductsQuery,
} from "../service/ProductApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation();
  const [viewAll, setViewAll] = useState(false);
  const [priceFilter, setPriceFilter] = useState(null);

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetProductsByCategoryQuery(categoryName);

  const {
    data: allProductsData,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetAllProductsQuery(undefined, { skip: !viewAll });

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product._id, qty: 1 }).unwrap();
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const products = useMemo(() => {
    const baseData = viewAll ? allProductsData?.allProduct : categoryData?.product;
    if (!baseData) return [];

    if (priceFilter) {
      return baseData.filter((p) => p.price <= priceFilter);
    }
    return baseData;
  }, [viewAll, allProductsData, categoryData, priceFilter]);

  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  const isLoading = viewAll ? isAllLoading : isCategoryLoading;
  const isError = viewAll ? isAllError : isCategoryError;

  useEffect(() => {
    let toastId;
    if (isLoading) {
      toastId = toast.loading("Loading products...");
    } else {
      toast.dismiss(toastId);
    }

    if (isError) {
      toast.error("Failed to load products");
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isLoading, isError]);

  return (
    <>
      <Header />
      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-[30px] font-bold text-black capitalize">
                {viewAll ? "All Products" : `${displayName}`}
              </h2>
              <p className="text-[16px] text-gray-600">
                Explore our finest selection of {viewAll ? "all products" : displayName}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select
                className="p-2 border border-gray-300 rounded-md w-60"
                value={priceFilter || ""}
                onChange={(e) =>
                  setPriceFilter(e.target.value ? parseInt(e.target.value) : null)
                }
              >
                <option value="">Filter by Price</option>
                <option value="10000">Below ₦10,000</option>
                <option value="50000">Below ₦50,000</option>
                <option value="100000">Below ₦100,000</option>
                <option value="500000">Below ₦500,000</option>
              </select>

              <button
                className="text-amber-600 underline hover:opacity-80 whitespace-nowrap"
                onClick={() => setViewAll((prev) => !prev)}
              >
                {viewAll ? "View by Category" : "View All Products"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isOutOfStock = product.stock <= 0;
              const productImage =
                Array.isArray(product.image)
                  ? product.image[0]
                  : typeof product.image === "string"
                  ? product.image.split(",")[0]
                  : "https://via.placeholder.com/300";

              return (
                <div
                  key={product._id}
                  className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-base font-bold text-black">
                        ₦{product.price}
                      </span>
                      <CTAButton
                        className={`px-4 py-1 rounded-full text-sm flex items-center gap-2 ${
                          isOutOfStock
                            ? "bg-gray-300 text-gray-500"
                            : "bg-amber-600 text-white"
                        }`}
                        text={<FiShoppingCart className="text-base" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isOutOfStock) handleAddToCart(product);
                        }}
                        disabled={isOutOfStock}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {products.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CategoryPage;
