import { useState, useRef } from "react";
import { useAddProductMutation } from "../service/ProductApi"; 
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../service/ProductSlice";

const categories = [
  "necklace",
  "ring",
  "watches",
  "bracelet",
  "bangle",
  "cufflinks",
  "sets",
];

const AddProduct = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([null, null, null, null, null]);
  const fileInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];


  const [addProduct, { isLoading, isError, error, isSuccess }] = useAddProductMutation();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(setCategoryFilter(e.target.value));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = {
      file,
      url: URL.createObjectURL(file),
    };
    setImages(newImages);
  };

  const triggerFileInput = (index) => {
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name || "");
    formData.append("description", productData.description || "");
    formData.append("price", productData.price || "");
    formData.append("stock", productData.stock || "");
    formData.append("category", category || "");

    images.forEach((imgObj) => {
      if (imgObj && imgObj.file) {
        formData.append("images", imgObj.file);
      }
    });

    try {
      await addProduct(formData).unwrap();

      alert("Product created successfully!");
      setCategory("");
      setProductData({});
      setImages([null, null, null, null, null]);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-black mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-black mb-1">Product Name</label>
          <input
            name="name"
            value={productData.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter product name"
            required
            disabled={isLoading}
          />
        </div>

        
        <div>
          <label className="block text-black mb-1">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
            disabled={isLoading}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-black mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={productData.price || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="₦0.00"
            required
            disabled={isLoading}
          />
        </div>

        
        <div>
          <label className="block text-black mb-1">Stock Quantity</label>
          <input
            name="stock"
            type="number"
            value={productData.stock || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="0"
            required
            disabled={isLoading}
          />
        </div>

        
        <div>
          <label className="block text-black mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter product description"
            disabled={isLoading}
          />
          
          {productData.description && (
            <ul className="mt-2 list-disc list-inside text-gray-700 text-sm bg-gray-50 p-2 rounded max-h-40 overflow-auto">
              {productData.description
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
            </ul>
          )}
        </div>


        <div>
          <label className="block text-black mb-2">Upload Images (5 slots)</label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-32 border-2 border-dashed rounded cursor-pointer flex items-center justify-center bg-gray-50 relative hover:border-amber-600"
                onClick={() => !isLoading && triggerFileInput(idx)}
              >
                {img ? (
                  <img
                    src={img.url}
                    alt={`Product ${idx + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <span className="text-gray-400">Click to upload</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRefs[idx]}
                  onChange={(e) => handleImageChange(e, idx)}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>
        </div>

      
        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>

        
        {isError && (
          <p className="text-red-600 mt-2">
            Error: {(error?.data?.message) || "Failed to add product"}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-600 mt-2">Product added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
