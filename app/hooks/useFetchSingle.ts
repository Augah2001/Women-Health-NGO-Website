import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '../utils/apiClient';

interface FetchState<T> {
  data: T | null; // Data for a single entity
  loading: boolean;
  error: any; 
}

const useFetchById = <T>(url: string, id: string | number, options?: AxiosRequestConfig): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const fullUrl = `${url}/${id}`; // Construct URL with ID
        const response: AxiosResponse<T> = await apiClient.get(fullUrl, { 
          ...options,
          signal: controller.signal,
        });
        setState({ data: response.data, loading: false, error: null });
      } catch (error: any) {
        if (axios.isCancel(error)) {
        
        } else {
          console.error(error) 
          setState({ data: null, loading: false, error: error.response?.data?.error || "An error occurred while fetching data." });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); 
    };
  }, [url, id, options]); 
  console.log(state)

  return state;
};

export default useFetchById;