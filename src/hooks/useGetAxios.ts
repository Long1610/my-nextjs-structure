import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const useGetAxios = (api: any) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api();
      setResponse(result.data);
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [response, error, loading];
};
