import STORAGE_KEYS from "@/constants/storageKeys";

export const getStoredAuth = async () => {
  if (typeof window === "undefined") return null;

  await new Promise((resolve) => setTimeout(resolve, 300));

  for (let i = 0; i < 3; i++) {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      return {
        token,
        userInfo: userInfo ? JSON.parse(userInfo) : null,
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return null;
};

export const saveAuthToStorage = (
  token: string,
  userInfo: { accountId: string; profileImageUrl: string | null }
) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("user_info", JSON.stringify(userInfo));
};

export const clearAuthStorage = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_info");
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("user_info");
  document.cookie =
    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
