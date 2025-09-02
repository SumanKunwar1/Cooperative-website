import express from 'express';
import {
  getAllShareholders,
  getShareholderById,
  createShareholder,
  updateShareholder,
  deleteShareholder,
  getStatistics
} from '../controllers/shareholder.controller';
import {upload} from '../middleware/upload';

const router = express.Router();

// Get all shareholders
router.get('/', getAllShareholders);

// Get statistics
router.get('/statistics',  getStatistics);

// Get shareholder by ID
router.get('/:id',   getShareholderById);

// Create new shareholder
router.post('/',   upload.single('picture'), createShareholder);

// Update shareholder
router.put('/:id',  upload.single('picture'), updateShareholder);

// Delete shareholder
router.delete('/:id',  deleteShareholder);

export default router;