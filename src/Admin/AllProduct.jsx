import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../service/ProductApi";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = Array.isArray(data?.allProduct) ? data.allProduct : [];

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.length;
  const outOfStock = filtered.filter((p) => p.stock === 0).length;
  const inStock = filtered.filter((p) => p.stock > 0).length;

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id).unwrap();
      closeDeleteModal();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500 text-lg py-10">Loading products...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 text-lg py-10">
        Failed to load products. Please try again.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-amber-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Total Products</p>
          <h3 className="text-2xl font-bold text-gray-900">{total}</h3>
        </div>
        <div className="bg-green-50 shadow-md rounded-xl p-4 text-center">
          <p className="text-sm text-green-600">In Stock</p>
          <h3 className="text-2xl font-bold text-green-700">{inStock}</h3>
        </div>
        <div className="bg-red-50 shadow-md rounded-xl p-4 text-center">
          <p className="text-sm text-red-600">Out of Stock</p>
          <h3 className="text-2xl font-bold text-red-700">{outOfStock}</h3>
        </div>
      </div>

      Product Grid
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={product.image?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-sm text-gray-800 font-medium">₦{product.price}</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/dashboard/view-product/${product._id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                    className="text-amber-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">{productToDelete?.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
