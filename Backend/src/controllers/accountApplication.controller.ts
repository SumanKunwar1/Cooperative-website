import { Request, Response } from 'express';
import AccountApplication, { IAccountApplication } from '../models/AccountApplication';
import { uploadToCloudinary } from '../utils/cloudinary';

// Get all account applications
export const getAccountApplications = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    
    let filter: any = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { primaryPhone: searchRegex }
      ];
    }
    
    const applications = await AccountApplication.find(filter).sort({ submittedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

// Get single account application
export const getAccountApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await AccountApplication.findById(id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error });
  }
};

// Create new account application
export const createAccountApplication = async (req: Request, res: Response) => {
  try {
    const applicationData = req.body;
    
    // Handle file uploads if any files were uploaded
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      for (const field in files) {
        if (files[field][0]) {
          const result = await uploadToCloudinary(files[field][0]);
          applicationData[field] = result.secure_url;
        }
      }
    }
    
    const newApplication = new AccountApplication(applicationData);
    const savedApplication = await newApplication.save();
    
    res.status(201).json({
      message: 'Application submitted successfully',
      application: savedApplication
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
};

// Update account application status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'under-review', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const updatedApplication = await AccountApplication.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json({
      message: 'Application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error });
  }
};

// Delete account application
export const deleteAccountApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApplication = await AccountApplication.findByIdAndDelete(id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error });
  }
};