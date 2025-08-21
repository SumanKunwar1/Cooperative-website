import { Member, Business, Notice, Event, Service } from '../types';
import { Advertisement, Category } from '../types';

// Updated company information based on actual content
export const companyInfo = {
  name: 'Constellation Saving & Credit Co-operative Ltd.',
  registrationNo: '3436/064/65',
  panNo: '308300368',
  established: '2064 B.S. (2007 A.D.)',
  address: 'CTC Mall, Sundhara, Kathmandu, Nepal',
  phone: '01-4244953',
  email: 'constellationscc@gmail.com',
  website: 'www.constellationcooperative.com',
  slogan: "Today's Saving for Tomorrow's Bright Future"
};

export const leadershipMessages = [
  {
    id: 'president',
    title: 'Word from President',
    name: 'Mr. Rajesh Kumar Sharma',
    position: 'President',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    message: 'Constellation Saving & Credit Co-operative Ltd. stands as a beacon of financial empowerment in our community. Since our establishment in 2007, we have been committed to uplifting the financial, social, cultural, and educational standards of our members through cooperative principles. Our vision of "Today\'s Saving for Tomorrow\'s Bright Future" drives us to provide innovative financial solutions that promote mutual cooperation, self-reliance, and collective prosperity.',
    signature: 'assets/president-signature.png'
  },
  {
    id: 'general-manager',
    title: 'Word from General Manager',
    name: 'Ms. Sunita Thapa',
    position: 'General Manager',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    message: 'At Constellation, we believe in the power of cooperative banking to transform lives and communities. Our comprehensive range of saving schemes and loan products are designed to meet the diverse needs of our members - from daily savers to business entrepreneurs. With modern banking facilities, transparent operations, and a commitment to financial inclusion, we continue to expand our services while maintaining the trust and confidence of our valued members.',
    signature: 'assets/gm-signature.png'
  }
];

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Ram Sharma',
    email: 'ram.sharma@email.com',
    phone: '+977-9841234567',
    membershipType: 'individual',
    joinDate: '2023-01-15',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Sita Poudel',
    email: 'sita.poudel@email.com',
    phone: '+977-9851234567',
    membershipType: 'individual',
    joinDate: '2023-02-20',
    photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Kathmandu Traders Pvt. Ltd.',
    email: 'info@ktmtraders.com',
    phone: '+977-9861234567',
    membershipType: 'business',
    joinDate: '2023-03-10',
  }
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Himalayan Coffee House',
    category: 'Restaurant',
    description: 'Premium coffee and local cuisine in the heart of Kathmandu',
    contact: {
      phone: '+977-9841111111',
      email: 'info@himalayancoffee.com',
      address: 'Thamel, Kathmandu'
    },
    featured: true,
    rating: 4.8,
    services: ['Coffee', 'Food', 'Catering']
  },
  {
    id: '2',
    name: 'Nepal Tech Solutions',
    category: 'Technology',
    description: 'IT services and software development company',
    contact: {
      phone: '+977-9851111111',
      email: 'contact@nepaltech.com',
      address: 'Putalisadak, Kathmandu'
    },
    featured: true,
    rating: 4.9,
    services: ['Web Development', 'Mobile Apps', 'IT Consulting']
  },
  {
    id: '3',
    name: 'Everest Handicrafts',
    category: 'Handicrafts',
    description: 'Traditional Nepalese handicrafts and souvenirs',
    contact: {
      phone: '+977-9861111111',
      email: 'sales@everesthandicrafts.com',
      address: 'Basantapur, Kathmandu'
    },
    featured: false,
    rating: 4.6,
    services: ['Handicrafts', 'Souvenirs', 'Export']
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Annual General Meeting 2024',
    content: 'All members are cordially invited to attend the Annual General Meeting scheduled for March 15, 2024.',
    date: '2024-02-15',
    type: 'announcement',
    important: true
  },
  {
    id: '2',
    title: 'New Digital Banking Services',
    content: 'We are pleased to announce the launch of our new digital banking platform for all members.',
    date: '2024-02-10',
    type: 'news',
    important: false
  },
  {
    id: '3',
    title: 'Interest Rate Revision',
    content: 'Effective from March 1, 2024, the interest rates for savings accounts will be revised.',
    date: '2024-02-08',
    type: 'circular',
    important: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Financial Literacy Workshop',
    description: 'Learn about personal finance management and investment strategies',
    date: '2024-03-20',
    location: 'Constellation Head Office, Kathmandu',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    ticketPrice: 500,
    availableTickets: 50
  },
  {
    id: '2',
    title: 'Cooperative Development Seminar',
    description: 'Understanding the future of cooperative banking in Nepal',
    date: '2024-03-25',
    location: 'Hotel Yak & Yeti, Kathmandu',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    ticketPrice: 1000,
    availableTickets: 100
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Constellation General Saving Scheme',
    description: 'Flexible saving option for families with daily, weekly, or monthly deposits',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 500',
      'Interest Rate: 5% annually',
      'Maximum Withdrawal: Rs. 200,000',
      'Interest merged every 6 months'
    ]
  },
  {
    id: '2',
    title: 'Constellation Special Saving Scheme',
    description: 'Enhanced saving scheme with higher interest rates and withdrawal limits',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 1,000',
      'Interest Rate: 6% annually',
      'Maximum Withdrawal: Rs. 300,000',
      'Daily, Weekly, or Monthly deposits'
    ]
  },
  {
    id: '3',
    title: 'Constellation Super Saving Scheme',
    description: 'Premium saving scheme for heavy savers with maximum benefits',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 5,000',
      'Interest Rate: 7% annually',
      'Maximum Withdrawal: Rs. 500,000',
      'Highest interest and withdrawal facility'
    ]
  },
  {
    id: '4',
    title: 'Constellation Daily Saving Scheme',
    description: 'Daily savings scheme designed for businesspersons with high returns',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 300',
      'Interest Rate: 8% annually',
      'Daily saving method',
      'Target: Businesspersons'
    ]
  },
  {
    id: '5',
    title: 'Constellation Shareholder Saving Scheme',
    description: 'Exclusive scheme for shareholding members with premium benefits',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 1,500',
      'Interest Rate: 10% annually',
      'Monthly saving method',
      'For shareholding members only'
    ]
  },
  {
    id: '6',
    title: 'Constellation Business Saving Scheme',
    description: 'Specialized scheme for business members with flexible withdrawal',
    icon: 'PiggyBank',
    features: [
      'Minimum Balance: Rs. 15,000',
      'Interest Rate: 10% annually',
      'Withdrawal as per requirement',
      'Overdraft facility available'
    ]
  },
  {
    id: '7',
    title: 'Business Loan',
    description: 'Comprehensive loan solutions for business growth and expansion',
    icon: 'CreditCard',
    features: [
      'Interest Rate: 9% - 10.5% (based on tenure)',
      'Flexible repayment: 3 months to 2 years',
      'Quick processing and approval',
      'Competitive rates for all business needs'
    ],
    eligibility: [
      'Active membership required',
      'Business registration documents',
      'Financial statements',
      'Collateral as per loan amount'
    ]
  },
  {
    id: '8',
    title: 'Agriculture Loan',
    description: 'Specialized financing for agricultural activities and farming',
    icon: 'CreditCard',
    features: [
      'Interest Rate: 9% - 10.5% (based on tenure)',
      'Support for all agricultural activities',
      'Seasonal repayment options',
      'Technical assistance available'
    ],
    eligibility: [
      'Land ownership documents',
      'Agricultural activity proof',
      'Membership in cooperative',
      'Guarantor requirements'
    ]
  },
  {
    id: '9',
    title: 'Housing Loan',
    description: 'Affordable housing finance for your dream home',
    icon: 'Building2',
    features: [
      'Interest Rate: 9% - 10.5% (based on tenure)',
      'Long-term repayment options',
      'Construction and purchase loans',
      'Competitive processing fees'
    ],
    eligibility: [
      'Stable income source',
      'Property documents',
      'Down payment capability',
      'Credit history verification'
    ]
  },
  {
    id: '10',
    title: 'Educational Loan',
    description: 'Invest in education for a brighter future',
    icon: 'CreditCard',
    features: [
      'Interest Rate: 9% - 10.5% (based on tenure)',
      'Covers tuition and living expenses',
      'Flexible repayment after graduation',
      'Support for all education levels'
    ],
    eligibility: [
      'Admission confirmation',
      'Academic records',
      'Guarantor requirements',
      'Income proof of family'
    ]
  },
  {
    id: '11',
    title: 'Digital Banking',
    description: 'Modern banking at your fingertips with our digital platform',
    icon: 'Smartphone',
    features: [
      'Mobile banking app',
      'Online fund transfers',
      'Bill payment services',
      'Account statements'
    ]
  }
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: '1',
    title: 'Special Loan Offer',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services',
    position: 'hero-banner',
    active: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  {
    id: '2',
    title: 'Digital Banking Promotion',
    image: 'https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/services',
    position: 'sidebar',
    active: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  {
    id: '3',
    title: 'Member Benefits',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400',
    link: '/membership',
    position: 'between-sections',
    active: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      { id: '1-1', name: 'Men Fashion', slug: 'men-fashion' },
      { id: '1-2', name: 'Women Fashion', slug: 'women-fashion' },
      { id: '1-3', name: 'Kids Fashion', slug: 'kids-fashion' },
      { id: '1-4', name: 'Accessories', slug: 'accessories' },
      { id: '1-5', name: 'Shoes', slug: 'shoes' }
    ]
  },
  {
    id: '2',
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      { id: '2-1', name: 'Mobile Phones', slug: 'mobile-phones' },
      { id: '2-2', name: 'Laptops', slug: 'laptops' },
      { id: '2-3', name: 'Home Appliances', slug: 'home-appliances' },
      { id: '2-4', name: 'Audio & Video', slug: 'audio-video' },
      { id: '2-5', name: 'Gaming', slug: 'gaming' }
    ]
  },
  {
    id: '3',
    name: 'Lifestyle',
    slug: 'lifestyle',
    subcategories: [
      { id: '3-1', name: 'Health & Beauty', slug: 'health-beauty' },
      { id: '3-2', name: 'Sports & Fitness', slug: 'sports-fitness' },
      { id: '3-3', name: 'Books & Media', slug: 'books-media' },
      { id: '3-4', name: 'Home & Garden', slug: 'home-garden' },
      { id: '3-5', name: 'Travel & Luggage', slug: 'travel-luggage' }
    ]
  },
  {
    id: '4',
    name: 'Food & Beverages',
    slug: 'food-beverages',
    subcategories: [
      { id: '4-1', name: 'Organic Foods', slug: 'organic-foods' },
      { id: '4-2', name: 'Beverages', slug: 'beverages' },
      { id: '4-3', name: 'Snacks', slug: 'snacks' },
      { id: '4-4', name: 'Dairy Products', slug: 'dairy-products' },
      { id: '4-5', name: 'Local Specialties', slug: 'local-specialties' }
    ]
  }
];

export const mockProducts = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'High-quality cotton t-shirt perfect for everyday wear',
    price: 1500,
    originalPrice: 2000,
    category: 'Fashion',
    subcategory: 'Men Fashion',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    inStock: true,
    stock: 50,
    businessId: '1',
    businessName: 'Himalayan Fashion Store',
    rating: 4.5,
    reviews: 23,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    featured: true,
    discount: 25
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 8500,
    originalPrice: 10000,
    category: 'Electronics',
    subcategory: 'Audio & Video',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    inStock: true,
    stock: 25,
    businessId: '2',
    businessName: 'Nepal Tech Solutions',
    rating: 4.8,
    reviews: 45,
    colors: ['Black', 'White', 'Blue'],
    featured: true,
    discount: 15
  },
  {
    id: '3',
    name: 'Organic Green Tea',
    description: 'Premium organic green tea from the hills of Nepal',
    price: 750,
    originalPrice: 900,
    category: 'Food & Beverages',
    subcategory: 'Beverages',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    inStock: true,
    stock: 100,
    businessId: '3',
    businessName: 'Everest Organic Products',
    rating: 4.6,
    reviews: 67,
    weight: ['100g', '250g', '500g'],
    featured: false,
    discount: 17
  },
  {
    id: '4',
    name: 'Handwoven Pashmina Shawl',
    description: 'Authentic handwoven pashmina shawl from Nepal',
    price: 3500,
    originalPrice: 4000,
    category: 'Fashion',
    subcategory: 'Accessories',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    inStock: true,
    stock: 15,
    businessId: '3',
    businessName: 'Everest Handicrafts',
    rating: 4.9,
    reviews: 34,
    colors: ['Red', 'Blue', 'Green', 'Purple', 'Orange'],
    featured: true,
    discount: 12
  }
];