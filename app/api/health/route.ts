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

export async function GET() {
  console.log('💚 [/api/health] Health check requested');
  const status = 'ok';
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();

  return Response.json({ status, timestamp, uptime }, { headers: corsHeaders });
}