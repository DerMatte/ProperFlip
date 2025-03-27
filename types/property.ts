export interface Property {
  id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  status: 'Acquisition' | 'Preparation' | 'Marketing' | 'Sold' | 'Lost' 
  image_url?: string
  created_at: string
  updated_at?: string
  description?: string
} 