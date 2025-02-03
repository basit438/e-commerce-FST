import express from "express";
import { user } from "../models/user.model.js";
import { verifyToken } from "../controllers/auth.js";


const authRouter = express.Router();

authRouter.post("/verifyToken" , verifyToken)


export default authRouter;