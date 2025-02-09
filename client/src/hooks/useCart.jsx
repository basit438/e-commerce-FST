import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../axiosConfig";
import { toast } from "react-toastify";
import { useEffect } from "react";

function useCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    fetchCart();
  }, [ cart.items.length ]);


  async function addToCart(productId, quantity = 1) {
    try {
      const response = await instance.post(
        "cart/add",
        { productId, quantity },
        { withCredentials: true }
      );
      console.log("Product added to cart:", response.data);
      setCart(response.data.cart);
      toast.success("Product added to cart!");
    } catch (error) {
      // If the error status is 401, the user is not logged in.
      if (error.response && error.response.status === 401) {
        toast.error("Please login to add products to your cart.");
        // Get the current URL so the user can be redirected back after login
        const refer = encodeURIComponent(location.pathname + location.search);
        navigate(`/login?refer=${refer}`);
      } else {
        console.error("Error adding product to cart:", error);
        toast.error("Failed to add product to cart. Please try again later.");
      }
    }
  }

  async function fetchCart() {
    try {
      const response = await instance.get("cart", { withCredentials: true });
      setCart(response.data.cart);
      console.log("Cart fetched:", response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart.");
    }
  }

  return { addToCart, cart, fetchCart };
}

export default useCart;
