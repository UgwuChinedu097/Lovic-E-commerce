import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOneProductQuery } from '../service/UserApi';
import { useUpdateProductMutation } from '../service/ProductApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading, isError } = useGetOneProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  const [images, setImages] = useState([null, null, null, null, null]);
  const fileInputRefs = useRef([...Array(5)].map(() => React.createRef()));
  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;


      setFormState({
        name: p.name || '',
        description: p.description || '',
        price: p.price || '',
        stock: p.stock || '',
        category: p.category || '',
      });

   
      const existing = p.image || [];
      const initImages = Array(5).fill(null).map((_, idx) => {
        return existing[idx]
          ? { url: existing[idx], file: null }
          : null;
      });
      setImages(initImages);
    }
  }, [productData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };


  const triggerFileInput = (index) => {
    const ref = fileInputRefs.current[index];
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const previewUrl = URL.createObjectURL(file);
    setImages(prev => {
      const copy = [...prev];
      copy[index] = { url: previewUrl, file };
      return copy;
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    images.forEach(slot => {
      if (slot && slot.file) {
      
        formData.append('image', slot.file);
      }
    });

    try {
      await updateProduct({ id, formData }).unwrap();
      alert('Product updated successfully');
      navigate('/admin/products'); 
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product');
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading product...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Failed to load product.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        
        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formState.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        
        <div>
          <label className="block font-semibold mb-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formState.price}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        
        <div>
          <label className="block font-semibold mb-1" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formState.stock}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

      
        <div>
          <label className="block font-semibold mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formState.category}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        
        <div>
          <label className="block font-semibold mb-2">
            Images (up to 5)
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {images.map((slot, idx) => (
              <div
                key={idx}
                className="w-full h-32 border-2 border-dashed rounded cursor-pointer flex items-center justify-center bg-gray-50 relative hover:border-amber-600"
                onClick={() => triggerFileInput(idx)}
              >
                {slot?.url ? (
                  <img
                    src={slot.url}
                    alt={`Slot ${idx + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <span className="text-gray-400">Click to upload</span>
                )}

                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRefs.current[idx]}
                  onChange={(e) => handleImageChange(e, idx)}
                  disabled={isUpdating}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Click any slot to replace/add an image. Up to 5 total.
          </p>
        </div>

        
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
