// ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // holds product IDs from the user's wishlist
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hooks for navigation and getting current location
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products from your API
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

  // Fetch the current user's wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5057/api/v1/user/wishlist", {
          withCredentials: true,
        });
        // Even if you don't display the wishlist in your UI, you need this to set the button text correctly.
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  // Handler to toggle wishlist status for a product
  const handleWishlistClick = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5057/api/v1/user/add-to-wishlist",
        { productId },
        { withCredentials: true }
      );
      // Update local wishlist state with the updated wishlist from the backend
      setWishlist(response.data.wishlist);
      // Display a toast notification based on the response message from the server
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Error updating wishlist:",
        error.response?.data?.message || error.message
      );
      // If the error status is 401, the user is not logged in.
      if (error.response && error.response.status === 401) {
        toast.error("Please login to add products to your wishlist.");
        // Redirect the user to the login page with a refer query parameter
        setTimeout(() => {
          const refer = encodeURIComponent(location.pathname + location.search);
          navigate(`/login?refer=${refer}`);
        }, 1500);
      } else {
        toast.error(error.response?.data?.message || "Error updating wishlist");
      }
    }
  };

  // Framer Motion variants for container and card animations (optional)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

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
          products.map((product) => {
            // Check if the product is in the wishlist by comparing IDs
            const isInWishlist = wishlist.some(
              (id) => id.toString() === product._id.toString()
            );

            return (
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
                <motion.button
                  onClick={() => handleWishlistClick(product._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-4 text-white py-2 px-4 rounded-lg ${
                    isInWishlist
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </motion.button>
              </motion.div>
            );
          })
        ) : (
          !loading && <p className="text-gray-500 text-lg">No products available</p>
        )}
      </motion.div>
      {/* ToastContainer to display notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
