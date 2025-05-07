import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Home from './pages/Home';
import CryptoTracker from './components/CryptoTracker';
import PortfolioTracker from './components/PortfolioTracker';
import HistoricalData from './components/HistoricalData';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracker" element={<CryptoTracker />} />
              <Route path="/portfolio" element={<PortfolioTracker />} />
              <Route path="/historical" element={<HistoricalData />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;