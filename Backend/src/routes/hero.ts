import express from 'express';
import {
  getActiveHeroContent,
  getAllHeroContent,
  getHeroContentById,
  createHeroContent,
  updateHeroContent,
  uploadHeroMedia,
  deleteHeroMedia,
  deleteHeroContent
} from '../controllers/hero.controller';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public route
router.get('/public/active', getActiveHeroContent);

// Admin routes
router.get('/',  getAllHeroContent);
router.get('/:id',  getHeroContentById);
router.post('/',  createHeroContent);
router.put('/:id',  updateHeroContent);
router.post('/:id/media',  upload.single('media'), uploadHeroMedia);
router.delete('/:id/media/:mediaIndex',  deleteHeroMedia);
router.delete('/:id',  deleteHeroContent);

export default router;