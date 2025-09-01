import { Request, Response } from 'express';
import LoanApplication, { ILoanApplication } from '../models/LoanApplication';
import { uploadToCloudinary } from '../utils/cloudinary';

// Get all loan applications
export const getLoanApplications = async (req: Request, res: Response) => {
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
    
    const applications = await LoanApplication.find(filter).sort({ submittedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications', error });
  }
};

// Get single loan application
export const getLoanApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await LoanApplication.findById(id);
    
    if (!application) {
      return res.status(404).json({ message: 'Loan application not found' });
    }
    
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan application', error });
  }
};

// Create new loan application
export const createLoanApplication = async (req: Request, res: Response) => {
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
    
    const newApplication = new LoanApplication(applicationData);
    const savedApplication = await newApplication.save();
    
    res.status(201).json({
      message: 'Loan application submitted successfully',
      application: savedApplication
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan application', error });
  }
};

// Update loan application status
export const updateLoanApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'under-review', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const updatedApplication = await LoanApplication.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Loan application not found' });
    }
    
    res.status(200).json({
      message: 'Loan application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan application status', error });
  }
};

// Delete loan application
export const deleteLoanApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApplication = await LoanApplication.findByIdAndDelete(id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Loan application not found' });
    }
    
    res.status(200).json({ message: 'Loan application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan application', error });
  }
};