'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
}

export default function HomePage() {
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse mr-3"></div>
          <h1 className="text-3xl font-bold text-gray-900">API Proxy Service</h1>
        </div>
        {health && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Health Check</h2>
            <p><strong>Status:</strong> {health.status}</p>
            <p><strong>Timestamp:</strong> {health.timestamp}</p>
            <p><strong>Uptime:</strong> {health.uptime} seconds</p>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Endpoints</h2>
          <ul className="space-y-2">
            <li><Link href="/api/health" className="text-blue-600 hover:underline">/api/health</Link> - Health check endpoint</li>
            <li><Link href="/api/raw?url=https://api.mexc.com/api/v3/ticker/price?symbol=BTCUSDT" className="text-blue-600 hover:underline">/api/raw?url=...</Link> - Proxy raw API requests</li>
            <li><Link href="/api/request" className="text-blue-600 hover:underline">/api/request</Link> - API request tester UI</li>
            <li><Link href="/price?type=coin&symbol=XRP" className="text-blue-600 hover:underline">/price?type=coin&symbol=XRP</Link> - View crypto price</li>
            <li><Link href="/price?type=stock&symbol=VNM" className="text-blue-600 hover:underline">/price?type=stock&symbol=VNM</Link> - View stock price</li>
            <li><Link href="/privacy" className="text-blue-600 hover:underline">/privacy</Link> - Privacy policy (mở dữ liệu, cho phép crawl)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}