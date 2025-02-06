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
        const keyword = req.params.id
        let productToFind;

        // check if product id is provided
        if(!keyword){
            return res.status(404).json({ message: "Provide a product id" });
        }

        //finding by mongoose id

        if(mongoose.Types.ObjectId.isValid(keyword)){
            productToFind = await product.findById(keyword);
        }else
        // finding by uid
        {
            productToFind = await product.findOne({uid : keyword});
        }

        if (!productToFind) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ product: productToFind });

     
    } catch (error) {
        return res.status(500).json({ message: "error fetching product" });
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