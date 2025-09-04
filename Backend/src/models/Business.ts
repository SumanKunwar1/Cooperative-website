import mongoose, { Document, Schema } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  businessName?: string;
  category: string;
  subcategory: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  services: string[];
  pricing?: Map<string, string>;
  openingHours?: Map<string, string>;
  isVerified: boolean;
  owner: string;
  status: 'active' | 'inactive' | 'pending';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const businessSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  services: [{
    type: String
  }],
  pricing: {
    type: Map,
    of: String
  },
  openingHours: {
    type: Map,
    of: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  owner: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  createdBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Create a text index for search functionality
businessSchema.index({
  name: 'text',
  description: 'text',
  'services': 'text',
  category: 'text',
  subcategory: 'text',
  location: 'text'
});

export default mongoose.model<IBusiness>('Business', businessSchema);