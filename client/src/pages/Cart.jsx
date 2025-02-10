import React, { useEffect } from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";

function Cart() {
  const { cart, fetchCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart.items || cart.items.length === 0) {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold mt-4">
          Your cart is empty
        </h1>
        <div className="text-center mt-4">
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {cart?.items
            ?.filter((item) => item.product !== null)
            .map((item) => (
              <div
                key={item.product._id}
                className="border rounded-lg p-4 flex gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.brand}</p>
                  <p className="flex items-center font-bold">
                    <LiaRupeeSignSolid />
                    {item.product.price}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="px-3 py-1 border-r"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                        className="px-3 py-1 border-l"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Cart Summary - Right Side */}
        <div className="lg:col-span-1 space-y-4">
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 pb-4 border-b">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="flex items-center font-bold">
                  <LiaRupeeSignSolid />
                  {cart.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="flex items-center font-bold">
                  <LiaRupeeSignSolid />
                  Free
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span className="flex items-center font-bold">
                  <LiaRupeeSignSolid />
                  0.00
                </span>
              </div>
            </div>
            <div className="flex justify-between py-4 font-bold">
              <span>Total:</span>
              <span className="flex items-center">
                <LiaRupeeSignSolid />
                {cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
