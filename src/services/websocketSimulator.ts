import { store } from '../store';
import { updatePrices } from '../store/cryptoSlice';
import { PriceUpdate } from '../types/crypto';

class WebSocketSimulator {
  private interval: number | null = null;
  private updateFrequency: number;

  constructor(updateFrequency: number = 2000) {
    this.updateFrequency = updateFrequency;
  }

  public connect(): void {
    if (this.interval) {
      this.disconnect();
    }

    this.interval = window.setInterval(() => {
      this.simulatePriceUpdates();
    }, this.updateFrequency);

    console.log('WebSocket simulator connected');
  }

  public disconnect(): void {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
      console.log('WebSocket simulator disconnected');
    }
  }

  private simulatePriceUpdates(): void {
    const state = store.getState();
    const assets = state.crypto.assets;

    // Create random updates for some or all assets
    const updates: PriceUpdate[] = assets.map(asset => {
      // Random price change between -2% and +2%
      const priceChangePercent = (Math.random() * 4 - 2) / 100;
      const newPrice = asset.price * (1 + priceChangePercent);
      
      // Random volume change between -5% and +5%
      const volumeChangePercent = (Math.random() * 10 - 5) / 100;
      const newVolume = asset.volume24h * (1 + volumeChangePercent);

      return {
        id: asset.id,
        price: parseFloat(newPrice.toFixed(2)),
        volume24h: parseFloat(newVolume.toFixed(2))
      };
    });

    // Dispatch updates to Redux
    store.dispatch(updatePrices(updates));
  }

  public setUpdateFrequency(frequency: number): void {
    this.updateFrequency = frequency;
    if (this.interval) {
      this.disconnect();
      this.connect();
    }
  }
}

// Export a singleton instance
export const webSocketSimulator = new WebSocketSimulator();