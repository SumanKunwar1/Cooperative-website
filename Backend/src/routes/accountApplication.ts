import express from 'express';
import {
  getAccountApplications,
  getAccountApplication,
  createAccountApplication,
  updateApplicationStatus,
  deleteAccountApplication
} from '../controllers/accountApplication.controller';
import { protect } from '../middleware/auth';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public route for submitting applications
router.post('/', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'citizenshipFront', maxCount: 1 },
  { name: 'citizenshipBack', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'incomeProof', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
  { name: 'nomineePhoto', maxCount: 1 }
]), createAccountApplication);

// Admin routes
router.get('/', protect, getAccountApplications);
router.get('/:id', protect, getAccountApplication);
router.patch('/:id/status', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteAccountApplication);

export default router;