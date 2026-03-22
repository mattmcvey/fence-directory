

import { supabase } from './supabase';
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
    lat: 0,
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
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false })
    .limit(6);

  if (error || !data) return [];
  return data.map(rowToContractor);
}

export async function getContractorBySlug(slug: string): Promise<Contractor | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return rowToContractor(data);
}

export async function searchContractors(query: string): Promise<Contractor[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('contractors')
    .select('*')
    .or(`city.ilike.%${query}%,state.ilike.%${query}%,name.ilike.%${query}%,zip.ilike.%${query}%,address.ilike.%${query}%`)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(50);

  if (error || !data) return [];
  return data.map(rowToContractor);
}

export async function getContractorsByState(stateCode: string): Promise<Contractor[]> {
  if (!isSupabaseConfigured) return [];

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
  if (!isSupabaseConfigured) return [];

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
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('contractors')
    .select('slug');

  if (error || !data) return [];
  return data.map(d => d.slug);
}

export async function getCities(): Promise<City[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('population', { ascending: false });

  if (error || !data) return [];
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
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('state_code', stateCode)
    .order('population', { ascending: false });

  if (error || !data) return [];
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
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
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
    return { contractorCount: 0, avgRating: '0', cityCount: 0, freeEstimatePercent: 0 };
  }

  const [countRes, cityRes] = await Promise.all([
    supabase.from('contractors').select('id', { count: 'exact', head: true }),
    supabase.from('cities').select('id', { count: 'exact', head: true }),
  ]);

  const contractorCount = countRes.count || 0;
  const cityCount = cityRes.count || 0;

  let ratingSum = 0;
  let ratingCount = 0;
  let freeCount = 0;
  let totalCount = 0;
  let offset = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('contractors')
      .select('rating, free_estimates')
      .range(offset, offset + pageSize - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data) {
      const r = parseFloat(row.rating);
      if (r > 0) { ratingSum += r; ratingCount++; }
      if (row.free_estimates === true) freeCount++;
      totalCount++;
    }

    if (data.length < pageSize) break;
    offset += pageSize;
  }

  const avgRating = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : '0';
  const freeEstimatePercent = totalCount > 0 ? Math.round((freeCount / totalCount) * 100) : 0;

  return { contractorCount, avgRating, cityCount, freeEstimatePercent };
}


const ALL_STATES: { name: string; code: string; slug: string }[] = [
  { name: 'Alabama', code: 'AL', slug: 'alabama' },
  { name: 'Alaska', code: 'AK', slug: 'alaska' },
  { name: 'Arizona', code: 'AZ', slug: 'arizona' },
  { name: 'Arkansas', code: 'AR', slug: 'arkansas' },
  { name: 'California', code: 'CA', slug: 'california' },
  { name: 'Colorado', code: 'CO', slug: 'colorado' },
  { name: 'Connecticut', code: 'CT', slug: 'connecticut' },
  { name: 'Delaware', code: 'DE', slug: 'delaware' },
  { name: 'Florida', code: 'FL', slug: 'florida' },
  { name: 'Georgia', code: 'GA', slug: 'georgia' },
  { name: 'Hawaii', code: 'HI', slug: 'hawaii' },
  { name: 'Idaho', code: 'ID', slug: 'idaho' },
  { name: 'Illinois', code: 'IL', slug: 'illinois' },
  { name: 'Indiana', code: 'IN', slug: 'indiana' },
  { name: 'Iowa', code: 'IA', slug: 'iowa' },
  { name: 'Kansas', code: 'KS', slug: 'kansas' },
  { name: 'Kentucky', code: 'KY', slug: 'kentucky' },
  { name: 'Louisiana', code: 'LA', slug: 'louisiana' },
  { name: 'Maine', code: 'ME', slug: 'maine' },
  { name: 'Maryland', code: 'MD', slug: 'maryland' },
  { name: 'Massachusetts', code: 'MA', slug: 'massachusetts' },
  { name: 'Michigan', code: 'MI', slug: 'michigan' },
  { name: 'Minnesota', code: 'MN', slug: 'minnesota' },
  { name: 'Mississippi', code: 'MS', slug: 'mississippi' },
  { name: 'Missouri', code: 'MO', slug: 'missouri' },
  { name: 'Montana', code: 'MT', slug: 'montana' },
  { name: 'Nebraska', code: 'NE', slug: 'nebraska' },
  { name: 'Nevada', code: 'NV', slug: 'nevada' },
  { name: 'New Hampshire', code: 'NH', slug: 'new-hampshire' },
  { name: 'New Jersey', code: 'NJ', slug: 'new-jersey' },
  { name: 'New Mexico', code: 'NM', slug: 'new-mexico' },
  { name: 'New York', code: 'NY', slug: 'new-york' },
  { name: 'North Carolina', code: 'NC', slug: 'north-carolina' },
  { name: 'North Dakota', code: 'ND', slug: 'north-dakota' },
  { name: 'Ohio', code: 'OH', slug: 'ohio' },
  { name: 'Oklahoma', code: 'OK', slug: 'oklahoma' },
  { name: 'Oregon', code: 'OR', slug: 'oregon' },
  { name: 'Pennsylvania', code: 'PA', slug: 'pennsylvania' },
  { name: 'Rhode Island', code: 'RI', slug: 'rhode-island' },
  { name: 'South Carolina', code: 'SC', slug: 'south-carolina' },
  { name: 'South Dakota', code: 'SD', slug: 'south-dakota' },
  { name: 'Tennessee', code: 'TN', slug: 'tennessee' },
  { name: 'Texas', code: 'TX', slug: 'texas' },
  { name: 'Utah', code: 'UT', slug: 'utah' },
  { name: 'Vermont', code: 'VT', slug: 'vermont' },
  { name: 'Virginia', code: 'VA', slug: 'virginia' },
  { name: 'Washington', code: 'WA', slug: 'washington' },
  { name: 'West Virginia', code: 'WV', slug: 'west-virginia' },
  { name: 'Wisconsin', code: 'WI', slug: 'wisconsin' },
  { name: 'Wyoming', code: 'WY', slug: 'wyoming' },
];

export function getStates(): State[] {
  return ALL_STATES.map(s => ({
    ...s,
    cities: [],
    contractorCount: 0,
  }));
}

export async function getStatesWithCounts(): Promise<State[]> {
  if (!isSupabaseConfigured) return getStates();

  const counts: Record<string, number> = {};
  let offset = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('contractors')
      .select('state')
      .range(offset, offset + pageSize - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data) {
      counts[row.state] = (counts[row.state] || 0) + 1;
    }

    if (data.length < pageSize) break;
    offset += pageSize;
  }

  return ALL_STATES.map(s => ({
    ...s,
    cities: [],
    contractorCount: counts[s.code] || 0,
  }));
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
  if (!isSupabaseConfigured) return true;

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
