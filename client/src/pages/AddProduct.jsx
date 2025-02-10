// AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import instance from "../axiosConfig";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    inStock: false,
    inventory: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Validate form fields
    if (
      !formData.name ||
      !formData.brand ||
      !formData.category ||
      !formData.price ||
      !formData.description ||
      !formData.inventory ||
      !imageFile
    ) {
      setError("All fields are required. Please fill out the form completely.");
      setLoading(false);
      return;
    }

    if (formData.price <= 0) {
      setError("Price must be a positive number.");
      setLoading(false);
      return;
    }

    if (formData.inventory < 0) {
      setError("Inventory cannot be negative.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("inStock", formData.inStock);
    data.append("inventory", formData.inventory);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await instance.post(
        "product/add",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        description: "",
        inStock: false,
        inventory: "",
      });
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Add New Product
        </h2>

        {message && (
          <p className="text-green-600 text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm text-gray-600"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm text-gray-600"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
              rows="2"
              required
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="inStock" className="text-sm text-gray-600">
              In Stock
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inventory"
                className="block text-sm text-gray-600"
              >
                Inventory
              </label>
              <input
                type="number"
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-400"
                min="0"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm text-gray-600"
              >
                Product Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-semibold"
            disabled={loading}
          >
            {loading ? "Adding product..." : "Add Product"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
