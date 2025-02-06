import express from "express";
import { getProducts , getProduct, addProduct} from "../controllers/Products.js";
import upload from "../middlewares/multer.js";
import { ProtectRoute } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/get" , getProducts); 
productRouter.get("/get/:id" , getProduct);
productRouter.post("/add" , ProtectRoute , upload.single("image") , addProduct);

export default productRouter

