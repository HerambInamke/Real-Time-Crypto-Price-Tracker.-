import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { Line } from 'react-chartjs-2';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface TimeRange {
  label: string;
  days: number;
}

const timeRanges: TimeRange[] = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 }
];

const HistoricalData: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[1]);

  const generateHistoricalData = (asset: any, days: number) => {
    const data = [];
    const basePrice = asset.price;
    let currentPrice = basePrice;

    for (let i = 0; i < days; i++) {
      // Generate more realistic price movements
      const change = (Math.random() - 0.5) * (basePrice * 0.02);
      currentPrice = Math.max(basePrice * 0.5, Math.min(basePrice * 1.5, currentPrice + change));
      data.push(currentPrice);
    }

    return data;
  };

  const getChartData = () => {
    if (!selectedCrypto) return null;

    const asset = assets.find(a => a.id === selectedCrypto);
    if (!asset) return null;

    const historicalData = generateHistoricalData(asset, selectedTimeRange.days);
    const labels = Array.from({ length: selectedTimeRange.days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (selectedTimeRange.days - i - 1));
      return date.toLocaleDateString();
    });

    const firstPrice = historicalData[0];
    const lastPrice = historicalData[historicalData.length - 1];
    const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;

    return {
      labels,
      datasets: [
        {
          label: `${asset.name} Price`,
          data: historicalData,
          borderColor: priceChange >= 0 ? '#10B981' : '#EF4444',
          backgroundColor: priceChange >= 0 
            ? 'rgba(16, 185, 129, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
        }
      ]
    };
  };

  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            return `Price: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: (value: any) => formatCurrency(value)
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  });

  const selectedAsset = assets.find(a => a.id === selectedCrypto);
  const chartData = getChartData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Historical Data</h2>

        {/* Crypto Selection and Time Range */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="block w-full md:w-64 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select Cryptocurrency</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.symbol})
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            {timeRanges.map(range => (
              <button
                key={range.label}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedTimeRange.label === range.label
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {selectedAsset && chartData && (
          <>
            {/* Price Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Current Price</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(selectedAsset.price)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Price Change</h3>
                <div className="flex items-center">
                  {selectedAsset.priceChange24h >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <p className={`text-2xl font-bold ${
                    selectedAsset.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatPercentage(selectedAsset.priceChange24h)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Market Cap</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(selectedAsset.marketCap)}
                </p>
              </div>
            </div>

            {/* Historical Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-96">
                <Line data={chartData} options={getChartOptions()} />
              </div>
            </div>

            {/* Additional Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Volume (24h)</h3>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(selectedAsset.volume24h)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Circulating Supply</h3>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(selectedAsset.circulatingSupply)}
                </p>
              </div>
            </div>
          </>
        )}

        {!selectedCrypto && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Cryptocurrency</h3>
            <p className="text-gray-500">
              Choose a cryptocurrency from the dropdown above to view its historical data
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalData; 