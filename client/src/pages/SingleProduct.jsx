import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import  useCart  from '../hooks/useCart';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);   // Holds product data
  const [loading, setLoading] = useState(true);     // Indicates loading state
  const [error, setError] = useState(null);         // Holds error message if any
  const { addToCart } = useCart();


  useEffect(() => {
    // Define an async function to fetch the product data
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5057/api/v1/product/get/${id}`);
        // Assuming your API returns an object with a "product" key
        setProduct(response.data.product);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run if the id parameter changes

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img src={product.image} alt={product.name} className="w-full rounded-lg mb-4" />
        <p className="text-gray-600 text-sm">Category: {product.category}</p>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
        <p className="text-sm text-gray-600">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
       <button onClick={()=>addToCart(product._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Add to Cart</button>

    </div>
  );
}

export default SingleProduct;
