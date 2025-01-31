import mongoose from "mongoose";
import {nanoid} from "nanoid"
const productSchema = new mongoose.Schema({
  uid :{
    type : String,
    default : () => nanoid()
  },
    name :{
        type : String,
        required : true
    },
    brand :
    {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    description :{
        type : String,
        required : true
    },
  attributes :[{
      name :String,
      value :String,
      keywords: []
  }],
  inStock :{
    type : Boolean,
    default : true
  },
  inventory : {
    type : Number,
    default : 0
  },
  ratings : [
    {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    }
  ],
  totalRatings : {
    type : Number,
    default : 0
  },
  image : {
    type : String,
    required : true
  },
  addedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  }
},
{timestamps : true})

export const product =  mongoose.model("product" , productSchema)

