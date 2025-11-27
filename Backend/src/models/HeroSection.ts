import mongoose, { Document, Schema } from 'mongoose';

export interface IMediaItem {
  type: 'image' | 'video';
  url: string;
  alt: string;
  public_id?: string;
}

export interface IHeroContent extends Document {
  backgroundMedia: IMediaItem[];
  currentMediaIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema = new Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  public_id: {
    type: String
  }
});

const HeroContentSchema = new Schema({
  backgroundMedia: [MediaItemSchema],
  currentMediaIndex: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IHeroContent>('HeroContent', HeroContentSchema);