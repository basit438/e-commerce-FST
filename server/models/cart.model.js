import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity :{
        type : Number,
        required : true,
        default : 1,
        min : [1, 'Quantity cannot be less than 1']
    },
});
// to get whose cart it is

const cartSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    // to get the items in the cart
    items : [cartItemSchema],
    // to get the total price of the cart
    totalPrice :{
        type : Number,
        default : 0
    }
}, {timestamps : true});

 export const Cart = mongoose.model('cart', cartSchema);