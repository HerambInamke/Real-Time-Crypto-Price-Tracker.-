# Crypture - Cryptocurrency Tracking Application

Crypture is a modern, real-time cryptocurrency tracking application built with React, TypeScript, and Tailwind CSS. It provides users with a comprehensive platform to monitor cryptocurrency prices, track portfolios, and analyze historical data.

## 🌟 Features

### Real-time Tracking
- Live price updates for major cryptocurrencies
- Real-time price changes with visual indicators
- Market cap and volume tracking
- Circulating supply information

### Portfolio Management
- Track multiple cryptocurrency holdings
- Calculate total portfolio value
- Monitor profit/loss in real-time
- Visual portfolio distribution
- Add/remove assets with ease
- Persistent storage using localStorage

### Historical Data Analysis
- Interactive price charts
- Multiple time ranges (24H, 7D, 30D, 90D, 1Y)
- Price statistics and trends
- Market performance metrics

### Advanced Filtering & Sorting
- Filter cryptocurrencies by name
- Sort by price, market cap, or volume
- Search functionality
- Responsive table layout

### User Experience
- Clean, modern UI design
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation
- Dark/light mode support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HerambInamke/Real-Time-Crypto-Price-Tracker.-.git
cd crypture
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── CryptoTable.tsx
│   ├── CryptoTracker.tsx
│   ├── Header.tsx
│   ├── HistoricalData.tsx
│   ├── PortfolioTracker.tsx
│   └── PriceChange.tsx
├── pages/             # Page components
│   └── Home.tsx
├── store/             # Redux store
│   ├── cryptoSlice.ts
│   └── index.ts
├── services/          # Services and utilities
│   └── websocketSimulator.ts
├── types/             # TypeScript types
│   └── crypto.ts
├── utils/             # Utility functions
│   └── formatters.ts
└── App.tsx           # Main application component
```

## 🛠️ Technologies Used

- **Frontend Framework**: React
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 🔄 How It Works

### Real-time Updates
- WebSocket simulator for live price updates
- Redux store for state management
- Efficient re-rendering with React

### Data Flow
1. WebSocket connection receives price updates
2. Updates are dispatched to Redux store
3. Components subscribe to relevant state changes
4. UI updates automatically with new data

### State Management
- Centralized Redux store
- Slices for different features
- Selectors for efficient data access
- Persistent storage for user data

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Flexible layouts
- Adaptive components

## 💻 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Style
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

