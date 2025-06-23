import { useEffect, useRef, useState } from "react";
import { useGetAllOrdersQuery } from "../service/CartApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearNotifications } from "../service/NotificationSlice";

const AdminOrderPage = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [openOrderIds, setOpenOrderIds] = useState([]);
  const prevOrderIdsRef = useRef([]);
  const dispatch = useDispatch();

  const orders = data?.allOrder || [];
  useEffect(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  useEffect(() => {
    const currentIds = orders.map((o) => o._id);
    const prevIds = prevOrderIdsRef.current;
    const newOrders = currentIds.filter((id) => !prevIds.includes(id));

    if (newOrders.length > 0) {
      toast.success("🛒 New order received!", { position: "top-right" });
    }

    prevOrderIdsRef.current = currentIds;
  }, [orders]);


  let filteredOrders = selectedDate
    ? orders.filter(
        (order) =>
          new Date(order.createdAt).toISOString().slice(0, 10) === selectedDate
      )
    : [...orders];

  filteredOrders.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const toggleOrder = (orderId) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  if (isLoading) {
    return <p className="text-center py-10 text-gray-600">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 py-10">
        Failed to load orders. Please check your connection or try again later.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-black">All Customer Orders</h1>
        <div className="flex gap-3 items-center flex-wrap">
          <input
            type="date"
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="/empty-box.png"
            alt="No orders"
            className="w-32 h-32 mx-auto mb-4 opacity-60"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No orders found
          </h2>
          <p className="text-gray-500 text-sm">
            You haven’t received any orders yet.
          </p>
        </div>
      ) : (
        filteredOrders.map((order, index) => {
          const isOpen = openOrderIds.includes(order._id);
          const firstProduct = order.items[0]?.product;
          const previewImage = firstProduct?.images?.[0] || firstProduct?.image;

          return (
            <div
              key={order._id}
              className={`bg-white shadow-md rounded-xl p-6 mb-6 transition ${
                index === 0 ? "ring-2 ring-amber-600 shadow-lg" : ""
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrder(order._id)}
              >
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    Order #{order._id}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {order.user?.firstName} {order.user?.lastName} (
                    {order.user?.email})
                  </p>
                  <p className="text-sm text-gray-700">
                    Total: ₦{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt={firstProduct?.name}
                    className="w-24 h-20 object-cover rounded-md ml-4"
                  />
                )}
              </div>

              {isOpen && (
                <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {order.items.map((item, i) => {
                    const product = item.product;
                    const image = product?.image?.[0] || product?.image;

                    return (
                      <div
                        key={i}
                        className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
                      >
                        {image && (
                          <img
                            src={image}
                            alt={product?.name}
                            className="w-full h-40 object-cover rounded-md mb-3"
                          />
                        )}
                        <div>
                          <h3 className="text-base font-semibold text-black mb-1">
                            {product?.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product?.description}
                          </p>
                          <div className="mt-2 text-sm text-gray-800">
                            <p>Price: ₦{product?.price}</p>
                            <p>Quantity: {item.qty}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminOrderPage;
