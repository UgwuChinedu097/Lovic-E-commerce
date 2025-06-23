import { useParams } from "react-router-dom";
import { useGetOneProductQuery } from "../service/UserApi";

const AdminProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOneProductQuery(id);

  if (isLoading)
    return <div className="p-6 text-center text-gray-600 text-lg">Loading product...</div>;
  if (isError)
    return <div className="p-6 text-center text-red-500 text-lg">Failed to load product.</div>;

  const product = data?.product;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">📦 Product Details</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src={product?.image?.[0]}
              alt="Main Product"
              className="w-full h-[400px] object-cover"
            />
          </div>


          {product?.image?.length > 1 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {product.image.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow bg-white hover:scale-105 transition-transform duration-200"
                >
                  <img src={img} alt={`Thumb ${i + 2}`} className="h-28 w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Name</h2>
            <p className="text-xl font-semibold text-gray-900">{product.name}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Description</h2>
            {product.description ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.description
                  .split("\n")
                  .map(line => line.trim())
                  .filter(line => line.length > 0)
                  .map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No description available.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Price</h2>
              <p className="text-lg font-bold text-amber-600">₦{product.price}</p>
            </div>

            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Stock</h2>
              <p className="text-gray-800">{product.stock}</p>
            </div>

            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Category</h2>
              <p className="capitalize text-gray-800">{product.category}</p>
            </div>

            <div>
              <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Created At</h2>
              <p className="text-gray-800">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
