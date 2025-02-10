import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import instance from "../../axiosConfig";

export default function LoginUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract the "refer" query parameter from the URL. If it doesn't exist, default to "/"
  const queryParams = new URLSearchParams(location.search);
  const refer = queryParams.get("refer") || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await instance.post(
        "user/login",
        formData,
        { withCredentials: true }
      );
      setMessage(response.data.message);
      
      // Clear the form
      setFormData({ email: "", password: "" });
      
      // Redirect after a short dela
      setTimeout(() => {
        navigate(refer, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
    } finally {~
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="300" r="300" fill="url(#paint0_radial)" />
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
          Welcome Back
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
              placeholder="Enter your password"
              value={formData.password}
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
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
