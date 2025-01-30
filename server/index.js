import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import dbConnect from './db/dbconnect.db.js';
import productRouter from './routes/productRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? "https://yourdomain.com"
            : "http://localhost:5057",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

await dbConnect();

app.use("/api/v1/products" , productRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});