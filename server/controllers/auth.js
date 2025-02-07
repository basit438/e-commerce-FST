// auth.controller.js
import { user } from "../models/user.model.js"; // Ensure your user model is correctly imported
import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, res) => {
  console.log("===> verifyToken endpoint hit");

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update the user's isVerified field to true based on the email in the token payload.
    const existingUser = await user.findOneAndUpdate(
      { email: decoded.email },
      { isEmailVerified: true },
      { new: true }
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
