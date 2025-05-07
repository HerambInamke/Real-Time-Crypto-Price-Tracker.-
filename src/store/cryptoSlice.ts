import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { mockCryptoData } from '../data/mockData';
import { Cryptocurrency, PriceUpdate } from '../types/crypto';

interface CryptoState {
  assets: Cryptocurrency[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: mockCryptoData,
  loading: false,
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceUpdate[]>) => {
      action.payload.forEach(update => {
        const asset = state.assets.find(a => a.id === update.id);
        if (asset) {
          // Calculate new price changes based on old and new prices
          const priceChangePercent = ((update.price - asset.price) / asset.price) * 100;
          
          // Update the asset
          asset.price = update.price;
          asset.volume24h = update.volume24h;
          
          // Update price changes (simple example - in reality these would be more complex)
          asset.priceChange1h += priceChangePercent * 0.2; // Just an example adjustment
          asset.priceChange24h += priceChangePercent * 0.5;
          asset.priceChange7d += priceChangePercent * 0.1;
          
          // Keep price changes within reasonable bounds for simulation
          asset.priceChange1h = Math.max(-15, Math.min(15, asset.priceChange1h));
          asset.priceChange24h = Math.max(-30, Math.min(30, asset.priceChange24h));
          asset.priceChange7d = Math.max(-50, Math.min(50, asset.priceChange7d));
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// Export actions
export const { updatePrices, setLoading, setError } = cryptoSlice.actions;

// Export selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectAssetById = (state: RootState, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);
export const selectLoading = (state: RootState) => state.crypto.loading;
export const selectError = (state: RootState) => state.crypto.error;

// Export reducer
export default cryptoSlice.reducer;