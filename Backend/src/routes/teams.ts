import express from 'express';
import {
  getAllTeamMembers,
  getAllTeamMembersAdmin,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamStatistics,
  getTeamMembersByCommittee
} from '../controllers/team.controller';
import {upload} from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/public', getAllTeamMembers);
router.get('/public/:id', getTeamMemberById);
router.get('/public/committee/:committeeType', getTeamMembersByCommittee);

// Admin routes
router.get('/', getAllTeamMembersAdmin);
router.get('/committee/:committeeType', getTeamMembersByCommittee);
router.get('/:id', getTeamMemberById);
router.post('/', upload.single('image'), createTeamMember);
router.put('/:id', upload.single('image'), updateTeamMember);
router.delete('/:id', deleteTeamMember);
router.get('/statistics/team-stats', getTeamStatistics);

export default router;