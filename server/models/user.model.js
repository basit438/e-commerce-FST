import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim: true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    password :{
        type : String,
        required : true
    },
    gender :{
        type : String,
    },
  phone :{
    type : Number,
    required : true,
    unique : true
  },
  role : {
    type : String,
    enum : ['buyer' , 'seller' , 'admin'],
    default : 'buyer'
  },
  wishlist :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'product'
  }],

  isEmailVerified :{
    type : Boolean,
    default : false
  }
}, {timestamps : true}
);

export const user =  mongoose.model('user' , userSchema);