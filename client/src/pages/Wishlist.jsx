// Wishlist.jsx
import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await instance.get("user/wishlist", {
          withCredentials: true,
        });
        // Use an empty array as fallback if wishlist is undefined.
        setWishlist(response.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Your Wishlist
      </h1>
      {wishlist && wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist &&
            wishlist.map((productId) => (
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
        const response = await instance.get(`product/get/${productId}`);
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
      <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex items-center justify-center">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex items-center justify-center">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Container with fixed height */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>
        {product.brand && (
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium">Brand:</span> {product.brand}
          </p>
        )}
        <p className="text-lg text-gray-900 mb-2">
          <span className="font-medium">Price:</span> ${product.price}
        </p>
        {product.inStock !== undefined && (
          <p
            className={`text-sm font-medium mb-2 ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="font-medium">Availability:</span>{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        )}
        {product.description && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Description:</span>{" "}
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
