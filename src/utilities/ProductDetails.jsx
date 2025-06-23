import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGetOneProductQuery } from "../service/UserApi";
import { useAddToCartMutation } from "../service/CartApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../static/Header";
import Footer from "../static/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOneProductQuery(id);
  const product = data?.product || data || {};
  const images = Array.isArray(product.image) ? product.image : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(images.length > 0 ? 0 : null);

  useEffect(() => {
    if (images.length > 0 && selectedImageIndex === null) {
      setSelectedImageIndex(0);
    }
  }, [images, selectedImageIndex]);

  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state) => state.user.token);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    let toastId;
    if (isLoading) toastId = toast.loading("Loading product...");
    if (!isLoading && toastId) toast.dismiss(toastId);
    if (isError) toast.error("Failed to load product.");
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isLoading, isError]);

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    if (product.stock && quantity > product.stock) {
      toast.error("Requested quantity exceeds stock.");
      return;
    }

    try {
      await addToCart({ productId: product._id, qty: quantity }).unwrap();
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  if (isLoading) return <p className="p-8 text-center text-gray-600">Loading product...</p>;
  if (isError || !product._id)
    return <p className="p-8 text-center text-red-500">Failed to load product.</p>;

  const descriptionBullets = product.description
    ? product.description
        .split(/[\r\n]+|\. /)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Please Sign In</h2>
            <p className="mb-4">You need to sign in to add products to your cart.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                onClick={() => (window.location.href = "/signin")}
              >
                Go to Sign In
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowLoginPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 grid gap-10 grid-cols-1 lg:grid-cols-2">
          
          <div>
            <div className="flex justify-center items-center h-[400px] md:h-[500px] rounded-lg bg-gray-100 mb-4 overflow-hidden">
              {selectedImageIndex !== null ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-400">No image available</p>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {images.length === 0 ? (
                <p>No images available</p>
              ) : (
                images.map((url, i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 flex-shrink-0 border rounded-md cursor-pointer overflow-hidden ${
                      selectedImageIndex === i
                        ? "border-orange-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImageIndex(i)}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold mb-2">
              ₦{typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
            </p>

            <p
              className={`mb-4 font-medium ${
                product.stock === 0 ? "text-red-500" : "text-gray-700"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>

            {/* Quantity Controls */}
            <div className="mb-6">
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 border rounded flex items-center justify-center"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 border rounded flex items-center justify-center"
                  onClick={() =>
                    setQuantity((q) =>
                      product.stock ? Math.min(product.stock, q + 1) : q + 1
                    )
                  }
                  disabled={product.stock && quantity >= product.stock}
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-4">
              <p className="font-medium mb-1">Total Amount</p>
              <p className="text-lg font-semibold text-orange-600">
                ₦
                {product.price && quantity
                  ? (product.price * quantity).toFixed(2)
                  : "N/A"}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className={`bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
                  isAdding || product.stock === 0 ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
              >
                {isAdding ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>

            {/* Description */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              {descriptionBullets.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 text-sm whitespace-pre-line">
                  {descriptionBullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-sm">No description available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default ProductDetail;
