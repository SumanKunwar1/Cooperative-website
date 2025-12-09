
// Simple API client using fetch instead of axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function for API calls
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error(`[About API] Request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Interfaces for type safety
export interface AboutData {
  _id?: string;
  heroTitle: string;
  heroSubtitle: string;
  companyInfo: {
    establishedDate: string;
    location: string;
    registrationNumber: string;
    officeLocationLabel: string;
    officeAddress: string;
    mission: string;
    vision: string;
  };
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  story: {
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
  };
  mission: string;
  vision: string;
  purposes: string[];
  values: Array<{
    _id?: string;
    title: string;
    description: string;
    icon: string;
    images: string[];
  }>;
  milestones: Array<{
    _id?: string;
    year: string;
    event: string;
    icon: string;
    images: string[];
  }>;
  communityImpacts: Array<{
    _id?: string;
    title: string;
    description: string;
    metrics: string;
    images: string[];
  }>;
  seoTitle: string;
  seoDescription: string;
  updatedAt?: string;
}

export const aboutApi = {
  // GET operations
  getAbout: async () => {
    try {
      const response = await apiRequest('/api/about');
      console.log('[About API] Raw response:', response);
      
      // The response structure is { success: true, data: {...} }
      if (response && response.success && response.data) {
        return { 
          data: response.data, // Directly return the data
          success: true 
        };
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error: any) {
      console.error('[About API] Failed to fetch about data:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // PUT operations - Update full document
  updateAbout: async (data: AboutData) => {
    try {
      const response = await apiRequest('/api/about', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to update about:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // PUT operations - Update specific section
  updateSection: async (section: string, data: any) => {
    try {
      const response = await apiRequest(`/api/about/section/${section}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error(`[About API] Failed to update section ${section}:`, error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // VALUE operations
  addValue: async (data: any) => {
    try {
      const response = await apiRequest('/api/about/values', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to add value:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  updateValue: async (id: string, data: any) => {
    try {
      const response = await apiRequest(`/api/about/values/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to update value:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  deleteValue: async (id: string) => {
    try {
      const response = await apiRequest(`/api/about/values/${id}`, {
        method: 'DELETE'
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to delete value:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // MILESTONE operations
  addMilestone: async (data: any) => {
    try {
      const response = await apiRequest('/api/about/milestones', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to add milestone:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  updateMilestone: async (id: string, data: any) => {
    try {
      const response = await apiRequest(`/api/about/milestones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to update milestone:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  deleteMilestone: async (id: string) => {
    try {
      const response = await apiRequest(`/api/about/milestones/${id}`, {
        method: 'DELETE'
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to delete milestone:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // COMMUNITY IMPACT operations
  addImpact: async (data: any) => {
    try {
      const response = await apiRequest('/api/about/impacts', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to add impact:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  updateImpact: async (id: string, data: any) => {
    try {
      const response = await apiRequest(`/api/about/impacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to update impact:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  deleteImpact: async (id: string) => {
    try {
      const response = await apiRequest(`/api/about/impacts/${id}`, {
        method: 'DELETE'
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to delete impact:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  // IMAGE operations
  uploadImage: async (section: string, sectionId: string | undefined, imageUrl: string) => {
    try {
      const response = await apiRequest(`/api/about/images/${section}/${sectionId || ''}`, {
        method: 'POST',
        body: JSON.stringify({ imageUrl })
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to upload image:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  },

  removeImage: async (section: string, sectionId: string | undefined, imageIndex: number) => {
    try {
      const response = await apiRequest(`/api/about/images/${section}/${sectionId || ''}/${imageIndex}`, {
        method: 'DELETE'
      });
      return { 
        data: response, 
        success: true 
      };
    } catch (error: any) {
      console.error('[About API] Failed to remove image:', error);
      return { 
        data: null, 
        success: false, 
        error: error.message 
      };
    }
  }
};
