import { useEffect } from "react";
import CTAButton from "../ui/CTAButton";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../service/ProductApi";
import { useAddToCartMutation } from "../service/CartApi";
import { toast } from "react-toastify";

const ProductCard = () => {
  const Nav = useNavigate();
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [addToCart] = useAddToCartMutation();

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

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product._id, qty: 1 }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) return null;

  if (isError || !data || !data.allProduct) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load products.</p>
    );
  }

  return (
    <section className="py-16 bg-neutral-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1500px]">
        <h2 className="text-[30px] font-bold text-black text-center">
          Featured Pieces
        </h2>
        <p className="text-[16px] text-gray-600 text-center mt-1 mb-10">
          Our most coveted designs, crafted with precision and care for the
          discerning collector.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6">
          {data.allProduct.slice(0, 8).map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product._id}
                className="relative bg-white shadow-md rounded-2xl overflow-hidden w-full hover:shadow-lg transition-shadow duration-300"
                onClick={() => Nav(`/productdetails/${product._id}`)}
              >
                {isOutOfStock && (
                  <div className="absolute top-3 -left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-r-xl shadow-md z-10">
                    Out of Stock
                  </div>
                )}

                <img
                  src={product.image?.[0] || "https://via.placeholder.com/300"}
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
        </div>

        {/* 🔽 View More Button */}
        {data.allProduct.length > 8 && (
          <div className="text-center mt-12">
            <CTAButton
              text="View More Products"
              className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-md text-sm sm:text-base"
              onClick={() => Nav("/products")}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
