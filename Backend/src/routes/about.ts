import express from 'express';
import {
  getAbout,
  updateAbout,
  updateSection,
  addValue,
  updateValue,
  deleteValue,
  addMilestone,
  updateMilestone,
  deleteMilestone,
  addCommunityImpact,
  updateCommunityImpact,
  deleteCommunityImpact,
  uploadImage,
  removeImage
} from '../controllers/about.controller';

const router = express.Router();

// Get about page data
router.get('/', getAbout);

// Update entire about page
router.put('/', updateAbout);

// Update specific section
router.put('/section/:section', updateSection);

// Value operations
router.post('/values', addValue);
router.put('/values/:id', updateValue);
router.delete('/values/:id', deleteValue);

// Milestone operations
router.post('/milestones', addMilestone);
router.put('/milestones/:id', updateMilestone);
router.delete('/milestones/:id', deleteMilestone);

// Community impact operations
router.post('/impacts', addCommunityImpact);
router.put('/impacts/:id', updateCommunityImpact);
router.delete('/impacts/:id', deleteCommunityImpact);

// Image operations
router.post('/images/:section/:id?', uploadImage);
router.delete('/images/:section/:id?/:imageIndex', removeImage);

export default router;