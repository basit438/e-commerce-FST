import jwt from "jsonwebtoken";
import { user as User } from "../models/user.model.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //check if token has expired

    if (Date.now() > decoded.exp * 1000) {
      return res
        .status(401)
        .json({ message: "token has expired please login again" });
    }

    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = foundUser;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
