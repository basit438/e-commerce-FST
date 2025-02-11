import { user } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  sendVerificationEmail,
  generateVerificationToken, 
} from "../utils/emailVerification.js";

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
      message:
        "User registered successfully. Please verify your email and login",
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
    const { email, password } = req.body;
    

    if (!email || !password) {
     
      return res.status(400).json({ message: "All fields are required" });
    }

    const userToFind = await user.findOne({ email });
    if (!userToFind) {
     
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is verified
    if (!userToFind.isEmailVerified) {
    
      return res
        .status(401)
        .json({ message: "User is not verified. Please verify your email" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userToFind.password
    );
    if (!isPasswordCorrect) {
      
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Authorize user: Create a JWT token using userToFind
    const payload = { id: userToFind._id, email: userToFind.email };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax", // "lax" works better in development
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    

    const loggedInUser = {
      id: userToFind._id,
      name: userToFind.name,
      email: userToFind.email,
      phone: userToFind.phone,
      role: userToFind.role,
    };

    
    return res
      .status(200)
      .json({ message: "User logged in successfully", user: loggedInUser });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function registerSeller(req, res) {
  try {
    const { name, email, password, phone, oldPassword } = req.body;
   

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      if (existingUser.role === "seller") {
        return res
          .status(409)
          .json({ message: "User is already registered as a seller" });
      }

      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to change role" });
      }

      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect old password" });
      }

      const hashedNewPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedNewPassword;
      existingUser.role = "seller";
      await existingUser.save();

      return res.status(200).json({
        message: "User role updated to seller successfully",
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          role: existingUser.role,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new user({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "seller",
    });
    await newSeller.save();

    const token = generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    return res.status(201).json({
      message:
        "Seller registered successfully. Please verify your email and login",
      user: {
        id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email,
        phone: newSeller.phone,
        role: newSeller.role,
      },
    });
  } catch (error) {
    console.error("Seller registration error:", error);
    return res.status(500).json({ message: "Error registering seller" });
  }
}

export async function logoutUser(req, res) {
  try {
    // Clear the cookie named "token"
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Set to true in production (with HTTPS)
      sameSite: "lax", // Should match the cookie settings used in login
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// function to get the user profile

export async function getUserProfile(req, res) {
  try {
    const foundUser = await user.findById(req.user._id).select("-password");

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
      isEmailVerified: foundUser.isEmailVerified,
      createdAt: foundUser.createdAt,
    });
  } catch (error) {
   
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// function to update the user profile

export async function updateUserProfile(req, res) {

  try {
    const updatedUser = await user.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isEmailVerified: updatedUser.isEmailVerified,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

}

//function to add a product to the wishlist

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Optional: Log the incoming productId for debugging
    console.log("Received productId:", productId);

    const userId = req.user._id;

    // Optional: Log the authenticated user for debugging
    console.log("Authenticated user:", req.user);

    // Check if the product is already in the wishlist
    const isAlreadyInWishlist = req.user.wishlist.some(
      (id) => id.toString() === productId
    );

    let updatedUser;

    if (isAlreadyInWishlist) {
      // Remove the product from the wishlist
      updatedUser = await user.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Product removed from wishlist",
        wishlist: updatedUser.wishlist,
      });
    } else {
      // Add the product to the wishlist
      updatedUser = await user.findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: productId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Product added to wishlist",
        wishlist: updatedUser.wishlist,
      });
    }
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//function to get the wishlist


export const getWishlist = async (req, res) => {
  try {
    res.status(200).json({ wishlist: req.user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "error fetching wishlist" });
  }
}
