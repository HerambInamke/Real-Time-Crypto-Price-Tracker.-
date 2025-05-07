export interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
}

export interface PriceUpdate {
  id: string;
  price: number;
  volume24h: number;
}