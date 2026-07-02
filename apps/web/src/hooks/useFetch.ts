import { useCallback, useState } from 'react';
import apiClient from '@/utils/api';

export function useFetch<T>(url: string, options = {}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<T>(url, options);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  return { data, isLoading, error, fetch };
}

export function usePost<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = useCallback(
    async (payload: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<T>(url, payload);
        return response.data;
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || err.message || 'An error occurred';
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  return { post, isLoading, error };
}
