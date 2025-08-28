import { upload } from '../config/cloudinary';
import { Request, Response, NextFunction } from 'express';

const handleUpload = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.'
          });
        }
        if (err.message.includes('Invalid file type')) {
          return res.status(400).json({
            success: false,
            message: 'Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'File upload failed'
        });
      }
      next();
    });
  };
};

const handleMultipleUpload = (fieldName: string, maxCount: number = 5) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.array(fieldName, maxCount)(req, res, (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.'
          });
        }
        if (err.message.includes('Invalid file type')) {
          return res.status(400).json({
            success: false,
            message: 'Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'File upload failed'
        });
      }
      next();
    });
  };
};

export { handleUpload, handleMultipleUpload };