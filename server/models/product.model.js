import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
      value :String
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
  images : {
    type : String,
    required : true
  },
  addedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true
  }
},
{timestamps : true})

export default mongoose.model("product" , productSchema)