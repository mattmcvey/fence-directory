/**
 * Data access layer — reads from Supabase, falls back to seed data if not configured.
 */
import { supabase } from './supabase';
import { SEED_CONTRACTORS, SEED_CITIES, MAJOR_STATES } from './seed-data';
import { Contractor, City, State } from '@/types';

const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function rowToContractor(row: any): Contractor {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    phone: row.phone || '',
    email: row.email,
    website: row.website,
    description: row.description || '',
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip || '',
    lat: 0, // extracted from location if needed
    lng: 0,
    rating: parseFloat(row.rating) || 0,
    reviewCount: row.review_count || 0,
    services: row.services || [],
    materials: row.materials || [],
    serviceRadius: row.service_radius || 25,
    yearsInBusiness: row.years_in_business,
    licensed: row.licensed || false,
    insured: row.insured || false,
    freeEstimates: row.free_estimates ?? true,
    photos: row.photos || [],
    featured: row.featured || false,
    verified: row.verified || false,
    claimed: row.claimed || false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getFeaturedContractors(): Promise<Contractor[]> {
  if (!isSupabaseConfigured) return SEED_CONTRACTORS.filter(c => c.featured);

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false })
    .limit(6);

  if (error || !data) return SEED_CONTRACTORS.filter(c => c.featured);
  return data.map(rowToContractor);
}

export async function getContractorBySlug(slug: string): Promise<Contractor | null> {
  if (!isSupabaseConfigured) {
    return SEED_CONTRACTORS.find(c => c.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return SEED_CONTRACTORS.find(c => c.slug === slug) || null;
  return rowToContractor(data);
}

export async function searchContractors(query: string): Promise<Contractor[]> {
  if (!isSupabaseConfigured) {
    const q = query.toLowerCase();
    return SEED_CONTRACTORS.filter(c =>
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.zip.includes(q) ||
      c.name.toLowerCase().includes(q)
    ).sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .or(`city.ilike.%${query}%,state.ilike.%${query}%,name.ilike.%${query}%,zip.ilike.%${query}%`)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(50);

  if (error || !data) return [];
  return data.map(rowToContractor);
}

export async function getContractorsByState(stateCode: string): Promise<Contractor[]> {
  if (!isSupabaseConfigured) {
    return SEED_CONTRACTORS.filter(c => c.state === stateCode)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('state', stateCode)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(100);

  if (error || !data) return [];
  return data.map(rowToContractor);
}

export async function getContractorsByCity(cityName: string, stateCode: string): Promise<Contractor[]> {
  if (!isSupabaseConfigured) {
    return SEED_CONTRACTORS.filter(c =>
      c.city.toLowerCase() === cityName.toLowerCase() && c.state === stateCode
    );
  }

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .ilike('city', cityName)
    .eq('state', stateCode)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(100);

  if (error || !data) return [];
  return data.map(rowToContractor);
}

export async function getAllContractorSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return SEED_CONTRACTORS.map(c => c.slug);

  const { data, error } = await supabase
    .from('contractors')
    .select('slug');

  if (error || !data) return SEED_CONTRACTORS.map(c => c.slug);
  return data.map(d => d.slug);
}

export async function getCities(): Promise<City[]> {
  if (!isSupabaseConfigured) return SEED_CITIES;

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('population', { ascending: false });

  if (error || !data) return SEED_CITIES;
  return data.map(row => ({
    name: row.name,
    state: row.state,
    stateCode: row.state_code,
    slug: row.slug,
    lat: 0,
    lng: 0,
    population: row.population || 0,
    contractorCount: row.contractor_count || 0,
  }));
}

export async function getCitiesByState(stateCode: string): Promise<City[]> {
  if (!isSupabaseConfigured) return SEED_CITIES.filter(c => c.stateCode === stateCode);

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('state_code', stateCode)
    .order('population', { ascending: false });

  if (error || !data) return SEED_CITIES.filter(c => c.stateCode === stateCode);
  return data.map(row => ({
    name: row.name,
    state: row.state,
    stateCode: row.state_code,
    slug: row.slug,
    lat: 0,
    lng: 0,
    population: row.population || 0,
    contractorCount: row.contractor_count || 0,
  }));
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  if (!isSupabaseConfigured) return SEED_CITIES.find(c => c.slug === slug) || null;

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return SEED_CITIES.find(c => c.slug === slug) || null;
  return {
    name: data.name,
    state: data.state,
    stateCode: data.state_code,
    slug: data.slug,
    lat: 0,
    lng: 0,
    population: data.population || 0,
    contractorCount: data.contractor_count || 0,
  };
}

export async function getSiteStats(): Promise<{
  contractorCount: number;
  avgRating: string;
  cityCount: number;
  freeEstimatePercent: number;
}> {
  if (!isSupabaseConfigured) {
    return {
      contractorCount: SEED_CONTRACTORS.length,
      avgRating: '4.5',
      cityCount: SEED_CITIES.length,
      freeEstimatePercent: 100,
    };
  }

  const [countRes, ratingRes, cityRes, estimateRes] = await Promise.all([
    supabase.from('contractors').select('id', { count: 'exact', head: true }),
    supabase.from('contractors').select('rating'),
    supabase.from('cities').select('id', { count: 'exact', head: true }),
    supabase.from('contractors').select('free_estimates'),
  ]);

  const contractorCount = countRes.count || 0;
  const cityCount = cityRes.count || 0;

  // Calculate average rating from non-zero ratings
  const ratings = (ratingRes.data || [])
    .map(r => parseFloat(r.rating))
    .filter(r => r > 0);
  const avgRating = ratings.length > 0
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : '0';

  // Calculate free estimate percentage
  const estimates = estimateRes.data || [];
  const freeCount = estimates.filter(e => e.free_estimates === true).length;
  const freeEstimatePercent = estimates.length > 0
    ? Math.round((freeCount / estimates.length) * 100)
    : 0;

  return { contractorCount, avgRating, cityCount, freeEstimatePercent };
}

export function getStates(): State[] {
  // States are static for now
  return MAJOR_STATES;
}

export async function submitClaimRequest(data: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website?: string;
  message?: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured) return true; // Fake success in dev

  const { error } = await supabase
    .from('claim_requests')
    .insert({
      business_name: data.businessName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      website: data.website,
      message: data.message,
    });

  return !error;
}
