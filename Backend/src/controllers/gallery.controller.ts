import { Request, Response } from 'express';
import Event, { IMediaItem } from '../models/Gallery';
import { uploadToCloudinary } from '../utils/cloudinary';

// Admin: Get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Public: Get only published events
export const getPublishedEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ isPublished: true }).sort({ date: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching published events', error });
  }
};

// Admin: Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, date } = req.body;
    
    const event = new Event({
      name,
      description,
      date,
      media: []
    });
    
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Admin: Update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, date, isPublished } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      id,
      { name, description, date, isPublished },
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Admin: Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// Admin: Upload media to an event
export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file);
    
    const mediaItem: IMediaItem = {
      public_id: result.public_id,
      url: result.secure_url,
      type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
      name: req.file.originalname,
      size: `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date()
    };
    
    event.media.push(mediaItem as any);
    await event.save();
    
    res.status(201).json(mediaItem);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading media', error });
  }
};

// Admin: Delete media from an event
export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const { eventId, mediaId } = req.params;
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Fix: Use type assertion to access _id
    const mediaItem = event.media.find(item => (item as any)._id?.toString() === mediaId);
    
    if (!mediaItem) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Remove from array using filter
    event.media = event.media.filter(item => (item as any)._id?.toString() !== mediaId);
    await event.save();
    
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting media', error });
  }
};

// Get single event (for both admin and public)
export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // For your project, we'll just check if the event is published
    // No user authentication needed
    if (!event.isPublished) {
      return res.status(403).json({ message: 'This event is not published yet' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};