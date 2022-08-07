import { useCallback, useEffect, useState } from "react";

export const useAxios = (api: any, body?: any) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [isClick, setIsClick] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api(body);
      setResponse(result.data);
      setShowAlertSuccess(true);
    } catch (error) {
      setError(error as any);
      setShowAlertError(true);
    } finally {
      setLoading(false);
      setIsClick(false);
    }
  };

  useEffect(() => {
    if (isClick) {
      fetchData();
    }
    return () => {
      setIsClick(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick]);

  return [
    response,
    error,
    loading,
    setIsClick,
    showAlertSuccess,
    setShowAlertSuccess,
    showAlertError,
    setShowAlertError,
  ];
};
