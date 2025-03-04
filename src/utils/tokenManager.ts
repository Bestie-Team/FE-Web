import { useAuth } from "@/components/shared/providers/AuthProvider";
import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "@/remote/shared";
import { useEffect } from "react";

const TokenManager = () => {
  const { setToken } = useAuth();
  async function checkAndRefreshToken() {
    const now = Date.now();
    const tokenExpiryTime = localStorage.getItem(STORAGE_KEYS.EXPIRY_TIME);

    if (tokenExpiryTime == null) return;

    if (now >= parseInt(tokenExpiryTime, 10) - 5 * 60 * 1000) {
      await refreshAccessToken();
    } else {
      console.log("토큰이 아직 만료되지 않았습니다.");
    }
  }

  async function refreshAccessToken() {
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
        localStorage.setItem(
          STORAGE_KEYS.EXPIRY_TIME,
          String(Date.now() + 900 * 1000)
        );
        setToken(accessToken);
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      throw new Error(
        error instanceof Error ? error.message : `${String(error)}42줄`
      );
    }
  }
  useEffect(() => {
    const intervalId = setInterval(checkAndRefreshToken, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default TokenManager;
