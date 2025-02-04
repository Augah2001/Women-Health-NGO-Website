import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '../utils/apiClient';

interface FetchState<T> {
  data: T[] | null; 
  loading: boolean;
  error: any; 
}

const useFetch = <T>(url: string, options?: AxiosRequestConfig): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T[]> = await apiClient.get(url, { // Expecting T[]
          ...options,
          signal: controller.signal,
        });
        setState({ data: response.data, loading: false, error: null });
       
        
      } catch (error: any) {
        if (axios.isCancel(error)) {
        
        } else {
          console.error(error);
          setState({
            data: null,
            loading: false,
            error: error.response?.data?.error || "An error occurred while fetching data."
          });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options]); // Removed state.data from dependencies

  return state;
};

export default useFetch;
