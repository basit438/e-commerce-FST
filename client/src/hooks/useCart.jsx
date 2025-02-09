import React from 'react'
import axios from 'axios'
import instance from '../axiosConfig';
function useCart() {

  async function addToCart(productId, quantity = 1) {
    try {
      
      const response = await instance.post('cart/add', { productId, quantity }, { withCredentials: true });
      console.log(response.data);

    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  }
  return (
    { addToCart }
  )
}

export default useCart
