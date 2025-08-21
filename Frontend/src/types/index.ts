export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'individual' | 'business';
  joinDate: string;
  photo?: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  logo?: string;
  featured: boolean;
  rating: number;
  services: string[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'announcement' | 'circular' | 'news';
  important: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  ticketPrice?: number;
  availableTickets?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  businessId: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  eligibility?: string[];
}

export interface Advertisement {
  id: string;
  title: string;
  image: string;
  link: string;
  position: 'hero-banner' | 'sidebar' | 'footer' | 'between-sections';
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShoppingCart {
  items: CartItem[];
  total: number;
  itemCount: number;
}