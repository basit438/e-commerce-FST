import express from "express";
import { getProducts , getProduct, addProduct} from "../controllers/Products.js";
import upload from "../middlewares/multer.js";

const productRouter = express.Router();

productRouter.get("/get" , getProducts); 
productRouter.get("/get/:id" , getProduct);
productRouter.post("/add" ,upload.single("image") , addProduct);

export default productRouter

