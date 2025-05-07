import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets, selectLoading, selectError } from '../store/cryptoSlice';
import { webSocketSimulator } from '../services/websocketSimulator';
import CryptoTable from './CryptoTable';
import CryptoFilters from './CryptoFilters';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import { Cryptocurrency } from '../types/crypto';

const CryptoTracker: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Connect to the WebSocket simulator when component mounts
    webSocketSimulator.connect();
    
    // Disconnect when component unmounts
    return () => {
      webSocketSimulator.disconnect();
    };
  }, []);

  const filteredAndSortedAssets = React.useMemo(() => {
    let result = [...assets];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        asset =>
          asset.name.toLowerCase().includes(query) ||
          asset.symbol.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'priceChange24h':
          comparison = a.priceChange24h - b.priceChange24h;
          break;
        case 'marketCap':
          comparison = a.marketCap - b.marketCap;
          break;
        case 'volume24h':
          comparison = a.volume24h - b.volume24h;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [assets, searchQuery, sortBy, sortDirection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 my-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Cryptocurrency Tracker</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-semibold text-green-600">LIVE</span>
                </span>
                <span>•</span>
                <span>Updates every 2 seconds</span>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <CryptoFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortDirection={sortDirection}
            onSortDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>Error loading cryptocurrency data. Please try again later.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <CryptoTable assets={filteredAndSortedAssets} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoTracker;