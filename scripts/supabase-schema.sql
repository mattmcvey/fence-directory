-- FenceFind Supabase Schema
-- Run this in the Supabase SQL Editor

-- Enable PostGIS for geo queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Contractors table
CREATE TABLE contractors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_place_id TEXT UNIQUE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT,
  location GEOGRAPHY(Point, 4326),
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  services TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  service_radius INTEGER DEFAULT 25,
  years_in_business INTEGER,
  licensed BOOLEAN DEFAULT false,
  insured BOOLEAN DEFAULT false,
  free_estimates BOOLEAN DEFAULT true,
  photos TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  claimed BOOLEAN DEFAULT false,
  google_maps_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for geo queries (find contractors near a point)
CREATE INDEX idx_contractors_location ON contractors USING GIST (location);

-- Index for city/state browsing
CREATE INDEX idx_contractors_city_state ON contractors (state, city);

-- Index for featured sorting
CREATE INDEX idx_contractors_featured ON contractors (featured DESC, rating DESC);

-- Index for slug lookups
CREATE INDEX idx_contractors_slug ON contractors (slug);

-- Cities table (for SEO landing pages)
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  state_code TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location GEOGRAPHY(Point, 4326),
  population INTEGER DEFAULT 0,
  contractor_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name, state_code)
);

CREATE INDEX idx_cities_state ON cities (state_code);
CREATE INDEX idx_cities_slug ON cities (slug);

-- Claim requests (businesses wanting to claim/create listings)
CREATE TABLE claim_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contractor_id UUID REFERENCES contractors(id),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  website TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote requests (homeowners requesting quotes)
CREATE TABLE quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contractor_id UUID REFERENCES contractors(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  zip TEXT NOT NULL,
  fence_type TEXT,
  material TEXT,
  approximate_length TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to update contractor_count in cities
CREATE OR REPLACE FUNCTION update_city_contractor_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE cities 
  SET contractor_count = (
    SELECT COUNT(*) FROM contractors 
    WHERE contractors.city = cities.name 
    AND contractors.state = cities.state_code
  )
  WHERE name = COALESCE(NEW.city, OLD.city) 
  AND state_code = COALESCE(NEW.state, OLD.state);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_city_count
AFTER INSERT OR UPDATE OR DELETE ON contractors
FOR EACH ROW EXECUTE FUNCTION update_city_contractor_count();

-- Function to find contractors near a point
CREATE OR REPLACE FUNCTION find_nearby_contractors(
  search_lat DOUBLE PRECISION,
  search_lng DOUBLE PRECISION,
  radius_miles INTEGER DEFAULT 30,
  result_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  phone TEXT,
  website TEXT,
  description TEXT,
  city TEXT,
  state TEXT,
  rating NUMERIC,
  review_count INTEGER,
  services TEXT[],
  materials TEXT[],
  featured BOOLEAN,
  verified BOOLEAN,
  free_estimates BOOLEAN,
  licensed BOOLEAN,
  insured BOOLEAN,
  distance_miles DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id, c.name, c.slug, c.phone, c.website, c.description,
    c.city, c.state, c.rating, c.review_count,
    c.services, c.materials, c.featured, c.verified,
    c.free_estimates, c.licensed, c.insured,
    ST_Distance(
      c.location,
      ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography
    ) / 1609.34 AS distance_miles
  FROM contractors c
  WHERE ST_DWithin(
    c.location,
    ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography,
    radius_miles * 1609.34
  )
  ORDER BY c.featured DESC, distance_miles ASC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Public read access for contractors and cities
CREATE POLICY "Public read contractors" ON contractors FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);

-- Only authenticated users can insert claim/quote requests
CREATE POLICY "Anyone can submit claims" ON claim_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit quotes" ON quote_requests FOR INSERT WITH CHECK (true);
