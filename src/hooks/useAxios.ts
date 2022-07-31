import { useCallback, useEffect, useState } from "react";

export const useAxios = (api: any, body?: any) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [isClick, setIsClick] = useState(false);

  const fetchData = useCallback(
    async (api: any) => {
      setLoading(true);
      try {
        const result = await api(body);
        setResponse(result.data);
      } catch (error) {
        setError(error as any);
        console.log(error);
      } finally {
        setLoading(false);
        setIsClick(false);
      }
    },
    [body]
  );

  useEffect(() => {
    if (isClick) {
      fetchData(api);
    }
  }, [isClick, fetchData, api]);

  return [response, error, loading, setIsClick];
};
