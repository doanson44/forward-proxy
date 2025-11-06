'use client';

import { useState } from 'react';

export default function RequestPage() {
  const [url, setUrl] = useState('https://api.mexc.com/api/v3/ticker/price?symbol=BTCUSDT');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');
    try {
      const res = await fetch(`/api/raw?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (res.ok) {
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API Request Tester</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-sm font-medium mb-2">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
          placeholder="Enter API URL"
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {response && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Response</h2>
          <pre className="bg-gray-100 p-4 rounded text-gray-900 overflow-x-auto">{response}</pre>
        </div>
      )}
    </div>
  );
}