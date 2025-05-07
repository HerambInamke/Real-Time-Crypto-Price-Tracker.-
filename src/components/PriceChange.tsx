import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => {
  if (value === 0) {
    return (
      <span className="text-gray-500 font-medium">
        0.00%
      </span>
    );
  }

  const isPositive = value > 0;
  const textColor = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className={`inline-flex items-center ${textColor} font-medium`}>
      {isPositive ? (
        <ArrowUp className="h-3 w-3 mr-1" />
      ) : (
        <ArrowDown className="h-3 w-3 mr-1" />
      )}
      {formatPercentage(Math.abs(value))}
    </div>
  );
};

export default PriceChange;