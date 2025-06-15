import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BalanceChart = ({ data }) => {

  console.log(data, 'data');
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Ingresos",
        data: data.datasets[0]?.data,
        backgroundColor: "#3DD9C9",
        borderRadius: 6,
        barThickness: 10,
      },
      {
        label: "Gastos",
        data: data.datasets[1]?.data,
        backgroundColor: "#FF7E5F",
        borderRadius: 6,
        barThickness: 10,
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
            if (value >= 1000) {
              return `Q ${(value / 1000).toFixed(1)}k`;
            }
            return `Q ${value}`;
          },
          font: {
            size: 12
          }
        },
        beginAtZero: true,
        max: Math.max(...data.datasets[0].data, ...data.datasets[1].data) * 1.2
      },
    },
  };

  return (
    <div className="h-64">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BalanceChart;
