import { useEffect, useState } from "react";

function useDataUpdate<T>(data: T | undefined | null): [T | null | undefined, React.Dispatch<React.SetStateAction<T | null | undefined>>] {
  const [stateData, setStateData] = useState<T | null | undefined>(null);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setStateData(data);
    }
  }, [data]);

  return [stateData, setStateData];
}

export default useDataUpdate;
