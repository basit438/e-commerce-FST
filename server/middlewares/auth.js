import jwt from "jsonwebtoken";
import { user as User } from "../models/user.model.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    console.log("ProtectRoute middleware called");
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
      console.log("No token found in request cookies");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const foundUser = await User.findById(decoded.id);
    console.log("User found from token:", foundUser);

    if (!foundUser) {
      console.log("No user found for id:", decoded.id);
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = foundUser;
    console.log("User authenticated, proceeding to next middleware");
    next();
  } catch (error) {
    console.error("Error in ProtectRoute middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
