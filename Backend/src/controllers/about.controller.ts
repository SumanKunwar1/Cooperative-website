import { Request, Response, NextFunction } from 'express';
import About from '../models/About.model';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

// Helper function to get or create about document
const getAboutDocument = async () => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
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

// Get about page data
export const getAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const about = await getAboutDocument();
    
    res.status(200).json(
      ApiResponse.success('About page data retrieved successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

// Update about page data
export const updateAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData = req.body;
    
    // Find the existing about document
    let about = await About.findOne();
    
    if (!about) {
      // Create new if doesn't exist
      about = new About(updateData);
    } else {
      // Update existing
      Object.assign(about, updateData);
      about.updatedAt = new Date();
    }
    
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('About page updated successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

// Update specific section
export const updateSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;
    
    const about = await getAboutDocument();
    
    // Update only the specified section
    if (section === 'hero') {
      about.heroTitle = sectionData.heroTitle || about.heroTitle;
      about.heroSubtitle = sectionData.heroSubtitle || about.heroSubtitle;
    } else if (section === 'companyInfo') {
      about.companyInfo = { ...about.companyInfo, ...sectionData };
    } else if (section === 'stats') {
      about.stats = sectionData;
    } else if (section === 'story') {
      about.story = { ...about.story, ...sectionData };
    } else if (section === 'missionVision') {
      about.mission = sectionData.mission || about.mission;
      about.vision = sectionData.vision || about.vision;
    } else if (section === 'purposes') {
      about.purposes = sectionData;
    } else if (section === 'values') {
      about.values = sectionData;
    } else if (section === 'milestones') {
      about.milestones = sectionData;
    } else if (section === 'communityImpacts') {
      about.communityImpacts = sectionData;
    } else if (section === 'seo') {
      about.seoTitle = sectionData.seoTitle || about.seoTitle;
      about.seoDescription = sectionData.seoDescription || about.seoDescription;
    } else {
      throw ApiError.badRequest('Invalid section specified');
    }
    
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success(`${section} section updated successfully`, about)
    );
  } catch (error) {
    next(error);
  }
};

// Add new value
export const addValue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valueData = req.body;
    
    const about = await getAboutDocument();
    about.values.push(valueData);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(201).json(
      ApiResponse.created('Value added successfully', about.values)
    );
  } catch (error) {
    next(error);
  }
};

// Update value
export const updateValue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const valueData = req.body;
    
    const about = await getAboutDocument();
    const valueIndex = about.values.findIndex((v: any) => v._id?.toString() === id);
    
    if (valueIndex === -1) {
      throw ApiError.notFound('Value not found');
    }
    
    about.values[valueIndex] = { ...about.values[valueIndex], ...valueData };
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Value updated successfully', about.values[valueIndex])
    );
  } catch (error) {
    next(error);
  }
};

// Delete value
export const deleteValue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const about = await getAboutDocument();
    const valueIndex = about.values.findIndex((v: any) => v._id?.toString() === id);
    
    if (valueIndex === -1) {
      throw ApiError.notFound('Value not found');
    }
    
    about.values.splice(valueIndex, 1);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Value deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// Add new milestone
export const addMilestone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const milestoneData = req.body;
    
    const about = await getAboutDocument();
    about.milestones.push(milestoneData);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(201).json(
      ApiResponse.created('Milestone added successfully', about.milestones)
    );
  } catch (error) {
    next(error);
  }
};

// Update milestone
export const updateMilestone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const milestoneData = req.body;
    
    const about = await getAboutDocument();
    const milestoneIndex = about.milestones.findIndex((m: any) => m._id?.toString() === id);
    
    if (milestoneIndex === -1) {
      throw ApiError.notFound('Milestone not found');
    }
    
    about.milestones[milestoneIndex] = { ...about.milestones[milestoneIndex], ...milestoneData };
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Milestone updated successfully', about.milestones[milestoneIndex])
    );
  } catch (error) {
    next(error);
  }
};

// Delete milestone
export const deleteMilestone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const about = await getAboutDocument();
    const milestoneIndex = about.milestones.findIndex((m: any) => m._id?.toString() === id);
    
    if (milestoneIndex === -1) {
      throw ApiError.notFound('Milestone not found');
    }
    
    about.milestones.splice(milestoneIndex, 1);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Milestone deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// Add community impact
export const addCommunityImpact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const impactData = req.body;
    
    const about = await getAboutDocument();
    about.communityImpacts.push(impactData);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(201).json(
      ApiResponse.created('Community impact added successfully', about.communityImpacts)
    );
  } catch (error) {
    next(error);
  }
};

// Update community impact
export const updateCommunityImpact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const impactData = req.body;
    
    const about = await getAboutDocument();
    const impactIndex = about.communityImpacts.findIndex((i: any) => i._id?.toString() === id);
    
    if (impactIndex === -1) {
      throw ApiError.notFound('Community impact not found');
    }
    
    about.communityImpacts[impactIndex] = { ...about.communityImpacts[impactIndex], ...impactData };
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Community impact updated successfully', about.communityImpacts[impactIndex])
    );
  } catch (error) {
    next(error);
  }
};

// Delete community impact
export const deleteCommunityImpact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const about = await getAboutDocument();
    const impactIndex = about.communityImpacts.findIndex((i: any) => i._id?.toString() === id);
    
    if (impactIndex === -1) {
      throw ApiError.notFound('Community impact not found');
    }
    
    about.communityImpacts.splice(impactIndex, 1);
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Community impact deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// Upload image to section
export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { section, id } = req.params;
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      throw ApiError.badRequest('Image URL is required');
    }
    
    const about = await getAboutDocument();
    
    if (section === 'story') {
      about.story.images.push(imageUrl);
    } else if (section === 'value' && id) {
      const valueIndex = about.values.findIndex((v: any) => v._id?.toString() === id);
      if (valueIndex === -1) throw ApiError.notFound('Value not found');
      about.values[valueIndex].images.push(imageUrl);
    } else if (section === 'milestone' && id) {
      const milestoneIndex = about.milestones.findIndex((m: any) => m._id?.toString() === id);
      if (milestoneIndex === -1) throw ApiError.notFound('Milestone not found');
      about.milestones[milestoneIndex].images.push(imageUrl);
    } else if (section === 'impact' && id) {
      const impactIndex = about.communityImpacts.findIndex((i: any) => i._id?.toString() === id);
      if (impactIndex === -1) throw ApiError.notFound('Community impact not found');
      about.communityImpacts[impactIndex].images.push(imageUrl);
    } else {
      throw ApiError.badRequest('Invalid section or ID');
    }
    
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Image uploaded successfully')
    );
  } catch (error) {
    next(error);
  }
};

// Remove image from section
export const removeImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { section, id, imageIndex } = req.params;
    const index = parseInt(imageIndex);
    
    const about = await getAboutDocument();
    
    if (section === 'story') {
      if (index < 0 || index >= about.story.images.length) {
        throw ApiError.badRequest('Invalid image index');
      }
      about.story.images.splice(index, 1);
    } else if (section === 'value' && id) {
      const valueIndex = about.values.findIndex((v: any) => v._id?.toString() === id);
      if (valueIndex === -1) throw ApiError.notFound('Value not found');
      if (index < 0 || index >= about.values[valueIndex].images.length) {
        throw ApiError.badRequest('Invalid image index');
      }
      about.values[valueIndex].images.splice(index, 1);
    } else if (section === 'milestone' && id) {
      const milestoneIndex = about.milestones.findIndex((m: any) => m._id?.toString() === id);
      if (milestoneIndex === -1) throw ApiError.notFound('Milestone not found');
      if (index < 0 || index >= about.milestones[milestoneIndex].images.length) {
        throw ApiError.badRequest('Invalid image index');
      }
      about.milestones[milestoneIndex].images.splice(index, 1);
    } else if (section === 'impact' && id) {
      const impactIndex = about.communityImpacts.findIndex((i: any) => i._id?.toString() === id);
      if (impactIndex === -1) throw ApiError.notFound('Community impact not found');
      if (index < 0 || index >= about.communityImpacts[impactIndex].images.length) {
        throw ApiError.badRequest('Invalid image index');
      }
      about.communityImpacts[impactIndex].images.splice(index, 1);
    } else {
      throw ApiError.badRequest('Invalid section or ID');
    }
    
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(
      ApiResponse.success('Image removed successfully')
    );
  } catch (error) {
    next(error);
  }
};