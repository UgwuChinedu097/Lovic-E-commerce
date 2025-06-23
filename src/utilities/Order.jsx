import { useState } from "react";

const CustomerOrders = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2025-05-10",
      items: [
        {
          name: "Elegant Gold Necklace",
          image:
            "https://images.unsplash.com/photo-1600180758890-6b94519b1a48?auto=format&fit=crop&w=400&q=80",
        },
        {
          name: "Pearl Drop Earrings",
          image:
            "https://images.unsplash.com/photo-1611605698335-dc0a98d4edb0?auto=format&fit=crop&w=400&q=80",
        },
      ],
      total: "23,500",
      status: "Pending",
    },
    {
      id: "ORD-002",
      date: "2025-05-08",
      items: [
        {
          name: "Rose Gold Bracelet",
          image:
            "https://images.unsplash.com/photo-1589799938091-0e289fa9f1cf?auto=format&fit=crop&w=400&q=80",
        },
      ],
      total: "11,000",
      status: "Delivered",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-600 text-white";
      case "Processing":
        return "bg-black text-white";
      case "Shipped":
        return "bg-neutral-500 text-white";
      case "Delivered":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const currentOrders = orders.filter((o) => o.status !== "Delivered");
  const recentOrders = orders.filter((o) => o.status === "Delivered");

  const renderOrder = (order) => (
    <div
      key={order.id}
      className="border border-neutral-300 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition duration-200"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-semibold text-black">Order #{order.id}</p>
          <p className="text-sm text-neutral-500">Date: {order.date}</p>
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="text-neutral-700">{item.name}</p>
          </div>
        ))}
      </div>

      <p className="text-neutral-800 font-semibold">Total: ₦{order.total}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-black mb-10 text-center">My Orders</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-amber-600 mb-4">Current Orders</h2>
        {currentOrders.length ? (
          <div className="space-y-6">{currentOrders.map(renderOrder)}</div>
        ) : (
          <p className="text-neutral-500">You have no active orders at the moment.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-4">Recent Orders</h2>
        {recentOrders.length ? (
          <div className="space-y-6">{recentOrders.map(renderOrder)}</div>
        ) : (
          <p className="text-neutral-500">You have no recent orders yet.</p>
        )}
      </section>
    </div>
  );
};

export default CustomerOrders;
