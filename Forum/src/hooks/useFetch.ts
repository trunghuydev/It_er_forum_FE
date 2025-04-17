import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token available");
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/refresh-token",
      { refresh_token: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    
    const { access_token, refresh_token } = response.data.data;
    if (!access_token) throw new Error("No access token in refresh response");

    // Lưu token mới vào localStorage
    localStorage.setItem("accessToken", access_token);
    if (refresh_token) {
      localStorage.setItem("refreshToken", refresh_token); // Cập nhật refreshToken nếu có
    }

    return access_token;
  } catch (err) {
    console.error("Refresh token failed:", err);
    localStorage.clear();
    window.location.href = "/"; 
    return null;
  }
};

export function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    const source = axios.CancelToken.source();
    let accessToken = localStorage.getItem("accessToken");

    setLoading(true);
    try {
      const response = await axios.get<T>(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          ...options?.headers,
        },
        cancelToken: source.token,
      });
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) return;

      // Xử lý lỗi 401 và làm mới token
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Thử lại request với accessToken mới
          try {
            const retryResponse = await axios.get<T>(url, {
              ...options,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newAccessToken}`,
                ...options?.headers,
              },
              cancelToken: source.token,
            });
            setData(retryResponse.data);
          } catch (retryErr) {
            setError(
              (retryErr as Error).message || "Failed after refreshing token"
            );
          }
        }
      } else {
        setError((err as Error).message || "Đã có lỗi xảy ra khi fetch dữ liệu");
      }
    } finally {
      setLoading(false);
    }

    return () => {
      source.cancel("Request cancelled by cleanup");
    };
  }, [url, options?.params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}



