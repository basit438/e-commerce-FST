import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

function useCart() {
 const  context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context; ;
}

export default useCart