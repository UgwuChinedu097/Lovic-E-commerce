import React from 'react';
import { useGetAllOrdersQuery } from '../service/CartApi';
import { useGetAllProductsQuery } from '../service/ProductApi';
import { useGetAllUsersQuery } from '../service/UserApi';
import { ShoppingBag, DollarSign, Box, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { data: ordersData, isLoading: loadingOrders, isError: errorOrders } = useGetAllOrdersQuery();
  const { data: productsData, isLoading: loadingProducts, isError: errorProducts } = useGetAllProductsQuery();
  const { data: usersData, isLoading: loadingUsers, isError: errorUsers } = useGetAllUsersQuery();

  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];
  const products = Array.isArray(productsData?.products) ? productsData.products : [];
  const users = Array.isArray(usersData?.users) ? usersData.users : [];

  const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const lowStock = products.filter((product) => product.stock <= 3);

  const cards = [
    { title: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" /> },
    { title: 'Total Sales', value: `₦${totalSales.toLocaleString()}`, icon: <DollarSign className="w-5 h-5" /> },
    { title: 'Products', value: products.length, icon: <Box className="w-5 h-5" /> },
    { title: 'Customers', value: users.length, icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold text-black mt-1">{card.value}</h2>
            </div>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-full">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-6 overflow-auto">
        <h3 className="text-lg font-semibold text-black mb-4">Recent Orders</h3>
        {loadingOrders ? (
          <p className="text-sm text-gray-500">Loading orders...</p>
        ) : errorOrders ? (
          <p className="text-sm text-red-500">Failed to load orders.</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-600">
              <tr className="border-b">
                <th className="py-3 text-left">Customer</th>
                <th className="text-left">Products</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-3">{order?.user?.name || 'Unknown'}</td>
                  <td>
                    {(order.products || [])
                      .map((p) => p.name || 'Product')
                      .slice(0, 2)
                      .join(', ')}
                  </td>
                  <td className="text-center">{order.products?.length || 0}</td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-right">
                    <button className="text-amber-600 font-medium hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-right mt-4">
          <button className="text-sm text-amber-600 font-semibold hover:underline">
            See All Orders
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-black mb-2">Low Stock Alerts</h3>
        {loadingProducts ? (
          <p className="text-sm text-gray-500">Checking stock...</p>
        ) : errorProducts ? (
          <p className="text-sm text-red-500">Failed to load products.</p>
        ) : lowStock.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-red-600">
            {lowStock.map((item) => (
              <li key={item._id}>
                {item.name} ({item.stock} left)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-600">All products have enough stock.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-xl text-sm">
          ➕ Add Product
        </button>
        <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-xl text-sm">
          📦 View All Products
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-xl text-sm">
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
