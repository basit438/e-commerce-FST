import express from "express";
import { user } from "../models/user.model.js";
import { verifyToken } from "../controllers/auth.js";
import { ProtectRoute } from "../middlewares/auth.js";
const authRouter = express.Router();

authRouter.post("/verifyToken", verifyToken);
authRouter.get("/check-auth", ProtectRoute, async (req, res) => {
  res.status(200).send({ user: req.user, isAuthenticated: true });
});

export default authRouter;
