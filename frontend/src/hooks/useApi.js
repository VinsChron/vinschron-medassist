/**
 * useApi Hook - Handle API calls with loading and error states
 */

import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.details || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    execute,
    loading,
    error,
    data,
    clearError: () => setError(null),
    clearData: () => setData(null),
  };
};

export default useApi;
