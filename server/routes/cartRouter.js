import express from "express";

const cartRouter = express.Router();
import { addToCart, getCart, updateCart, removeFromCart } from "../controllers/cartController.js";
import { ProtectRoute } from "../middlewares/auth.js";


// Add a product to the cart
cartRouter.post("/add", ProtectRoute, addToCart);

// Get all products in the cart
cartRouter.get("/", ProtectRoute, getCart);

// Update the the cart
cartRouter.put("/update", ProtectRoute, updateCart);

// Delete a product from the cart
cartRouter.delete("/remove/:id", ProtectRoute, removeFromCart);

export default cartRouter;