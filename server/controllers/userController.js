import mongoose from "mongoose";
import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendVerificationEmail, generateVerificationToken } from "../utils/emailVerification.js";

//function to register a user (buyer by default)

export async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
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
      phone,
    });

    // Save user to database
    await newUser.save();

  // Create a JWT token
  const token = generateVerificationToken(email); 

  // Send verification email
  await sendVerificationEmail(email, token);



    // Return success response (excluding password)
    return res.status(201).json({
      message: "User registered successfully. Please verify your email and login",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Error registering user",
    });
  }
}

export async function loginUser(req, res) {
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        const userToFind = await user.findOne({email});
        if(!userToFind){
            return res.status(404).json({message : "User not found"});
        }

        //check if user is verified
        if(!userToFind.isEmailVerified){
            return res.status(401).json({message : "User is not verified. Please verify your email"});
        }

        //check if password is correct    
        const isPasswordCorrect = await bcrypt.compare(password , userToFind.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message : "Incorrect password"});
        }

        //create a JWT token
        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : "1d"});

        return res.status(200).json({message : "User logged in successfully", token});


        
    } catch (error) {
        
    }

}

