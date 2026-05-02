import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = ({ type, data, options, title, className = '' }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb'
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#f9fafb'
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(148, 163, 184, 0.4)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.18)'
        },
        ticks: {
          color: '#cbd5e1'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.18)'
        },
        ticks: {
          color: '#cbd5e1'
        }
      },
    },
  };

  const chartOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <div className={`bg-[#111827] rounded-lg shadow-sm border border-slate-700 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-50 mb-4">{title}</h3>
      )}
      <div className="h-64">
        {renderChart()}
      </div>
    </div>
  );
};

export default Chart;
