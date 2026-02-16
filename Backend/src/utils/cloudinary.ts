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
    // Detect if file is a video
    const isVideo = file.mimetype.startsWith('video/');
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'constellation/businesses',
        resource_type: isVideo ? 'video' : 'image', // Handle both images and videos
        chunk_size: isVideo ? 6000000 : undefined, // Use chunked upload for videos
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

// Add the missing deleteFromCloudinary function
export const deleteFromCloudinary = (publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};