import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import dbConnect from './db/dbconnect.db.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import cartRouter from './routes/cartRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = {
    origin: true,
        // process.env.NODE_ENV === "production"
        //     ? "https://yourdomain.com"
        //     : "http://localhost:5057",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

await dbConnect();

app.use("/api/v1/product" , productRouter);
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/cart" , cartRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});