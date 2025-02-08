import mongoose from 'mongoose';
import {product} from '../models/product.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'

// function to get all products
export async function getProducts(req, res) {

    try {
        const products = await product.find();
    
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
    
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: "error fetching products" });
    }

}

// function to get a single product

export async function getProduct(req, res) {
    try {
      const keyword = req.params.id;
      console.log("Received product keyword:", keyword);
  
      // Check if product id is provided
      if (!keyword) {
        console.log("No product id provided in the request.");
        return res.status(404).json({ message: "Provide a product id" });
      }
  
      let productToFind;
  
      // Determine whether to search by ObjectId or by uid
      if (mongoose.Types.ObjectId.isValid(keyword)) {
        console.log("Keyword is a valid ObjectId. Searching using findById.");
        productToFind = await product.findById(keyword);
      } else {
        console.log("Keyword is not a valid ObjectId. Searching using findOne with uid.");
        productToFind = await product.findOne({ uid: keyword });
      }
  
      console.log("Result from database:", productToFind);
  
      if (!productToFind) {
        console.log("No product found for keyword:", keyword);
        return res.status(404).json({ message: "Product not found" });
      }
  
      console.log("Product found successfully. Returning product.");
      return res.status(200).json({ product: productToFind });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "error fetching product", error: error });
    }
  }


//function to add a product

export async function addProduct(req, res) {

   try {
    
     const imgObj = await uploadToCloudinary(req.file);
     const {name , brand , category , price , description , inStock , inventory } = req.body;
       const addedBy = req.user ? req.user.id : null;
       console.log(req.user);
 
     const productToAdd = new product({
         name,
         brand,
         category,
         price,
         description,
         inStock,
         inventory,
         addedBy ,
         image : imgObj.secure_url,
     })

     console.log(productToAdd);
     await productToAdd.save();

     res.status(200).json({ message: "Product added successfully" });

   } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error adding product" });
   }
   
}