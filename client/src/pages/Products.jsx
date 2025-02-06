import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5057/api/v1/product/get");
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Variants for container animation (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for each product card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>
      {loading && <p className="text-blue-500 text-lg">Loading products...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product._id}
              variants={cardVariants}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-gray-700 font-bold">${product.price}</p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  product.inStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Add to Wishlist</button>
            </motion.div>
          ))
        ) : (
          !loading && <p className="text-gray-500 text-lg">No products available</p>
        )}
      </motion.div>
    </div>
  );
}
