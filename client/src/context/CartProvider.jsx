import React from 'react'
import { createContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import instance from '../axiosConfig'


export const CartContext = createContext(null);

export function CartProvider({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState({ items: [] });
  
    // Run fetchCart only once on mount
    useEffect(() => {
      fetchCart();
    }, []);
  
    async function addToCart(productId, quantity = 1) {
      try {
        const response = await instance.post(
          "cart/add",
          { productId, quantity },
          { withCredentials: true }
        );
        setCart(response.data.cart);
        toast.success("Product added to cart!");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Please login to add products to your cart.");
          // Redirect the user to login with a refer parameter
          const refer = encodeURIComponent(location.pathname + location.search);
          navigate(`/login?refer=${refer}`);
        } else {
          
          toast.error("Failed to add product to cart. Please try again later.");
        }
      }
    }
  
    async function fetchCart() {
      try {
        const response = await instance.get("cart", { withCredentials: true });
        setCart(response.data.cart);
       
      } catch (error) {
        
        toast.error("Failed to fetch cart.");
      }
    }
  
    async function updateQuantity(productId, quantity) {
      try {
        const response = await instance.put(
          "cart/update",
          { productId, quantity },
          { withCredentials: true }
        );
      
        setCart(response.data.cart);
      } catch (error) {
      
        toast.error("Failed to update cart. Please try again later.");
      }
    }
  
    async function removeFromCart(productId) {
      try {
        const response = await instance.delete("cart/remove/" + productId, {
          withCredentials: true,
        });
       
        // Update the cart state with the new cart data:
        setCart(response.data.cart);
        toast.success("Product removed from cart!");
      } catch (error) {
        console.error("Error removing product from cart:", error);
        toast.error(
          "Failed to remove product from cart. Please try again later."
        );
      }
    }
  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
