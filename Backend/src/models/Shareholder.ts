import mongoose, { Document, Schema } from 'mongoose';

export interface IShareholder extends Document {
  name: string;
  picture: string;
  position: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShareholderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    required: true,
    enum: ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer', 'Board Member']
  },
  companyName: {
    type: String,
    required: true,
    default: 'Constellation Saving & Credit Cooperative Ltd.'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IShareholder>('Shareholder', ShareholderSchema);