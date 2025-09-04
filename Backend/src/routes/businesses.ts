import express from 'express';
import {
  getBusinesses,
  getAdminBusinesses,
  getBusinessById,
  getBusinessByName,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  searchBusinesses
} from '../controllers/business.controller';

const router = express.Router();

// Public routes
router.get('/directory', getBusinesses);
router.get('/directory/:businessName', getBusinessByName);
router.get('/search', searchBusinesses);

// Admin routes (no auth for now as requested)
router.get('/admin', getAdminBusinesses);
router.get('/:id', getBusinessById);
router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;