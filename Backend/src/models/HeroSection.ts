import mongoose, { Document, Schema } from 'mongoose';

export interface IMediaItem {
  type: 'image' | 'video';
  url: string;
  alt: string;
  public_id?: string;
}

export interface IHeroContent extends Document {
  title: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  backgroundMedia: IMediaItem[];
  currentMediaIndex: number;
  searchPlaceholder: string;
  statistics: {
    businesses: { count: string; label: string };
    members: { count: string; label: string };
    services: { count: string; label: string };
    loans: { count: string; label: string };
  };
  ctaButtons: {
    primary: { text: string; action: string };
    secondary: { text: string; action: string };
  };
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
  title: {
    line1: {
      type: String,
      required: true,
      default: "Your journey to"
    },
    line2: {
      type: String,
      required: true,
      default: "financial prosperity"
    },
    line3: {
      type: String,
      required: true,
      default: "starts here"
    }
  },
  description: {
    type: String,
    required: true,
    default: "Connect with local businesses, discover financial services, and join a community that supports your economic growth and prosperity."
  },
  backgroundMedia: [MediaItemSchema],
  currentMediaIndex: {
    type: Number,
    default: 0
  },
  searchPlaceholder: {
    type: String,
    default: "Search businesses, services, opportunities..."
  },
  statistics: {
    businesses: {
      count: {
        type: String,
        default: "500+"
      },
      label: {
        type: String,
        default: "Businesses"
      }
    },
    members: {
      count: {
        type: String,
        default: "10K+"
      },
      label: {
        type: String,
        default: "Members"
      }
    },
    services: {
      count: {
        type: String,
        default: "50+"
      },
      label: {
        type: String,
        default: "Services"
      }
    },
    loans: {
      count: {
        type: String,
        default: "$2M+"
      },
      label: {
        type: String,
        default: "Loans Funded"
      }
    }
  },
  ctaButtons: {
    primary: {
      text: {
        type: String,
        default: "Join Our Community"
      },
      action: {
        type: String,
        default: "/join"
      }
    },
    secondary: {
      text: {
        type: String,
        default: "Explore Services"
      },
      action: {
        type: String,
        default: "/services"
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IHeroContent>('HeroContent', HeroContentSchema);