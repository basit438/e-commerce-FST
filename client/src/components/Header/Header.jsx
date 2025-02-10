import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useCart  from "../../hooks/useCart"; // Ensure your hook returns { cart, ... }
import instance from "../../axiosConfig";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart , fetchCart } = useCart(); // Assuming cart is an object like { items: [] }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await instance.get("user/profile", {
          withCredentials: true,
        });
        setIsLoggedIn(response.status === 200);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [location, isLoggedIn, cart]); // re-run whenever the location changes
useEffect(() => {
  fetchCart();
},[])   
  const handleLogout = async () => {
    try {
      await instance.post("user/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Build the navigation links.
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Products", to: "/products" },
    ...(isLoggedIn ? [{ name: "My Profile", to: "/profile" }] : []),
    ...(!isLoggedIn ? [
      { name: "Login", to: "/login" },
      { name: "Register", to: "/register" }
    ] : []),
  ];

  // Add the Cart link (with badge) if the user is logged in.
  if (isLoggedIn) {
    navLinks.push({
      name: (
        <div className="relative inline-block">
          <span>Cart</span>
          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.items.length}
            </span>
          )}
        </div>
      ),
      to: "/cart",
    });
  }

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:py-6">
        {/* Logo */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold tracking-wide"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/">ShopEase</Link>
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to={link.to}
                className="text-lg font-medium hover:text-gray-200 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {isLoggedIn && (
            <button
              className="text-lg font-medium hover:text-gray-200 transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-center"
              >
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={link.to}
                  className="block text-lg font-medium hover:text-gray-200 transition-colors duration-200 px-4 py-2"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
            {isLoggedIn && (
              <li className="w-full text-center">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:text-gray-200 transition-colors duration-200 px-4 py-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
