import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "./shared";
import { refreshAccessToken } from "@/utils/tokenManager";
import STORAGE_KEYS from "@/constants/storageKeys";

const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_CONFIG.getBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // 401 에러이고, 재시도한 요청이 아닐 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 재시도 방지를 위해 플래그 설정

        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            // 새로운 토큰으로 헤더를 설정하고 원래 요청을 다시 시도
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          } else {
            // 토큰 갱신 실패 시 로그아웃 처리
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_INFO);
            window.location.href = "/";
            return Promise.reject(
              new Error("토큰 갱신 실패 후 로그아웃됩니다.")
            );
          }
        } catch (refreshError) {
          // 토큰 갱신 과정 자체에서 에러 발생 시
          return Promise.reject(refreshError);
        }
      }

      // 401 에러가 아니거나 이미 재시도한 경우, 에러를 그대로 반환
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const apiClient = createApiClient();
