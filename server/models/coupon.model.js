import mongoose from 'mongoose';
const couponSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim: true
    },
    code :{
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    discount :{
        type : Number,
        required : true
    },
    minAmount :{
        type : Number,
        required : true
    },
    maxAmount :{
        type : Number
    },
    expirationDate :{
        type : Date,
        default : Date.now + 30 * 24 * 60 * 60 * 1000
    },
    maxUses :{
        type : Number
    },
    uses :{
        type : Number,
        default : 0
    }
}, {timestamps : true});

export const Coupon = mongoose.model('coupon', couponSchema);
