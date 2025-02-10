// ProductList.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import instance from "../axiosConfig";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // holds product IDs from the user's wishlist
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("product/get");
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch the current user's wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await instance.get("user/wishlist", {
          withCredentials: true,
        });
        setWishlist(response.data.wishlist);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Handler to toggle wishlist status for a product
  const handleWishlistClick = async (productId) => {
    try {
      const response = await instance.post(
        "user/add-to-wishlist",
        { productId },
        { withCredentials: true }
      );
      setWishlist(response.data.wishlist);
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error updating wishlist:", err.response?.data?.message || err.message);
      if (err.response && err.response.status === 401) {
        toast.error("Please login to add products to your wishlist.");
        setTimeout(() => {
          const refer = encodeURIComponent(location.pathname + location.search);
          navigate(`/login?refer=${refer}`);
        }, 1500);
      } else {
        toast.error(err.response?.data?.message || "Error updating wishlist");
      }
    }
  };

  // Helper to check if a product is in the wishlist
  const isInWishlist = (productId) =>
    wishlist.some((id) => id.toString() === productId.toString());

  // Framer Motion variants for card animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>
        {loading ? (
          <div className="flex justify-center">
            <p className="text-xl text-blue-500">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  className="relative bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
                >
                  <Link to={`/product/${product._id}`}>
                    {/* Fixed container for image so it fits uniformly */}
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/product/${product._id}`}>
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <motion.button
                        onClick={() => handleWishlistClick(product._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 text-sm rounded ${
                          isInWishlist(product._id)
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        {isInWishlist(product._id) ? "Remove" : "Wishlist"}
                      </motion.button>
                    </div>
                    <div className="mt-4">
                      <Link to={`/product/${product._id}`}>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                  {/* Optional overlay for out-of-stock products */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Out of Stock</span>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-xl">
                No products available.
              </p>
            )}
          </motion.div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
