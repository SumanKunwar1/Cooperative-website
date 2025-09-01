import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcsgax3ld',
  api_key: process.env.CLOUDINARY_API_KEY || '174386493665845',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'AKTNvggeoy-ulrElZZ_3bu_t84c',
});

export const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'constellation/businesses',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};