import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import { Cryptocurrency } from '../types/crypto';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Line } from 'react-chartjs-2';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioEntry {
  id: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

const PortfolioTracker: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState<number>(0);
  const [profitLossPercentage, setProfitLossPercentage] = useState<number>(0);

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
    calculatePortfolioValue();
  }, [portfolio, assets]);

  const calculatePortfolioValue = () => {
    let value = 0;
    let totalCost = 0;

    portfolio.forEach(entry => {
      const asset = assets.find(a => a.id === entry.id);
      if (asset) {
        const currentValue = entry.amount * asset.price;
        const costBasis = entry.amount * entry.purchasePrice;
        value += currentValue;
        totalCost += costBasis;
      }
    });

    setTotalValue(value);
    const profitLoss = value - totalCost;
    setTotalProfitLoss(profitLoss);
    setProfitLossPercentage(totalCost > 0 ? (profitLoss / totalCost) * 100 : 0);
  };

  const addToPortfolio = () => {
    if (!selectedCrypto || !amount || !purchasePrice) return;

    const newEntry: PortfolioEntry = {
      id: selectedCrypto,
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice),
      purchaseDate: new Date().toISOString()
    };

    setPortfolio([...portfolio, newEntry]);
    setSelectedCrypto('');
    setAmount('');
    setPurchasePrice('');
  };

  const removeFromPortfolio = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const getPortfolioChartData = () => {
    const labels = portfolio.map(entry => {
      const asset = assets.find(a => a.id === entry.id);
      return asset ? asset.symbol : '';
    });

    const values = portfolio.map(entry => {
      const asset = assets.find(a => a.id === entry.id);
      return asset ? entry.amount * asset.price : 0;
    });

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
            '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Tracker</h2>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Profit/Loss</h3>
            <div className="flex items-center">
              <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(totalProfitLoss)}
              </p>
              <span className={`ml-2 ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({profitLossPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Assets</h3>
            <p className="text-2xl font-bold text-gray-900">{portfolio.length}</p>
          </div>
        </div>

        {/* Add to Portfolio Form */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add to Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select Cryptocurrency</option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.symbol})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            />
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Purchase Price (USD)"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            />
            <button
              onClick={addToPortfolio}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </button>
          </div>
        </div>

        {/* Portfolio Distribution Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Distribution</h3>
          <div className="h-64">
            <Line
              data={getPortfolioChartData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.map((entry, index) => {
                const asset = assets.find(a => a.id === entry.id) as Cryptocurrency | undefined;
                if (!asset) return null;

                const currentValue = entry.amount * asset.price;
                const costBasis = entry.amount * entry.purchasePrice;
                const profitLoss = currentValue - costBasis;
                const profitLossPercentage = (profitLoss / costBasis) * 100;

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={asset.logoUrl}
                          alt={asset.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatNumber(entry.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatCurrency(entry.purchasePrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatCurrency(asset.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatCurrency(currentValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end">
                        {profitLoss >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatCurrency(profitLoss)} ({profitLossPercentage.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => removeFromPortfolio(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTracker; 