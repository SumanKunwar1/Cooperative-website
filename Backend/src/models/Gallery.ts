import mongoose from 'mongoose';

export interface IMediaItem {
  _id?: mongoose.Types.ObjectId; // Add this line
  public_id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: string;
  uploadedAt: Date;
}

export interface IEvent extends mongoose.Document {
  name: string;
  description: string;
  date: Date;
  media: IMediaItem[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  media: [MediaItemSchema],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model<IEvent>('Event', EventSchema);