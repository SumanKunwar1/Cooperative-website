export interface Subcategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  subcategories: Subcategory[]
}

export const shopCategories: Category[] = [
  {
    id: "1",
    name: "Fashion",
    slug: "fashion",
    subcategories: [
      { id: "1-1", name: "Men's Fashion", slug: "mens" },
      { id: "1-2", name: "Women's Fashion", slug: "womens" },
      { id: "1-3", name: "Kids Fashion", slug: "kids" },
      { id: "1-4", name: "Activewear", slug: "activewear" },
      { id: "1-5", name: "Accessories", slug: "accessories" },
      { id: "1-6", name: "Footwear", slug: "footwear" },
    ],
  },
  {
    id: "2",
    name: "Electronics",
    slug: "electronics",
    subcategories: [
      { id: "2-1", name: "Mobile Phones", slug: "mobile-phones" },
      { id: "2-2", name: "Laptops & Computers", slug: "laptops-computers" },
      { id: "2-3", name: "Audio & Video", slug: "audio-video" },
      { id: "2-4", name: "Gaming", slug: "gaming" },
      { id: "2-5", name: "Smart Home", slug: "smart-home" },
      { id: "2-6", name: "Accessories", slug: "accessories" },
    ],
  },
  {
    id: "3",
    name: "Food & Beverage",
    slug: "food-beverage",
    subcategories: [
      { id: "3-1", name: "Fresh Groceries", slug: "fresh-groceries" },
      { id: "3-2", name: "Beverages", slug: "beverages" },
      { id: "3-3", name: "Snacks & Sweets", slug: "snacks-sweets" },
      { id: "3-4", name: "Organic Products", slug: "organic-products" },
      { id: "3-5", name: "Dairy Products", slug: "dairy-products" },
      { id: "3-6", name: "Frozen Foods", slug: "frozen-foods" },
    ],
  },
  {
    id: "4",
    name: "Home & Living",
    slug: "home-living",
    subcategories: [
      { id: "4-1", name: "Furniture", slug: "furniture" },
      { id: "4-2", name: "Home Decor", slug: "home-decor" },
      { id: "4-3", name: "Kitchen & Dining", slug: "kitchen-dining" },
      { id: "4-4", name: "Bedding & Bath", slug: "bedding-bath" },
      { id: "4-5", name: "Storage Solutions", slug: "storage-solutions" },
      { id: "4-6", name: "Garden & Outdoor", slug: "garden-outdoor" },
    ],
  },
  {
    id: "5",
    name: "Health & Beauty",
    slug: "health-beauty",
    subcategories: [
      { id: "5-1", name: "Skincare", slug: "skincare" },
      { id: "5-2", name: "Makeup", slug: "makeup" },
      { id: "5-3", name: "Hair Care", slug: "hair-care" },
      { id: "5-4", name: "Personal Care", slug: "personal-care" },
      { id: "5-5", name: "Health Supplements", slug: "health-supplements" },
      { id: "5-6", name: "Medical Supplies", slug: "medical-supplies" },
    ],
  },
  {
    id: "6",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    subcategories: [
      { id: "6-1", name: "Fitness Equipment", slug: "fitness-equipment" },
      { id: "6-2", name: "Outdoor Gear", slug: "outdoor-gear" },
      { id: "6-3", name: "Sports Apparel", slug: "sports-apparel" },
      { id: "6-4", name: "Team Sports", slug: "team-sports" },
      { id: "6-5", name: "Water Sports", slug: "water-sports" },
      { id: "6-6", name: "Cycling", slug: "cycling" },
    ],
  },
]

// Helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return shopCategories.find((category) => category.slug === slug)
}

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug)
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug)
}

export const getAllCategories = (): Category[] => {
  return shopCategories
}
