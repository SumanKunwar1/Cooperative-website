import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IValue {
  title: string;
  description: string;
  icon: string;
  images: string[];
}

export interface IMilestone {
  year: string;
  event: string;
  icon: string;
  images: string[];
}

export interface IStat {
  label: string;
  value: string;
  description: string;
}

export interface ICompanyInfo {
  establishedDate: string;
  location: string;
  registrationNumber: string;
  officeLocationLabel: string;
  officeAddress: string;
  mission: string;
  vision: string;
}

export interface IStorySection {
  title: string;
  paragraphs: string[];
  contactInfo: {
    title: string;
    address1: string;
    address2: string;
    registration: string;
    ministryName: string;
  };
  images: string[];
}

export interface ICommunityImpact {
  title: string;
  description: string;
  metrics: string;
  images: string[];
}

export interface IAbout extends Document {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  companyInfo: ICompanyInfo;
  
  // Stats
  stats: IStat[];
  
  // Story
  story: IStorySection;
  
  // Mission, Vision, Purposes
  mission: string;
  vision: string;
  purposes: string[];
  
  // Values
  values: IValue[];
  
  // Journey Timeline
  milestones: IMilestone[];
  
  // Community Impact
  communityImpacts: ICommunityImpact[];
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  
  // Last updated
  updatedAt: Date;
}

// Define the schema
const ValueSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  images: [{ type: String }]
});

const MilestoneSchema: Schema = new Schema({
  year: { type: String, required: true },
  event: { type: String, required: true },
  icon: { type: String, required: true },
  images: [{ type: String }]
});

const StatSchema: Schema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true }
});

const CompanyInfoSchema: Schema = new Schema({
  establishedDate: { type: String, required: true },
  location: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  officeLocationLabel: { type: String, required: true },
  officeAddress: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true }
});

const ContactInfoSchema: Schema = new Schema({
  title: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  registration: { type: String, required: true },
  ministryName: { type: String, required: true }
});

const StorySectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  paragraphs: [{ type: String, required: true }],
  contactInfo: { type: ContactInfoSchema, required: true },
  images: [{ type: String }]
});

const CommunityImpactSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  metrics: { type: String, required: true },
  images: [{ type: String }]
});

const AboutSchema: Schema = new Schema({
  // Hero Section
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  companyInfo: { type: CompanyInfoSchema, required: true },
  
  // Stats
  stats: [{ type: StatSchema, required: true }],
  
  // Story
  story: { type: StorySectionSchema, required: true },
  
  // Mission, Vision, Purposes
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  purposes: [{ type: String, required: true }],
  
  // Values
  values: [{ type: ValueSchema, required: true }],
  
  // Journey Timeline
  milestones: [{ type: MilestoneSchema, required: true }],
  
  // Community Impact
  communityImpacts: [{ type: CommunityImpactSchema, required: true }],
  
  // SEO
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
  
  // Last updated
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Define static methods interface
interface IAboutModel extends Model<IAbout> {
  getAbout(): Promise<IAbout>;
}

// Create the model
const About = mongoose.model<IAbout, IAboutModel>('About', AboutSchema);

// Define the static method
About.getAbout = async function() {
  let about = await this.findOne();
  if (!about) {
    // Create default about document
    about = await this.create({
      heroTitle: "About Constellation Cooperative",
      heroSubtitle: "Empowering communities through cooperative banking since 2010",
      companyInfo: {
        establishedDate: "12th May 2010",
        location: "Kathmandu, Nepal",
        registrationNumber: "3163/066/067",
        officeLocationLabel: "Head Office Location",
        officeAddress: "6th Floor, Civil Trade Centre (CTC Mall), Sundhara, Kathmandu",
        mission: "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
        vision: "To be the leading cooperative institution fostering economic growth and social development in Nepal."
      },
      stats: [
        { label: "Years of Service", value: "15+", description: "Serving since 2010" },
        { label: "Registration No.", value: "3163/066/067", description: "Registered under Department of Cooperatives" },
        { label: "Experience", value: "20+", description: "Years of combined experience" },
        { label: "Committee Term", value: "2081-2086", description: "Current committee term" }
      ],
      story: {
        title: "Our Story Since 2010",
        paragraphs: [
          "Founded in 2010, Constellation Saving and Credit Cooperative Limited began with a vision to create a vibrant business community where members could grow together through mutual support and cooperative principles.",
          "Over the years, we've grown from a small group of visionary individuals to a trusted financial institution serving thousands of members across the community.",
          "Our journey is marked by continuous innovation, member-centric services, and a commitment to financial inclusion and empowerment."
        ],
        contactInfo: {
          title: "Contact Information",
          address1: "6th Floor, Civil Trade Centre (CTC Mall)",
          address2: "Sundhara, Kathmandu Metropolitan City Ward No. 22",
          registration: "Registration No: 3163/066/067",
          ministryName: "Ministry of Land Management, Cooperatives and Poverty Alleviation"
        },
        images: []
      },
      mission: "To create a vibrant business community where together, everyone can achieve more through cooperative principles and mutual support.",
      vision: "To be the leading cooperative institution fostering economic growth and social development in Nepal.",
      purposes: [
        "To promote savings habits among members",
        "To provide credit facilities to members",
        "To promote cooperative principles and values",
        "To enhance financial literacy in the community",
        "To support entrepreneurship and business development",
        "To foster economic empowerment",
        "To build strong community relationships",
        "To ensure sustainable growth and development"
      ],
      values: [
        {
          title: "Integrity",
          description: "We conduct our business with honesty, transparency, and ethical practices.",
          icon: "🤝",
          images: []
        },
        {
          title: "Community Focus",
          description: "We prioritize the needs and development of our community members.",
          icon: "🏘️",
          images: []
        },
        {
          title: "Innovation",
          description: "We embrace new technologies and methods to better serve our members.",
          icon: "💡",
          images: []
        },
        {
          title: "Excellence",
          description: "We strive for excellence in all our services and operations.",
          icon: "⭐",
          images: []
        }
      ],
      milestones: [
        { year: "2010", event: "Cooperative established with 50 founding members", icon: "building", images: [] },
        { year: "2010", event: "First general assembly and committee formation", icon: "users", images: [] },
        { year: "2015", event: "Expanded services and reached 1000+ members", icon: "trending-up", images: [] },
        { year: "2020", event: "Launched digital banking services", icon: "globe", images: [] },
        { year: "2024", event: "Celebrated 14 years of service", icon: "calendar", images: [] },
        { year: "2025", event: "Awarded for excellence in cooperative banking", icon: "award", images: [] }
      ],
      communityImpacts: [
        {
          title: "Financial Literacy",
          description: "Conducted workshops reaching 500+ community members on financial management",
          metrics: "500+ participants trained",
          images: []
        },
        {
          title: "Business Development",
          description: "Supported 200+ small businesses through microfinance and training",
          metrics: "200+ businesses supported",
          images: []
        },
        {
          title: "Cultural Programs",
          description: "Organized community cultural events and festivals",
          metrics: "10+ annual events",
          images: []
        }
      ],
      seoTitle: "About Us - Constellation Saving and Credit Cooperative Limited",
      seoDescription: "Learn about our journey since 2010, serving the community through cooperative banking services. Discover our mission of shared growth and financial empowerment."
    });
  }
  return about;
};

export default About;