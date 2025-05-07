import React from 'react';
import { TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">CryptoTracker</h1>
          </div>
          <div className="text-sm text-gray-400">
            <p>Real-time crypto market data</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;