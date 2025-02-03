import express from "express";
import { user } from "../models/user.model.js";
import { verifyToken } from "../controllers/auth.js";


const authRouter = express.Router();

authRouter.get("/verifyToken" , verifyToken)


export default authRouter;