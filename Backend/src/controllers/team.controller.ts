import { Request, Response } from 'express';
import TeamMember from '../models/Team';
import { uploadToCloudinary } from '../utils/cloudinary';

// Get all team members (for public view)
export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const teamMembers = await TeamMember.find().sort({ position: 1, name: 1 });
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error });
  }
};

// Get all team members for admin
export const getAllTeamMembersAdmin = async (req: Request, res: Response) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error });
  }
};

// Get team member by ID
export const getTeamMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.status(200).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error });
  }
};

// Create new team member
export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, position, bio, email, phone, joinDate } = req.body;
    
    let imageUrl = '';
    
    // Handle image upload if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
    }
    
    const teamMember = new TeamMember({
      name,
      position,
      bio,
      email,
      phone,
      joinDate,
      image: imageUrl
    });
    
    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error });
  }
};

// Update team member
export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, position, bio, email, phone, joinDate } = req.body;
    
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    // Handle image upload if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      teamMember.image = result.secure_url;
    }
    
    teamMember.name = name;
    teamMember.position = position;
    teamMember.bio = bio;
    teamMember.email = email || '';
    teamMember.phone = phone || '';
    teamMember.joinDate = joinDate || '';
    
    await teamMember.save();
    res.status(200).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member', error });
  }
};

// Delete team member
export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const teamMember = await TeamMember.findByIdAndDelete(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error });
  }
};

// Get statistics
export const getTeamStatistics = async (req: Request, res: Response) => {
  try {
    const totalMembers = await TeamMember.countDocuments();
    const executivePositions = await TeamMember.countDocuments({ 
      position: { $in: ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer'] } 
    });
    const generalMembers = await TeamMember.countDocuments({ position: 'Member' });
    
    res.status(200).json({
      totalMembers,
      executivePositions,
      generalMembers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team statistics', error });
  }
};