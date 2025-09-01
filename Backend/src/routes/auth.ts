import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';

const router = express.Router();

// Generate JWT token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = (process.env.JWT_EXPIRE || '7d') as jwt.SignOptions['expiresIn'];

  const options: jwt.SignOptions = {
    expiresIn,
  };

  return jwt.sign({ id }, secret, options);
};

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { businessName, email, phone, password, membershipType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      businessName,
      email,
      phone,
      password,
      membershipType
    });

    await user.save();

    // Generate token - Fix: Properly handle ObjectId
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    const token = generateToken(userId);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        businessName: user.businessName,
        email: user.email,
        phone: user.phone,
        membershipType: user.membershipType,
        joinedDate: user.joinedDate
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password, userType } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user type matches
    if (user.membershipType !== userType) {
      return res.status(400).json({
        message: `This account is registered as ${user.membershipType}, not ${userType}`
      });
    }

    // Generate token - Fix: Properly handle ObjectId
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    const token = generateToken(userId);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      token,
      user: {
        id: userId,
        businessName: user.businessName,
        email: user.email,
        phone: user.phone,
        membershipType: user.membershipType,
        joinedDate: user.joinedDate
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
