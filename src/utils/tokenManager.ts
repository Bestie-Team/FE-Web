import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "@/remote/shared";

export async function refreshAccessToken() {
  const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  const baseUrl = API_CONFIG.getBaseUrl();

  if (deviceId === null) {
    throw new Error("디바이스 아이디가 없습니다.");
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

    const data: { accessToken: string } = await response.json();
    const { accessToken } = data;

    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

      return accessToken;
    }
    if (response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      window.location.href = "/signin";
    }
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    window.location.href = "/signin";
    throw new Error(
      error instanceof Error
        ? error.message
        : `${String(error)} failed refresh token`
    );
  }
}
