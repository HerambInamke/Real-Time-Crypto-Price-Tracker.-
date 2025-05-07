import { Cryptocurrency } from '../types/crypto';

const generateChartData = (min: number, max: number, points: number = 50): number[] => {
  const data = [];
  let value = (min + max) / 2;
  
  for (let i = 0; i < points; i++) {
    // More realistic price movements
    const change = (Math.random() - 0.5) * (max - min) * 0.02;
    value = Math.max(min, Math.min(max, value + change));
    data.push(value);
  }
  
  return data;
};

export const mockCryptoData: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 50000,
    priceChange1h: 0.5,
    priceChange24h: 2.5,
    priceChange7d: 5.2,
    marketCap: 950000000000,
    volume24h: 25000000000,
    circulatingSupply: 19000000,
    maxSupply: 21000000,
    chartData: generateChartData(49000, 51000)
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3000,
    priceChange1h: -0.3,
    priceChange24h: 1.8,
    priceChange7d: 3.5,
    marketCap: 350000000000,
    volume24h: 15000000000,
    circulatingSupply: 120000000,
    maxSupply: null,
    chartData: generateChartData(2900, 3100)
  },
  {
    id: 'binancecoin',
    rank: 3,
    name: 'Binance Coin',
    symbol: 'BNB',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 400,
    priceChange1h: 0.8,
    priceChange24h: 3.2,
    priceChange7d: 7.5,
    marketCap: 65000000000,
    volume24h: 2000000000,
    circulatingSupply: 160000000,
    maxSupply: 170000000,
    chartData: generateChartData(380, 420)
  },
  {
    id: 'solana',
    rank: 4,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 100,
    priceChange1h: 1.2,
    priceChange24h: 4.5,
    priceChange7d: 12.3,
    marketCap: 40000000000,
    volume24h: 1800000000,
    circulatingSupply: 400000000,
    maxSupply: 500000000,
    chartData: generateChartData(90, 110)
  },
  {
    id: 'cardano',
    rank: 5,
    name: 'Cardano',
    symbol: 'ADA',
    logoUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    price: 1.2,
    priceChange1h: -0.5,
    priceChange24h: -2.1,
    priceChange7d: 1.5,
    marketCap: 35000000000,
    volume24h: 1200000000,
    circulatingSupply: 32000000000,
    maxSupply: 45000000000,
    chartData: generateChartData(1.0, 1.4)
  },
  {
    id: 'ripple',
    rank: 6,
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    price: 0.5,
    priceChange1h: 0.3,
    priceChange24h: 1.2,
    priceChange7d: -0.8,
    marketCap: 25000000000,
    volume24h: 1500000000,
    circulatingSupply: 50000000000,
    maxSupply: 100000000000,
    chartData: generateChartData(0.45, 0.55)
  },
  {
    id: 'polkadot',
    rank: 7,
    name: 'Polkadot',
    symbol: 'DOT',
    logoUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    price: 7.5,
    priceChange1h: -0.2,
    priceChange24h: 2.8,
    priceChange7d: 5.5,
    marketCap: 20000000000,
    volume24h: 800000000,
    circulatingSupply: 1100000000,
    maxSupply: null,
    chartData: generateChartData(7.0, 8.0)
  },
  {
    id: 'dogecoin',
    rank: 8,
    name: 'Dogecoin',
    symbol: 'DOGE',
    logoUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    price: 0.15,
    priceChange1h: 1.5,
    priceChange24h: 3.8,
    priceChange7d: 8.2,
    marketCap: 18000000000,
    volume24h: 700000000,
    circulatingSupply: 130000000000,
    maxSupply: null,
    chartData: generateChartData(0.12, 0.18)
  },
  {
    id: 'avalanche',
    rank: 9,
    name: 'Avalanche',
    symbol: 'AVAX',
    logoUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    price: 35,
    priceChange1h: 0.7,
    priceChange24h: 2.3,
    priceChange7d: 6.8,
    marketCap: 15000000000,
    volume24h: 600000000,
    circulatingSupply: 400000000,
    maxSupply: 720000000,
    chartData: generateChartData(32, 38)
  },
  {
    id: 'chainlink',
    rank: 10,
    name: 'Chainlink',
    symbol: 'LINK',
    logoUrl: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    price: 15,
    priceChange1h: -0.4,
    priceChange24h: 1.5,
    priceChange7d: 4.2,
    marketCap: 12000000000,
    volume24h: 500000000,
    circulatingSupply: 800000000,
    maxSupply: 1000000000,
    chartData: generateChartData(14, 16)
  }
];