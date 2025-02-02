import express from "express";
import {registerUser , loginUser} from "../controllers/userController.js";
import {verifyEmail} from "../controllers/auth.js"

const userRouter = express.Router();

userRouter.post("/register" , registerUser); 

userRouter.post("/verify-email" , verifyEmail);
userRouter.post("/login" , loginUser);

export default userRouter