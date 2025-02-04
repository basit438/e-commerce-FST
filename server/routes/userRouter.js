import express from "express";
import {registerUser , loginUser, registerSeller} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser); 
userRouter.post("/login" , loginUser);
userRouter.post("/register-seller", registerSeller)

export default userRouter