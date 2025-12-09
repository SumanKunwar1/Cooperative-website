import express from 'express';
import {
  getLoanApplications,
  getLoanApplication,
  createLoanApplication,
  updateLoanApplicationStatus,
  deleteLoanApplication
} from '../controllers/loanApplication.controller';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public route for submitting loan applications
router.post('/', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'citizenshipFront', maxCount: 1 },
  { name: 'citizenshipBack', maxCount: 1 },
  { name: 'incomeProof', maxCount: 1 }
]), createLoanApplication);

// Admin routes (no authentication for college project)
router.get('/', getLoanApplications);
router.get('/:id', getLoanApplication);
router.patch('/:id/status', updateLoanApplicationStatus);
router.delete('/:id', deleteLoanApplication);

export default router;