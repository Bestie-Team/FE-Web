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

    return {
      Authorization: token ? `Bearer ${token}` : "",
    };
  },
};

// 기본 fetch 함수
export const fetchWithAuth = async (url: string, options: RequestInit) => {
  const getAuthHeaders = () => {
    const headers = { ...(options.headers || {}), ...API_CONFIG.getHeaders() };
    return headers;
  };

  const fetchFn = async () => {
    try {
      return await fetch(url, {
        ...options,
        headers: getAuthHeaders(),
      });
    } catch (e) {
      throw Error(`Network Error, ${e}`);
    }
  };

  let response;
  try {
    response = await fetchFn();
  } catch (e) {
    console.error("Fetch failed:", e);
    throw new Error("Failed to fetch data");
  }

  if (!response) {
    throw new Error("No response received");
  }

  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      try {
        response = await fetchFn();
      } catch (e) {
        console.error("Retry fetch failed:", e);
        throw new Error("Failed to fetch data after token refresh");
      }
    } else {
      // 토큰 갱신 실패 - 로그인 페이지로 리디렉션하지만 오류도 반환
      // 리디렉션은 컴포넌트에서 처리하도록 변경
      throw new Error("Authentication failed");
    }
  }

  if (response.status === 404) {
    const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (!userInfo) {
      window.location.href = "/";
    } else {
      throw new Error("Resource not found");
    }
  }

  if (!response?.ok) {
    try {
      const res = await response.json();
      throw new Error(res.message || `Server error: ${response.status}`);
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(`Server error: ${response.status}`);
      }
      throw e;
    }
  }

  return response;
};
