import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function usePostFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = useCallback(
    async (body: any) => {
      if (!url) return null;

      const source = axios.CancelToken.source();
      const accessToken = localStorage.getItem("accessToken"); 

      setLoading(true);
      try {
        const response = await axios.post<T>(url, body, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined, 
            ...options?.headers, 
          },
          cancelToken: source.token,
        });
        setData(response.data);
        setError(null);
        return response.data;
      } catch (err) {
        if (axios.isCancel(err)) return null;
        setError((err as Error).message || "Đã có lỗi xảy ra khi gửi yêu cầu");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, postData };
}