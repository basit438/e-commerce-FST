import express from "express";
import {registerUser , loginUser, registerSeller, logoutUser, getUserProfile, updateUserProfile, addToWishlist, getWishlist} from "../controllers/userController.js";
import { ProtectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser); 
userRouter.post("/login" , loginUser);
userRouter.post("/register-seller", registerSeller)
userRouter.post("/logout" , logoutUser);
userRouter.get("/profile", ProtectRoute, getUserProfile)
userRouter.put("/update-profile", ProtectRoute, updateUserProfile)
userRouter.post("/add-to-wishlist", ProtectRoute, addToWishlist);
userRouter.get("/wishlist", ProtectRoute, getWishlist);

export default userRouter