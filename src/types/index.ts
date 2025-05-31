export interface Product {
  productId: number;
  name: string;
  category: string;
  brand: string;
  createdAt: string;
}

export interface EnvironmentalImpact {
  impactId: number;
  product: Product;
  carbonKg: number;
  waterLiters: number;
  wasteKg: number;
  recordedAt: string;
}

export interface ProductWithImpact {
  product: Product;
  environmentalImpact: EnvironmentalImpact;
  ecoImpact: number;
}

export interface SearchHistory {
  searchId: number;
  searchQuery: string;
  timestamp: string;
} 