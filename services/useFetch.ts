import { useState, useEffect, useCallback, useRef } from "react";
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFunctionRef = useRef(fetchFunction);
  fetchFunctionRef.current = fetchFunction;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFunctionRef.current();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };
    useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    }, [autoFetch, fetchData]);
    return {
      data,
      loading,
      error,
      fetchData,
      reset
    }
};

export default useFetch;

// a use effect hook that takes a fetch function and an optional autoFetch boolean. It manages the loading, error, and data states for the fetch operation. The fetchData function can be called to manually trigger the fetch, and the reset function can be used to reset the state.