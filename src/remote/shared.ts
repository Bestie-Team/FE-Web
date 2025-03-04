import { ERROR_MESSAGES } from "@/constants/errorMessages";
import STORAGE_KEYS from "@/constants/storageKeys";
import { refreshAccessToken } from "@/utils/tokenManager";

export function validateBackendUrl(): string {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error(ERROR_MESSAGES.NO_BACKEND_URL);
  }
  return backendUrl;
}

export function validateAuth(): string {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error(ERROR_MESSAGES.NO_AUTH);
  }
  return token;
}

// 공통으로 사용되는 기본 설정
export const API_CONFIG = {
  getBaseUrl: () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) throw new Error(ERROR_MESSAGES.NO_BACKEND_URL);
    return url;
  },
  getHeaders: () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) throw new Error(ERROR_MESSAGES.NO_AUTH);

    return {
      Authorization: `Bearer ${token}`,
    };
  },
};

// 기본 fetch 함수
export const fetchWithAuth = async (url: string, options: RequestInit) => {
  const fetchFn = async () => {
    try {
      return await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...API_CONFIG.getHeaders(),
        },
      });
    } catch (e) {
      throw Error("Network Error");
    }
  };

  let response = await fetchFn();

  if (response.status === 401) {
    await refreshAccessToken();

    response = await fetchFn();
  }

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }

  return response;
};
