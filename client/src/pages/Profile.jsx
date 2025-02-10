import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "../axiosConfig";

function Profile() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null);
  const [changes, setChanges] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await instance.get("user/profile", {
        withCredentials: true,
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setData({});
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setChanges(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.put("user/update-profile", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        setChanges(false);
        // Optionally re-fetch data to update state
        fetchData();
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    }
  }

  // Helper function to format the creation date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {message && <div className="mb-4 text-center text-green-600 font-medium">{message}</div>}
      <div id="profile" className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border-r border-gray-200 p-4 bg-gray-50">
          <ul className="space-y-4">
            <li className="font-semibold text-gray-700">
              <Link to="/profile" className="hover:text-indigo-600 transition duration-300">
                Personal Details
              </Link>
            </li>
            <li className="font-semibold text-gray-700">
              <Link to="/wishlist" className="hover:text-indigo-600 transition duration-300">
                Wishlist
              </Link>
            </li>
            <li className="font-semibold text-gray-700">
              <Link to="/orders" className="hover:text-indigo-600 transition duration-300">
                My Orders
              </Link>
            </li>
            {data.role === "seller" && (
              <>
                <li className="font-semibold text-gray-700">
                  <Link to="/my-products" className="hover:text-indigo-600 transition duration-300">
                    My Products
                  </Link>
                </li>
                <li className="font-semibold text-gray-700">
                  <Link to="/my-coupons" className="hover:text-indigo-600 transition duration-300">
                    My Coupons
                  </Link>
                </li>
                <li className="font-semibold text-gray-700">
                  <Link to="/add-product" className="hover:text-indigo-600 transition duration-300">
                    Add Product
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 p-6">
          {data.name ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    value={data.email}
                    readOnly
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Your phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="createdAt" className="block text-gray-700 mb-2">
                    Account Created On
                  </label>
                  <input
                    type="text"
                    name="createdAt"
                    id="createdAt"
                    placeholder="Account created on"
                    value={data.createdAt ? formatDate(data.createdAt) : ""}
                    readOnly
                    className="w-full border border-gray-300 p-3 rounded bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="role" className="block text-gray-700 mb-2">
                  Role
                </label>
                {data.role === "seller" ? (
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Your role"
                    value="Seller"
                    readOnly
                    className="w-full border border-gray-300 p-3 rounded bg-gray-100 cursor-not-allowed"
                  />
                ) : (
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Your role"
                    value="Buyer"
                    readOnly
                    className="w-full border border-gray-300 p-3 rounded bg-gray-100 cursor-not-allowed"
                  />
                )}
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  disabled={!changes}
                  className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-300 font-semibold"
                >
                  Save Details
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500 text-lg">Loading profile...</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
