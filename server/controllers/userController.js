import mongoose from "mongoose";
import {user} from '../models/user.model.js'
import bcrypt from 'bcrypt'

export async function registerUser(req, res) {
    try {
       
        const {name, email, password, phone} = req.body;
        console.log(req.body);
        // Validate required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            phone
        });

        // Save user to database
        await newUser.save();

        // Return success response (excluding password)
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Error registering user"
        });
    }
}