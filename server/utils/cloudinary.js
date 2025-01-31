import {v2 as cloudinary} from 'cloudinary'
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadToCloudinary(file){
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: "products"},
            (error, result) =>{
                if(error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(file.buffer);
    });
    console.log(result);
    return result;
}