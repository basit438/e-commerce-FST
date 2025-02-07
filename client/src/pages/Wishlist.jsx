// Wishlist.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5057/api/v1/user/wishlist", {
          withCredentials: true,
        });
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((productId) => (
            <WishlistItem key={productId} productId={productId} />
          ))}
        </div>
      )}
    </div>
  );
};

const WishlistItem = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5057/api/v1/product/get/${productId}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 border rounded shadow bg-white">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <div className="px-2">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        {product.brand && (
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
        )}
        <p className="text-lg text-gray-800 mb-2">
          <span className="font-semibold">Price:</span> ${product.price}
        </p>
        {product.inStock !== undefined && (
          <p
            className={`mb-2 text-sm font-medium ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="font-semibold">Availability:</span>{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        )}
        {product.description && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Description:</span> {product.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
