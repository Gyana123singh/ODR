require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const videoPath = "D:\\ODR\\odr-landingpage\\public\\assets\\Video Project 3.mp4";

console.log("Uploading video to Cloudinary... This may take a while.");

cloudinary.uploader.upload_large(videoPath, { resource_type: "video" }, function(error, result) {
  if (error) {
    console.error("Error uploading:", error);
  } else {
    console.log("Success! Video URL:", result.secure_url);
  }
});
