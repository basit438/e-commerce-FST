import express from "express";
import {registerUser , loginUser, registerSeller, logoutUser, getUserProfile, updateUserProfile} from "../controllers/userController.js";
import { ProtectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser); 
userRouter.post("/login" , loginUser);
userRouter.post("/register-seller", registerSeller)
userRouter.get("/logout" , logoutUser);
userRouter.get("/profile", ProtectRoute, getUserProfile)
userRouter.put("/update-profile", ProtectRoute, updateUserProfile)

export default userRouter