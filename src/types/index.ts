export interface Contractor {
  id: string;
  name: string;
  slug: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  services: FenceService[];
  materials: FenceMaterial[];
  serviceRadius: number;
  yearsInBusiness?: number;
  licensed: boolean;
  insured: boolean;
  freeEstimates: boolean;
  photos: string[];
  featured: boolean;
  verified: boolean;
  claimed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FenceService =
  | 'installation'
  | 'repair'
  | 'replacement'
  | 'staining'
  | 'gates'
  | 'commercial'
  | 'residential';

export type FenceMaterial =
  | 'wood'
  | 'vinyl'
  | 'chain-link'
  | 'aluminum'
  | 'wrought-iron'
  | 'composite'
  | 'bamboo'
  | 'steel';

export interface SearchFilters {
  location: string;
  lat?: number;
  lng?: number;
  radius?: number;
  material?: FenceMaterial;
  service?: FenceService;
  minRating?: number;
  freeEstimates?: boolean;
}

export interface City {
  name: string;
  state: string;
  stateCode: string;
  slug: string;
  lat: number;
  lng: number;
  population: number;
  contractorCount: number;
}

export interface State {
  name: string;
  code: string;
  slug: string;
  cities: City[];
  contractorCount: number;
}
