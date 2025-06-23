import { useState, useEffect } from "react";
import {
  Trash2,
  ChevronLeft,
  Minus,
  Plus
} from "lucide-react";
import CTAButton from "../ui/CTAButton";
import Header from "../static/Header";
import {
  useGetUserCartQuery,
  useRemoveFromCartMutation,
  useAddOrderMutation,
} from "../service/CartApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addNotification } from "../service/NotificationSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../static/Footer";

export default function CartPage() {
  const { data: cartItems = {}, isLoading, isError, refetch } = useGetUserCartQuery();
  const [removeFromCart, { isLoading: removing }] = useRemoveFromCartMutation();
  const [addOrder, { isLoading: ordering }] = useAddOrderMutation();
  const [localCart, setLocalCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems?.cart?.items?.length) {
      const formatted = cartItems.cart.items.map(item => {
        const images =
          typeof item.product.image === "string"
            ? item.product.image.split(",")
            : Array.isArray(item.product.image)
            ? item.product.image
            : ["/placeholder.svg"];
        return {
          _id: item.product._id,
          name: item.product.name,
          images,
          price: item.product.price,
          quantity: item.qty,
          options: item.product.options || {}
        };
      });

      setLocalCart(prev => {
        const prevStr = JSON.stringify(prev);
        const newStr = JSON.stringify(formatted);
        return prevStr !== newStr ? formatted : prev;
      });
    } else {
      setLocalCart([]);
    }
  }, [JSON.stringify(cartItems?.cart?.items)]);

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setLocalCart(prev =>
      prev.map(item => (item._id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart({ productId: id }).unwrap();
      toast.success("Removed item from cart");
      refetch();
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    const items = localCart.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      options: item.options,
    }));
    try {
      await addOrder({ items }).unwrap();
      toast.success("Order placed successfully!");
      dispatch(addNotification("New order received"));
      refetch();
    } catch {
      toast.error("Failed to place order");
    }
  };

  const subtotal = localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (isLoading) return <div className="text-center py-20">Loading cart...</div>;
  if (isError) return <div className="text-center py-20 text-red-600">Failed to load cart items.</div>;

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />
      <div className="bg-white min-h-screen">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-serif font-bold mb-8 text-center">Your Shopping Cart</h1>

          {localCart.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-neutral-600 mb-8">Looks like you haven't added anything yet.</p>
              <a href="/">
                <CTAButton className="bg-amber-600 text-white hover:bg-amber-700 p-3 rounded-[6px]" text="Continue Shopping" onClick={() => navigate(-1)} />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {localCart.map(item => (
                  <div key={item._id} className="flex flex-col md:flex-row border-b pb-6 mb-6">
                    <div className="w-36 h-36 bg-neutral-50 rounded-md overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-between px-4">
                      <div>
                        <a href={`/productdetails/${item._id}`} className="font-medium hover:text-amber-600">
                          {item.name}
                        </a>
                        {Object.entries(item.options).map(([k, v]) => (
                          <div key={k} className="text-sm text-neutral-500">{k}: {v}</div>
                        ))}
                        <div className="text-sm mt-1 text-gray-600">Price: &#8358;{item.price.toFixed(2)}</div>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 border rounded hover:bg-gray-100">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 border rounded hover:bg-gray-100">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
                      <div className="font-medium text-lg">&#8358;{(item.price * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        disabled={removing}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 mt-2"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-8">
                  <CTAButton
                    onClick={() => navigate(-1)}
                    className="text-amber-600 hover:text-amber-800 p-5 flex items-center gap-2 font-medium"
                  >
                    <ChevronLeft className="h-4 w-4" /> Continue Shopping
                  </CTAButton>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className="space-y-3 text-sm border-t border-b py-4 mb-4">
                    <div className="flex justify-between"><span>Subtotal</span><span>&#8358;{subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>&#8358;{shipping.toFixed(2)}</span></div>
                  </div>
                  <div className="flex justify-between font-medium text-lg mb-6"><span>Total</span><span>&#8358;{total.toFixed(2)}</span></div>
                  <CTAButton
                    onClick={handleCheckout}
                    disabled={ordering}
                    className="w-full bg-amber-600 hover:bg-amber-700 py-4"
                    text={ordering ? "Placing Order..." : "Checkout"}
                  />
                  <div className="mt-4 text-center text-sm text-neutral-500">Amount calculated at checkout</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
