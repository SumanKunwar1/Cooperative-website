import express from 'express';
import {
  getLoanApplications,
  getLoanApplication,
  createLoanApplication,
  updateLoanApplicationStatus,
  deleteLoanApplication
} from '../controllers/loanApplication.controller';
import { protect } from '../middleware/auth';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public route for submitting loan applications
router.post('/', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'citizenshipFront', maxCount: 1 },
  { name: 'citizenshipBack', maxCount: 1 },
  { name: 'incomeProof', maxCount: 1 }
]), createLoanApplication);

// Admin routes
router.get('/', protect, getLoanApplications);
router.get('/:id', protect, getLoanApplication);
router.patch('/:id/status', protect, updateLoanApplicationStatus);
router.delete('/:id', protect, deleteLoanApplication);

export default router;