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

  // Hooks for navigation and getting current location
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
      } catch (error) {
        console.error("Error fetching wishlist:", error);
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
    } catch (error) {
      console.error(
        "Error updating wishlist:",
        error.response?.data?.message || error.message
      );
      if (error.response && error.response.status === 401) {
        toast.error("Please login to add products to your wishlist.");
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
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products</h2>
        {loading && <p className="text-blue-500 text-lg">Loading products...</p>}
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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
                  className="bg-white border border-gray-200 rounded p-3 hover:shadow-xl transition transform hover:scale-105 flex flex-col"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 w-full object-contain mb-2"
                    />
                  </Link>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                  <p className="text-base font-bold text-gray-900 mb-1">
                    ${product.price}
                  </p>
                  <p
                    className={`text-xs font-medium mb-2 ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <motion.button
                    onClick={() => handleWishlistClick(product._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-xs font-semibold py-1 px-2 rounded ${
                      isInWishlist
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {isInWishlist ? "Remove" : "Wishlist"}
                  </motion.button>
                 
                   
                </motion.div>
              );
            })
          ) : (
            !loading && (
              <p className="col-span-full text-center text-gray-500 text-lg">
                No products available
              </p>
            )
          )}
        </motion.div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
