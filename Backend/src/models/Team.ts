import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
  joinDate?: string;
  committeeType: string;
  committeeRole?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  joinDate: {
    type: String
  },
  committeeType: {
    type: String,
    required: true,
    enum: ['working', 'executive', 'audit', 'accounting', 'credit'],
    default: 'working'
  },
  committeeRole: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);