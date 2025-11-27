import { Request, Response } from 'express';
import HeroContent from '../models/HeroSection';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

// Get active hero content (for public view)
export const getActiveHeroContent = async (req: Request, res: Response) => {
  try {
    const heroContent = await HeroContent.findOne({ isActive: true });
    
    if (!heroContent) {
      return res.status(404).json({ message: 'No active hero content found' });
    }
    
    res.status(200).json(heroContent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero content', error });
  }
};

// Get all hero content versions (for admin)
export const getAllHeroContent = async (req: Request, res: Response) => {
  try {
    const heroContents = await HeroContent.find().sort({ createdAt: -1 });
    res.status(200).json(heroContents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero content', error });
  }
};

// Get hero content by ID
export const getHeroContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const heroContent = await HeroContent.findById(id);
    
    if (!heroContent) {
      return res.status(404).json({ message: 'Hero content not found' });
    }
    
    res.status(200).json(heroContent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero content', error });
  }
};

// Create new hero content
export const createHeroContent = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;

    // If setting as active, deactivate all others
    if (isActive) {
      await HeroContent.updateMany({}, { isActive: false });
    }

    const heroContent = new HeroContent({
      backgroundMedia: [],
      currentMediaIndex: 0,
      isActive: isActive || false,
    });

    await heroContent.save();
    res.status(201).json(heroContent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating hero content', error });
  }
};

// Update hero content
export const updateHeroContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive, currentMediaIndex } = req.body;

    const heroContent = await HeroContent.findById(id);
    if (!heroContent) {
      return res.status(404).json({ message: 'Hero content not found' });
    }

    // If setting as active, deactivate all others
    if (isActive) {
      await HeroContent.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    if (isActive !== undefined) heroContent.isActive = isActive;
    if (currentMediaIndex !== undefined) heroContent.currentMediaIndex = currentMediaIndex;

    await heroContent.save();
    res.status(200).json(heroContent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hero content', error });
  }
};

// Upload media to hero content
export const uploadHeroMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const heroContent = await HeroContent.findById(id);
    if (!heroContent) {
      return res.status(404).json({ message: 'Hero content not found' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file);
    
    const mediaItem = {
      type: req.file.mimetype.startsWith('video/') ? 'video' as const : 'image' as const,
      url: result.secure_url,
      alt: req.file.originalname,
      public_id: result.public_id
    };

    heroContent.backgroundMedia.push(mediaItem);
    await heroContent.save();

    res.status(201).json(mediaItem);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading media', error });
  }
};

// Delete media from hero content
export const deleteHeroMedia = async (req: Request, res: Response) => {
  try {
    const { id, mediaIndex } = req.params;
    const index = parseInt(mediaIndex);

    const heroContent = await HeroContent.findById(id);
    if (!heroContent) {
      return res.status(404).json({ message: 'Hero content not found' });
    }

    if (index < 0 || index >= heroContent.backgroundMedia.length) {
      return res.status(400).json({ message: 'Invalid media index' });
    }

    const mediaToRemove = heroContent.backgroundMedia[index];
    
    // Delete from Cloudinary if public_id exists
    if (mediaToRemove.public_id) {
      try {
        await deleteFromCloudinary(mediaToRemove.public_id);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }

    // Remove from array
    heroContent.backgroundMedia.splice(index, 1);
    
    // Adjust current media index if needed
    if (heroContent.currentMediaIndex >= index) {
      heroContent.currentMediaIndex = Math.max(0, heroContent.currentMediaIndex - 1);
    }

    await heroContent.save();
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting media', error });
  }
};

// Delete hero content
export const deleteHeroContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const heroContent = await HeroContent.findById(id);
    if (!heroContent) {
      return res.status(404).json({ message: 'Hero content not found' });
    }

    // Delete all media from Cloudinary
    for (const media of heroContent.backgroundMedia) {
      if (media.public_id) {
        try {
          await deleteFromCloudinary(media.public_id);
        } catch (error) {
          console.error('Error deleting from Cloudinary:', error);
        }
      }
    }

    await HeroContent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hero content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hero content', error });
  }
};