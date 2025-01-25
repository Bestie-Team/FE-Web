import { useState, useEffect } from "react";
import STORAGE_KEYS from "@/constants/storageKeys";

interface UserInfo {
  accountId: string;
  profileImageUrl: string;
}

export const useProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  if (typeof window === "undefined") return null;
  useEffect(() => {
    const userInfoStr = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (userInfoStr) {
      console.log(userInfoStr);
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      setProfileImageUrl(userInfo.profileImageUrl);
      return;
    }
  }, []);

  return profileImageUrl;
};
