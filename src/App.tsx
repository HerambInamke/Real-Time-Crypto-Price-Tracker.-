import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import CryptoTracker from './components/CryptoTracker';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<CryptoTracker />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;