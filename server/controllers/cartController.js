import { Cart } from "../models/cart.model.js";
import { user } from "../models/user.model.js";
import { product } from "../models/product.model.js";

// function to add product to cart
export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // check if the user already has the product in their cart
    let cart = await Cart.findOne({ user: userId });

    // if the user does not have a cart, create a new cart
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // if the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // if the product is not in the cart, add the product to the cart
      cart.items.push({ product: productId, quantity });
    }

    // find the product to get the price
    let totalPrice = 0;
    const productToAdd = await product.findById(productId);
    const price = productToAdd.price;

    // calculate the total price of the cart

    cart.items.forEach((item) => {
      totalPrice += item.quantity * price;
    });

    cart.totalPrice = totalPrice;

    // save the updated cart
    await cart.save();
    //populate the cart with the product and user

    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (error) {}
}

// function to get all products in the cart
export async function getCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(200).json({ cart: { items: [], totalPrice: 0 } });
    }
    return res.status(200).json({ cart });
  } catch (error) {}
}

// function to update the cart

export async function updateCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartitem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!cartitem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cartitem.quantity = quantity;

    let totalPrice = 0;
    const productToUpdate = await product.findById(productId);
    const price = productToUpdate.price;

    cart.items.forEach((item) => {
      totalPrice += item.quantity * price;
    });

    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res
      .status(500)
      .json({ message: "Failed to update cart. Please try again later." });
  }
}

// function to delete a product from the cart

export async function removeFromCart(req, res) {
  try {
    // Log the request parameters and user info for debugging
    console.log("removeFromCart called");
    console.log("req.params:", req.params);
    console.log("req.user:", req.user);

    const userId = req.user._id;
    // Since your router defines the parameter as /remove/:id, use req.params.id
    const productId = req.params.id;
    console.log("Product ID to remove:", productId);

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    console.log("Cart before removal:", cart);

    if (!cart) {
      console.error("Cart not found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    const initialCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    console.log(
      `Items count changed from ${initialCount} to ${cart.items.length}`
    );

    // Recalculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      console.log("Processing item:", item);
      // Fetch product details in case they are not fully populated
      const productDetails = await product.findById(item.product);
      if (!productDetails) {
        console.error("Product details not found for item:", item);
        continue;
      }
      console.log("Product details:", productDetails);
      totalPrice += item.quantity * productDetails.price;
    }
    cart.totalPrice = totalPrice;
    console.log("New totalPrice:", totalPrice);

    // Save and populate the updated cart
    await cart.save();
    await cart.populate("items.product");
    console.log("Cart after save:", cart);

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove product from cart." });
  }
}
