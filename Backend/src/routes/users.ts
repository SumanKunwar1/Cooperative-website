import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Get all users (for admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, type } = req.query;
    
    let filter: any = {};
    
    if (search) {
      filter.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type && type !== 'all') {
      filter.membershipType = type;
    }
    
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      users
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;