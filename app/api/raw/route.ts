import { NextRequest } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  console.log('🌐 [/api/raw] Request:', { url, timestamp: new Date().toISOString() });

  if (!url) {
    console.error('❌ [/api/raw] Error: Missing URL parameter');
    return Response.json(
      { error: 'Missing url parameter' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    new URL(url); // validate URL
    console.log('✅ [/api/raw] URL validated:', url);
  } catch {
    console.error('❌ [/api/raw] Error: Invalid URL format:', url);
    return Response.json(
      { error: 'Invalid URL format' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    console.log('📡 [/api/raw] Fetching:', url);
    const response = await fetch(url);
    console.log('✅ [/api/raw] Fetch successful:', response.status, response.statusText);
    const data = await response.json();
    return Response.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('❌ [/api/raw] Fetch failed:', error);
    return Response.json(
      { error: 'Failed to fetch data' },
      { status: 500, headers: corsHeaders }
    );
  }
}