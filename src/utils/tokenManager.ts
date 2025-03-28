import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "@/remote/shared";

export async function refreshAccessToken() {
  const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  const baseUrl = API_CONFIG.getBaseUrl();

  if (deviceId === null) {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    return null;
  }

  try {
    const targetUrl = `${baseUrl}/auth/token`;
    const response = await fetch(targetUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Device-Id": deviceId,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      }
      return null;
    }
    const data: { accessToken: string } = await response.json();
    const { accessToken } = data;

    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return null;
  }
}
