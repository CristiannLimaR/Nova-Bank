import { useState, useEffect } from 'react';
import { 
  getDailySummary, 
  getStatsChartData, 
  getTopAccounts, 
  getRecentTransactions,
  getSystemStats,
  getActiveProductsCount,
  getMonthlyTransactionCounts
} from '../../services/api.js';

export const useStats = () => {
  // Estados para los datos
  const [dailySummary, setDailySummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [systemStats, setSystemStats] = useState(null);
  const [activeProductsCount, setActiveProductsCount] = useState(null);
  const [monthlyTransactionCounts, setMonthlyTransactionCounts] = useState([]);
  
  // Estados de control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("7d");

  // Cargar resumen diario
  const loadDailySummary = async () => {
    try {
      setError(null);
      const response = await getDailySummary();
      
      if (response.error) {
        throw new Error('Error al cargar resumen diario');
      }
      
      setDailySummary(response.data.data);
     
      return response.data.data;
    } catch (err) {
      console.error('Error al cargar resumen diario:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar datos del gráfico
  const loadChartData = async (range = timeRange) => {
    try {
      setError(null);
      const response = await getStatsChartData(range);
      
      if (response.error) {
        throw new Error('Error al cargar datos del gráfico');
      }
      
      setChartData(response.data.data);
      
      return response.data.data;
    } catch (err) {
      console.error('Error al cargar datos del gráfico:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar cuentas principales
  const loadTopAccounts = async (limit = 5) => {
    try {
      setError(null);
      const response = await getTopAccounts(limit);
      
      if (response.error) {
        throw new Error('Error al cargar cuentas principales');
      }
      
      setAccounts(response.data.data);
      console.log(response.data.data);
      return response.data.data;
      
    } catch (err) {
      console.error('Error al cargar cuentas principales:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar transacciones recientes
  const loadRecentTransactions = async (limit = 8, type = null) => {
    try {
      setError(null);
      const response = await getRecentTransactions(limit, type);
      
      if (response.error) {
        throw new Error('Error al cargar transacciones recientes');
      }
      
      setTransactions(response.data.data);
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Error al cargar transacciones recientes:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar estadísticas del sistema
  const loadSystemStats = async () => {
    try {
      setError(null);
      const response = await getSystemStats();
      
      if (response.error) {
        throw new Error('Error al cargar estadísticas del sistema');
      }
      
      setSystemStats(response.data.data);
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Error al cargar estadísticas del sistema:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar productos activos
  const loadActiveProductsCount = async () => {
    try {
      setError(null);
      const response = await getActiveProductsCount();
      if (response.error) {
        throw new Error('Error al cargar productos activos');
      }
      setActiveProductsCount(response.data.count);
      return response.data.count;
    } catch (err) {
      console.error('Error al cargar productos activos:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar transacciones por mes del último año
  const loadMonthlyTransactionCounts = async () => {
    try {
      setError(null);
      const response = await getMonthlyTransactionCounts();
      if (response.error) {
        throw new Error('Error al cargar transacciones mensuales');
      }
      setMonthlyTransactionCounts(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Error al cargar transacciones mensuales:', err);
      setError(err.message);
      throw err;
    }
  };

  // Cargar todos los datos iniciales
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar todos los datos en paralelo
      const [summaryRes, chartRes, accountsRes, transactionsRes, productsCountRes, systemStatsRes] = await Promise.all([
        loadDailySummary(),
        loadChartData(timeRange),
        loadTopAccounts(5),
        loadRecentTransactions(8),
        loadActiveProductsCount(),
        loadSystemStats()
      ]);

      return {
        summary: summaryRes,
        chart: chartRes,
        accounts: accountsRes,
        transactions: transactionsRes,
        activeProductsCount: productsCountRes,
        systemStats: systemStatsRes
      };

    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Recargar datos del gráfico cuando cambie el rango de tiempo
  const updateTimeRange = async (newTimeRange) => {
    setTimeRange(newTimeRange);
    try {
      await loadChartData(newTimeRange);
    } catch (err) {
      console.error('Error al actualizar rango de tiempo:', err);
    }
  };

  // Función para recargar datos específicos
  const refreshData = async (dataType = 'all') => {
    try {
      setLoading(true);
      setError(null);

      switch (dataType) {
        case 'summary':
          await loadDailySummary();
          break;
        case 'chart':
          await loadChartData(timeRange);
          break;
        case 'accounts':
          await loadTopAccounts(5);
          break;
        case 'transactions':
          await loadRecentTransactions(8);
          break;
        case 'system':
          await loadSystemStats();
          break;
        case 'products':
          await loadActiveProductsCount();
          break;
        case 'all':
        default:
          await loadAllData();
          break;
      }
    } catch (err) {
      console.error(`Error al recargar ${dataType}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  // Resetear estados
  const reset = () => {
    setDailySummary(null);
    setChartData([]);
    setAccounts([]);
    setTransactions([]);
    setSystemStats(null);
    setActiveProductsCount(null);
    setMonthlyTransactionCounts([]);
    setLoading(false);
    setError(null);
    setTimeRange("7d");
  };

  return {
    // Datos
    dailySummary,
    chartData,
    accounts,
    transactions,
    systemStats,
    activeProductsCount,
    monthlyTransactionCounts,
    
    // Estados de control
    loading,
    error,
    timeRange,
    
    // Funciones
    loadDailySummary,
    loadChartData,
    loadTopAccounts,
    loadRecentTransactions,
    loadSystemStats,
    loadActiveProductsCount,
    loadMonthlyTransactionCounts,
    loadAllData,
    updateTimeRange,
    refreshData,
    clearError,
    reset
  };
}; 