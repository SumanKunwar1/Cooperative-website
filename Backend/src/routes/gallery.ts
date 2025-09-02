import express from 'express';
import {
  getAllEvents,
  getPublishedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadMedia,
  deleteMedia,
  getEvent
} from '../controllers/gallery.controller';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/public', getPublishedEvents);
router.get('/:id', getEvent); // Public can view individual events if published

// Admin routes - no authentication needed for your project
router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/media', upload.single('media'), uploadMedia);
router.delete('/:eventId/media/:mediaId', deleteMedia);

export default router;