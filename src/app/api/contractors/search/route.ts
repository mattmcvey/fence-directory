import { NextResponse } from 'next/server';
import { searchContractors } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const contractors = await searchContractors(query);

  return NextResponse.json(
    contractors.map((c) => ({
      id: c.id,
      name: c.name,
      city: c.city,
      state: c.state,
      slug: c.slug,
    }))
  );
}
