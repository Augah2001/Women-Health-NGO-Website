import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '../utils/apiClient';
import useLoadmore from './useLoadmore';

interface FetchState<T> {
  data: T[] | null; 
  loading: boolean;
  error: any; 
  hasMore: boolean; // Indicates if there are more items to load
  loadMore: () => void; // Function to load more items
  

}

interface ResponseData<P> {
  data: P[];
  hasMore: boolean;
  totalCount: number;
}

const useFetchPaginated = <T>(url: string,limit: number = 2 ): FetchState<T> => {
  
 
  
  const [state, setState] = useState<Omit<FetchState<T>, 'loadMore' >>({
    data: [],
    loading: true,
    error: null,
    hasMore: true, // Initially assume there are more items

  });

  const [currentPage, setCurrentPage] = useState(1);
  const loadMore = () => {
    if (state.hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  
  

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response: AxiosResponse<ResponseData<T>> = await apiClient.get(url, {
         
          params: { page:currentPage, limit }, // Add pagination params to the request
          signal: controller.signal,
        });

    

        // Check if there are more items based on totalCount and the number of items fetched
        const totalItemsFetched = currentPage * limit;
        const hasMore = totalItemsFetched < response.data.totalCount;

        setState((prevState) => ({
          data: currentPage === 1 ? response.data.data : [...(prevState.data || []), ...response.data.data], // Append data if not the first currentPage
          loading: false,
          error: null,
          hasMore,
        }));

        



      } catch (error: any) {
        if (axios.isCancel(error)) {
       
        } else {
          console.error(error);
          setState({
            data: null,
            loading: false,
            error: error.response?.data?.error || "An error occurred while fetching data.",
            hasMore: false,
            
          });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); 
    };
   
  }, [url,currentPage]); // Added currentPage and limit to dependencies
  
  return {...state, loadMore};
};

export default useFetchPaginated;
