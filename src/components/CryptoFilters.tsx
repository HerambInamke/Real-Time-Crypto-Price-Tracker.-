import React from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';

interface CryptoFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionChange: () => void;
}

const CryptoFilters: React.FC<CryptoFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search cryptocurrencies..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="priceChange24h">24h Change</option>
          <option value="marketCap">Market Cap</option>
          <option value="volume24h">Volume (24h)</option>
        </select>
        <button
          onClick={onSortDirectionChange}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
        >
          {sortDirection === 'asc' ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CryptoFilters; 