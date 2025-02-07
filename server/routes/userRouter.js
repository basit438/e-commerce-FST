import express from "express";
import {registerUser , loginUser, registerSeller, logoutUser, getUserProfile, updateUserProfile, addToWishlist} from "../controllers/userController.js";
import { ProtectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser); 
userRouter.post("/login" , loginUser);
userRouter.post("/register-seller", registerSeller)
userRouter.post("/logout" , logoutUser);
userRouter.get("/profile", ProtectRoute, getUserProfile)
userRouter.put("/update-profile", ProtectRoute, updateUserProfile)
userRouter.post("/add-to-wishlist", ProtectRoute, addToWishlist);
userRouter.get("/wishlist", ProtectRoute, (req, res) => {
    try {
      res.status(200).json({ wishlist: req.user.wishlist });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default userRouter