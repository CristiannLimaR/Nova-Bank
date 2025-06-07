import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BalanceChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: '#1F2937',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          callback: (value) => {
            if (value === 0) return '0';
            if (value === 20000) return '20k';
            if (value === 40000) return '40k';
            if (value === 60000) return '60k';
            if (value === 80000) return '80k';
            if (value === 100000) return '100k';
            return '';
          },
        },
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [40000, 65000, 25000, 50000, 35000, 75000],
        backgroundColor: '#3DD9C9',
        borderRadius: 6,
        barThickness: 10,
      },
      {
        label: 'Expense',
        data: [30000, 20000, 15000, 35000, 48000, 55000],
        backgroundColor: '#FF7E5F',
        borderRadius: 6,
        barThickness: 10,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BalanceChart; 