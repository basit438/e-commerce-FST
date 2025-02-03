import mongoose from "mongoose";
import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

 export const verifyToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(404).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const existingUser = await user.findOneAndUpdate({email : decoded.email} , {isVerified : true} , {new : true});
        
        if(!existingUser){
            return res.status(404).json({ message: "User not found" });
        }

          return res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
        return res.status(404).json({ message: "Invalid token" });
    }

};

