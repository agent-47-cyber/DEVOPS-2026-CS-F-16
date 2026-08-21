import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Reusable React hook for API requests
 * @param {Function} apiFunc - Async function to call
 * @param {Array} [deps=[]] - Dependency array to trigger refetch
 */
export function useApi(apiFunc, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiFuncRef = useRef(apiFunc);

  useEffect(() => {
    apiFuncRef.current = apiFunc;
  });

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFuncRef.current();
      setData(result);
      return result;
    } catch (err) {
      const msg = err.message || 'An unexpected error occurred.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFuncRef.current();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: execute };
}
