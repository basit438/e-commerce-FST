import mongoose from "mongoose";


const dbConnect = async () =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }catch(err)
    {
        console.log(err);
    }
} 

export default dbConnect