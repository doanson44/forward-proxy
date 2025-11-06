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
  const type = searchParams.get('type');
  const symbol = searchParams.get('symbol');

  console.log('🔍 [/price] Request:', { type, symbol, timestamp: new Date().toISOString() });

  if (!type || !symbol) {
    console.error('❌ [/price] Error: Missing parameters');
    return new Response(
      'Error: Missing parameters',
      { 
        status: 400,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      }
    );
  }

  if (type !== 'coin' && type !== 'stock') {
    console.error('❌ [/price] Error: Invalid type:', type);
    return new Response(
      'Error: Invalid type',
      { 
        status: 400,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      }
    );
  }

  try {
    let price: number | string;
    let displaySymbol: string;

    if (type === 'coin') {
      // Fetch coin price from MEXC API
      const coinSymbol = symbol.toUpperCase() + 'USDT';
      displaySymbol = symbol.toUpperCase();
      console.log('💰 [/price] Fetching coin:', coinSymbol);
      const response = await fetch(`https://api.mexc.com/api/v3/ticker/price?symbol=${coinSymbol}`);
      
      if (!response.ok) {
        console.error('❌ [/price] Coin API error:', response.status, response.statusText);
        return new Response(
          'Error',
          { 
            status: response.status,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              ...corsHeaders
            }
          }
        );
      }
      
      const data = await response.json();
      price = data.price;
      console.log('✅ [/price] Coin price fetched:', { symbol: displaySymbol, price });
    } else {
      // Fetch stock price from Cafef API
      displaySymbol = symbol.toUpperCase();
      console.log('📈 [/price] Fetching stock:', displaySymbol);
      const response = await fetch(`https://msh-appdata.cafef.vn/rest-api/api/v1/Watchlists/${displaySymbol}/price`);
      
      if (!response.ok) {
        console.error('❌ [/price] Stock API error:', response.status, response.statusText);
        return new Response(
          'Error',
          { 
            status: response.status,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              ...corsHeaders
            }
          }
        );
      }
      
      const data = await response.json();
      
      if (data.succeeded && data.data?.value?.price !== undefined) {
        price = data.data.value.price;
        console.log('✅ [/price] Stock price fetched:', { symbol: displaySymbol, price });
      } else {
        console.error('❌ [/price] Invalid stock API response:', data);
        return new Response(
          'Error',
          { 
            status: 500,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              ...corsHeaders
            }
          }
        );
      }
    }

    return new Response(
      String(price),
      { 
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('❌ [/price] Exception:', error);
    return new Response(
      'Error',
      { 
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      }
    );
  }
}
