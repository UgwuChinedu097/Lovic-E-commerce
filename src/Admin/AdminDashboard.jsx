import React from "react";
import { useGetAllOrdersQuery } from "../service/CartApi";
import { useGetAllProductsQuery } from "../service/ProductApi";
import { useGetAllUsersQuery } from "../service/UserApi";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { Users, ShoppingBag, DollarSign, Box } from "lucide-react";

const AdminDashboard = () => {
  const { data: ordersData } = useGetAllOrdersQuery();
  const { data: productsData } = useGetAllProductsQuery();
  const { data: usersData } = useGetAllUsersQuery();

  const orders = ordersData?.allOrder || [];
  const products = productsData?.allProduct || [];
  const users = usersData?.allUser || [];

  const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const thisMonth = new Date().getMonth();
  const recentUsers = [...users].slice(-5).reverse();

  const monthlySales = Array.from({ length: 6 }, (_, i) => {
    const targetMonth = (thisMonth - i + 12) % 12;
    const monthName = new Date(0, targetMonth).toLocaleString("default", { month: "short" });
    const monthOrders = orders.filter(
      (order) => new Date(order.createdAt).getMonth() === targetMonth
    );
    const monthTotal = monthOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return { name: monthName, sales: monthTotal };
  }).reverse();

  const stockChart = [
    { name: "Out of Stock", count: products.filter(p => p.stock === 0).length },
    { name: "Low Stock", count: products.filter(p => p.stock > 0 && p.stock <= 3).length },
    { name: "In Stock", count: products.filter(p => p.stock > 3).length },
  ];

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: "Total Sales",
      value: `₦${totalSales.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Products",
      value: products.length,
      icon: <Box className="w-5 h-5" />,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Customers",
      value: users.length,
      icon: <Users className="w-5 h-5" />,
      color: "text-black bg-gray-100",
    },
  ];


  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-black">Welcome, Admin</h1>
        <p className="text-sm text-gray-500">Here’s your overview for today</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{s.title}</p>
              <h2 className="text-2xl font-bold text-black mt-1">{s.value}</h2>
            </div>
            <div className={`p-3 rounded-full ${s.color}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Sales (Last 6 Months)</h3>
          <div className="w-full h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Product Stock Overview</h3>
          <div className="w-full h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Top Recent Users</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentUsers.map((u) => (
            <div
              key={u._id}
              className="flex items-center gap-4 bg-neutral-50 rounded-lg p-4 hover:shadow transition"
            >
              {/* Avatar Initial */}
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold uppercase">
                {u.firstName?.[0] || u.name?.[0] || "U"}
              </div>
              {/* Details */}
              <div>
                <p className="text-sm font-semibold text-black">
                  {u.firstName || u.name || "N/A"}
                </p>
                <p className="text-xs text-gray-500">{u.email || "No email"}</p>
                <span
                  className={`mt-1 inline-block text-xs px-2 py-1 rounded-full font-medium ${u.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {u.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
