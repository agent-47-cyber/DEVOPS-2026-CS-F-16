import { useState, useEffect, useCallback } from 'react';

/**
 * Reusable React hook for API requests
 * @param {Function} apiFunc - Async function to call
 */
export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc();
      setData(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || 'An unexpected error occurred.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [apiFunc]);

  return { data, loading, error, refetch: execute };
}
