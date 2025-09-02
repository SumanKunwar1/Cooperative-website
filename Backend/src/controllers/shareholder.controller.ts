import { Request, Response } from 'express';
import Shareholder from '../models/Shareholder';
import { uploadToCloudinary } from '../utils/cloudinary';

// Get all shareholders
export const getAllShareholders = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { position: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const shareholders = await Shareholder.find(filter).sort({ createdAt: -1 });
    res.status(200).json(shareholders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shareholders', error });
  }
};

// Get shareholder by ID
export const getShareholderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shareholder = await Shareholder.findById(id);
    
    if (!shareholder) {
      return res.status(404).json({ message: 'Shareholder not found' });
    }
    
    res.status(200).json(shareholder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shareholder', error });
  }
};

// Create new shareholder
export const createShareholder = async (req: Request, res: Response) => {
  try {
    const { name, position, companyName, email, phoneNumber } = req.body;
    
    // Check if shareholder with same email already exists
    const existingShareholder = await Shareholder.findOne({ email });
    if (existingShareholder) {
      return res.status(400).json({ message: 'Shareholder with this email already exists' });
    }
    
    let pictureUrl = '';
    
    // Handle image upload if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      pictureUrl = result.secure_url;
    }
    
    const shareholder = new Shareholder({
      name,
      position,
      companyName,
      email,
      phoneNumber,
      picture: pictureUrl
    });
    
    await shareholder.save();
    res.status(201).json(shareholder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shareholder', error });
  }
};

// Update shareholder
export const updateShareholder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, position, companyName, email, phoneNumber } = req.body;
    
    const shareholder = await Shareholder.findById(id);
    if (!shareholder) {
      return res.status(404).json({ message: 'Shareholder not found' });
    }
    
    // Check if email is being changed to one that already exists
    if (email !== shareholder.email) {
      const existingShareholder = await Shareholder.findOne({ email });
      if (existingShareholder) {
        return res.status(400).json({ message: 'Shareholder with this email already exists' });
      }
    }
    
    // Handle image upload if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      shareholder.picture = result.secure_url;
    }
    
    shareholder.name = name;
    shareholder.position = position;
    shareholder.companyName = companyName;
    shareholder.email = email;
    shareholder.phoneNumber = phoneNumber;
    
    await shareholder.save();
    res.status(200).json(shareholder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shareholder', error });
  }
};

// Delete shareholder
export const deleteShareholder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const shareholder = await Shareholder.findByIdAndDelete(id);
    if (!shareholder) {
      return res.status(404).json({ message: 'Shareholder not found' });
    }
    
    res.status(200).json({ message: 'Shareholder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shareholder', error });
  }
};

// Get statistics
export const getStatistics = async (req: Request, res: Response) => {
  try {
    const totalShareholders = await Shareholder.countDocuments();
    const boardMembers = await Shareholder.countDocuments({ 
      position: { $in: ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer'] } 
    });
    const withEmail = await Shareholder.countDocuments({ email: { $exists: true, $ne: '' } });
    const withPhone = await Shareholder.countDocuments({ phoneNumber: { $exists: true, $ne: '' } });
    
    res.status(200).json({
      totalShareholders,
      boardMembers,
      withEmail,
      withPhone
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};