import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Search, Star, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              Real-Time Cryptocurrency Tracker
            </motion.h1>
            <motion.p 
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              variants={itemVariants}
            >
              Track cryptocurrency prices, market caps, and trends in real-time with our powerful and intuitive platform.
            </motion.p>
            <motion.div 
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
              variants={itemVariants}
            >
              <div className="rounded-md shadow">
                <Link
                  to="/tracker"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need to track and analyze cryptocurrency markets
          </p>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Real-time Updates */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Real-time Updates</h3>
            <p className="mt-2 text-base text-gray-500">
              Live price updates every 2 seconds with color-coded indicators for price changes
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">● Positive changes in green</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-red-500">● Negative changes in red</span>
              </div>
            </div>
          </motion.div>

          {/* Advanced Filtering */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Advanced Filtering</h3>
            <p className="mt-2 text-base text-gray-500">
              Search and sort cryptocurrencies by name, price, market cap, and more
            </p>
          </motion.div>

          {/* Interactive Charts */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Interactive Charts</h3>
            <p className="mt-2 text-base text-gray-500">
              Visualize price trends with expandable 7-day charts for each cryptocurrency
            </p>
          </motion.div>

          {/* Favorites */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Favorites</h3>
            <p className="mt-2 text-base text-gray-500">
              Mark your favorite cryptocurrencies for quick access and tracking
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 