import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold tracking-wide"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/">ShopEase</Link>
        </motion.h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/" className="text-lg font-medium hover:text-gray-200 transition">
              Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/about" className="text-lg font-medium hover:text-gray-200 transition">
              About
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/login" className="text-lg font-medium hover:text-gray-200 transition">
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/register" className="text-lg font-medium hover:text-gray-200 transition">
              Register
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/add-product" className="text-lg font-medium hover:text-gray-200 transition">
              Add Product
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/products" className="text-lg font-medium hover:text-gray-200 transition">
              Products
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/register-seller" className="text-lg font-medium hover:text-gray-200 transition">
              Register as Seller
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/profile" className="text-lg font-medium hover:text-gray-200 transition">
             My Profile
            </Link>
          </motion.div>
          
        </nav>
      </div>
    </header>
  );
}
