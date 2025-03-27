export interface Property {
  id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  status: 'Active' | 'Pending' | 'Sold'
  image_url?: string
  created_at: string
} 