import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MiniChartProps {
  data: number[];
  expanded?: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, expanded = false }) => {
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        data,
        borderColor: data[data.length - 1] >= data[0] ? '#10B981' : '#EF4444',
        backgroundColor: data[data.length - 1] >= data[0] 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: expanded,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: expanded,
        grid: {
          display: expanded,
        },
      },
      y: {
        display: expanded,
        grid: {
          display: expanded,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div style={{ height: expanded ? '100%' : '100%', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MiniChart;