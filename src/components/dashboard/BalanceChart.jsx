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

import { getMonthlySummary } from "../../services/transactionService"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BalanceChart = ({ accountId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMonthlySummary(accountId);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Error al cargar datos del gráfico");
      } finally {
        setLoading(false);
      }
    };

    if (accountId) fetchData();
  }, [accountId]);

  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No hay datos para mostrar</p>;

  const { labels, datasets, summary } = data;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: datasets[0]?.data || [],
        backgroundColor: "#3DD9C9",
        borderRadius: 6,
        barThickness: 10,
      },
      {
        label: "Gastos",
        data: datasets[1]?.data || [],
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
      legend: { display: true },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        grid: { color: "#1F2937", drawBorder: false },
        ticks: {
          color: "#6B7280",
          callback: (value) => {
            if (value === 0) return "0";
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar options={options} data={chartData} />
      <div className="mt-4">
        <p>Ingresos: ${summary?.income?.amount || 0}</p>
        <p>Gastos: ${summary?.expense?.amount || 0}</p>
      </div>
    </div>
  );
};

export default BalanceChart;
