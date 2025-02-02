import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="300" r="300" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 300) rotate(90) scale(300)">
              <stop stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Shop With Us</h2>
        <p className="mb-6 text-gray-200 max-w-lg mx-auto">
          Discover amazing deals and a seamless shopping experience. Stay connected with us!
        </p>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            >
              <Icon className="text-white text-xl" />
            </motion.a>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-xl p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-l-lg focus:outline-none text-black"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-indigo-700 transition"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="text-gray-200 space-y-1">
              <li><a href="#" className="hover:text-white">Men</a></li>
              <li><a href="#" className="hover:text-white">Women</a></li>
              <li><a href="#" className="hover:text-white">Kids</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-gray-200 space-y-1">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Help</h4>
            <ul className="text-gray-200 space-y-1">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="text-gray-200 space-y-1">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <p className="mt-10 text-gray-300 text-sm">&copy; {new Date().getFullYear()} Your Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
