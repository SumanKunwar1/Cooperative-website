import { Request, Response } from 'express';
import Business, { IBusiness } from '../models/Business';

interface SearchQuery {
  q?: string;
  category?: string;
  location?: string;
  page?: string;
  limit?: string;
}

// Get all businesses for directory
export const getBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await Business.find({ status: 'active' })
      .select('-email -phone -address -owner -createdBy')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: businesses
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get all businesses for admin
export const getAdminBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: businesses
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get business by ID
export const getBusinessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      res.status(404).json({
        success: false,
        message: 'Business not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get business by name/slug for public directory
export const getBusinessByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const businessName = req.params.businessName;
    
    // Create a regex to match the business name (case insensitive)
    const nameRegex = new RegExp(businessName.replace(/-/g, ' '), 'i');
    
    const business = await Business.findOne({
      $or: [
        { name: nameRegex },
        { businessName: nameRegex }
      ],
      status: 'active'
    });
    
    if (!business) {
      res.status(404).json({
        success: false,
        message: 'Business not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new business
export const createBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = new Business(req.body);
    const savedBusiness = await business.save();
    
    res.status(201).json({
      success: true,
      data: savedBusiness
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update business
export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!business) {
      res.status(404).json({
        success: false,
        message: 'Business not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete business
export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    
    if (!business) {
      res.status(404).json({
        success: false,
        message: 'Business not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Search businesses
export const searchBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, category, location, page = '1', limit = '15' } = req.query as SearchQuery;
    
    let query: any = { status: 'active' };
    
    // Text search
    if (q) {
      query.$text = { $search: q };
    }
    
    // Category filter
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    
    // Location filter
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const businesses = await Business.find(query)
      .select('-email -phone -address -owner -createdBy')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const total = await Business.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        docs: businesses,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};