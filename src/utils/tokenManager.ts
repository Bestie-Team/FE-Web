import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "@/remote/shared";
import { clearAuthStorage } from "./authStorage";

export async function refreshAccessToken(
  setToken?: (token: string | null) => void
) {
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
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 500
      ) {
        if (window.location.pathname !== "/") {
          clearAuthStorage();
          window.location.href = "/";
          console.log(
            `토큰 갱신에 실패했습니다. at refreshing token ${response.status} ${window.location.href}`
          );
        }
      } else {
        console.log(`토큰 갱신에 실패했습니다. ${response.status}`);
      }
      return null;
    }

    const data: { accessToken: string } = await response.json();
    const { accessToken } = data;

    if (accessToken) {
      if (setToken) setToken(data.accessToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

      return accessToken;
    }
    return null;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return null;
  }
}
