
import React, { useState } from 'react';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '08123456789',
    location: 'Lagos, Nigeria',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', formData);
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
