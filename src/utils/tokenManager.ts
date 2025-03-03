import STORAGE_KEYS from "@/constants/storageKeys";
import { fetchWithAuth } from "@/remote/shared";
import { useEffect } from "react";

const TokenManager = () => {
  console.log("마운트됨");
  async function checkAndRefreshToken() {
    console.log("함수실행");
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
    const deviceId = localStorage.getItem("deviceId");
    if (deviceId === null) {
      throw new Error("디바이스 아이디가 없습니다.");
    }

    try {
      const response = await fetchWithAuth("/auth/token", {
        method: "GET",
        headers: {
          deviceId: deviceId,
        },
      });

      const data = await response.json();
      const { access_token } = data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenExpiryTime", String(Date.now() + 900 * 1000));
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }
  useEffect(() => {
    console.log("토큰 체크");
    const intervalId = setInterval(checkAndRefreshToken, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default TokenManager;
