import { Cart } from '../models/cart.model.js';
import { user } from '../models/user.model.js';
import { product } from '../models/product.model.js';


// function to add product to cart
export async function addToCart(req, res) {
try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // check if the user already has the product in their cart
    let cart = await Cart.findOne({ user: userId });

    // if the user does not have a cart, create a new cart
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    // check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
        // if the product is already in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // if the product is not in the cart, add the product to the cart
        cart.items.push({ product: productId, quantity });
    }

    // find the product to get the price
    let totalPrice = 0;
    const productToAdd = await product.findById(productId);
    const price = productToAdd.price;

    // calculate the total price of the cart

    cart.items.forEach(item => {
        totalPrice += item.quantity * price;
    });

    cart.totalPrice = totalPrice;


    

    // save the updated cart
    await cart.save();
//populate the cart with the product and user

 await cart.populate("items.product");

    res.status(200).json({ cart });
} catch (error) {
    
}
};

// function to get all products in the cart
export async function getCart(req, res) {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) {
            return res.status(200).json({ cart : { items: [], totalPrice: 0 } });

        }
        return res.status(200).json({ cart });
    } catch (error) {
        
    }
};


// function to update the cart

export async function updateCart(req, res) {

};

// function to delete a product from the cart
export async function deleteFromCart(req, res) {
    
}