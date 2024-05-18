import { v2 as cloudinary } from "cloudinary";

import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
} from "../config/index.js";
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("No file buffer provided");
    }

    // Return a promise that resolves with the URL once the upload is complete
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Successful upload
            // console.log("File uploaded on Cloudinary:", result.url);
            resolve(result.url);
          }
        })
        .end(fileBuffer);
    });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};
export default uploadOnCloudinary;
