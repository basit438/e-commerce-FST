import express from "express";
import { getProducts } from "../controllers/getProducts.js";

const productRouter = express.Router();

productRouter.get("/get" , getProducts); 

export default productRouter

