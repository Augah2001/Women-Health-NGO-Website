import { useState, useEffect } from "react"; // Import your API client
import { toast } from "react-toastify"; // Import toast if not already imported
import apiClient from "../utils/apiClient";

interface UseFetchDataProps<T> {
  id: string | undefined;
  endpoint: string;
}

export default function useFetchInitial<T>({ id, endpoint }: UseFetchDataProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    
    if (id) {
      apiClient
        .get<T>(`${endpoint}/${id}`)
        .then((res) => {
        
          setData(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, endpoint]);

  return { data, loading };
}
