import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import instance from "../../axiosConfig";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await instance.post("user/register", formData);
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="400"
            cy="300"
            r="300"
            fill="url(#paint0_radial)"
          />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400 300) rotate(90) scale(300)"
            >
              <stop stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        {message && (
          <p className="text-green-600 text-center font-medium mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 mb-1 font-medium"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1 font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-1 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 mb-1 font-medium"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            Login 
          </Link>
          <span className="text-gray-600 text-center mt-6 p-2">or Register as a{" "}</span>
          <Link
            to="/register-seller"
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            Seller
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
