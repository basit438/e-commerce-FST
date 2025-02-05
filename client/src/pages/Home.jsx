// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Products from "../pages/Products.jsx"
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
   

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Shop the latest trends and find the perfect products for your style.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h18v18H3V3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                We offer only the best quality items that are built to last.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Trusted Service
              </h3>
              <p className="text-gray-600">
                Our customer support is always here to help you with any questions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Enjoy fast and reliable shipping on all orders, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl mb-8">
            Sign up today and get exclusive deals on your favorite products.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

     
    {/* <Footer/> */}
    </div>
  );
}
