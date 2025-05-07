import React, { useState } from 'react';
import { Cryptocurrency } from '../types/crypto';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Star, TrendingUp, TrendingDown, Info } from 'lucide-react';
import bitcoinLogo from '../assets/bitcoin.png';
import { motion, AnimatePresence } from 'framer-motion';

interface CryptoTableProps {
  assets: Cryptocurrency[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ assets }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const toggleChart = (id: string) => {
    setExpandedChart(prev => prev === id ? null : id);
  };

  const showTooltip = (info: string) => {
    setTooltipInfo(info);
  };

  const hideTooltip = () => {
    setTooltipInfo(null);
  };

  const getCryptoLogo = (symbol: string) => {
    if (symbol.toLowerCase() === 'btc') {
      return bitcoinLogo;
    }
    return `https://ui-avatars.com/api/?name=${symbol}&background=random`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
              <Star className="h-4 w-4 text-gray-400" />
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">#</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">1h %</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h %</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">7d %</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              <div className="flex items-center justify-end gap-1">
                <span className="font-bold text-blue-600">Market Cap</span>
                <div className="relative">
                  <Info 
                    className="h-4 w-4 text-gray-400 cursor-help" 
                    onMouseEnter={() => showTooltip('The total market value of a cryptocurrency\'s circulating supply')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipInfo === 'The total market value of a cryptocurrency\'s circulating supply' && (
                    <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 right-6">
                      The total market value of a cryptocurrency's circulating supply
                    </div>
                  )}
                </div>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              <div className="flex items-center justify-end gap-1">
                <span className="font-bold text-blue-600">Volume (24h)</span>
                <div className="relative">
                  <Info 
                    className="h-4 w-4 text-gray-400 cursor-help" 
                    onMouseEnter={() => showTooltip('Total trading volume in the last 24 hours')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipInfo === 'Total trading volume in the last 24 hours' && (
                    <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 right-6">
                      Total trading volume in the last 24 hours
                    </div>
                  )}
                </div>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              <div className="flex items-center justify-end gap-1">
                <span className="font-bold text-blue-600">Supply</span>
                <div className="relative">
                  <Info 
                    className="h-4 w-4 text-gray-400 cursor-help" 
                    onMouseEnter={() => showTooltip('Current circulating supply and maximum supply (if available)')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipInfo === 'Current circulating supply and maximum supply (if available)' && (
                    <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 right-6">
                      Current circulating supply and maximum supply (if available)
                    </div>
                  )}
                </div>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">7d Chart</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <AnimatePresence>
            {assets.map((asset) => (
              <React.Fragment key={asset.id}>
                <tr 
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => toggleChart(asset.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <Star 
                      className={`h-4 w-4 cursor-pointer ${
                        favorites.has(asset.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'
                      }`}
                      onClick={() => toggleFavorite(asset.id)}
                      fill={favorites.has(asset.id) ? 'currentColor' : 'none'}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{asset.rank}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        <img 
                          className="h-full w-full object-cover"
                          src={getCryptoLogo(asset.symbol)} 
                          alt={`${asset.name} logo`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${asset.symbol}&background=random`;
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="font-medium text-gray-900">{formatCurrency(asset.price)}</div>
                    <div className="text-sm text-gray-500">
                      {asset.priceChange24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 inline" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 inline" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <PriceChange value={asset.priceChange1h} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <PriceChange value={asset.priceChange24h} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <PriceChange value={asset.priceChange7d} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                    <div className="font-medium text-gray-900">{formatCurrency(asset.marketCap)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                    <div className="font-medium text-gray-900">{formatCurrency(asset.volume24h)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                    <div className="font-medium text-gray-900">{formatNumber(asset.circulatingSupply)}</div>
                    {asset.maxSupply && (
                      <div className="text-sm text-gray-500">
                        Max: {formatNumber(asset.maxSupply)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="w-24 h-12">
                      <MiniChart data={asset.chartData} />
                    </div>
                  </td>
                </tr>
                <AnimatePresence>
                  {expandedChart === asset.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={11} className="px-4 py-4 bg-gray-50">
                        <div className="w-full h-64">
                          <MiniChart data={asset.chartData} expanded />
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;