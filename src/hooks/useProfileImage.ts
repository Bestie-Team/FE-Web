import { useState, useEffect } from "react";
import STORAGE_KEYS from "@/constants/storageKeys";

interface UserInfo {
  accountId: string;
  profileImageUrl: string;
}

export const useProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const imageUrlAfterSignup = localStorage.getItem(
      STORAGE_KEYS.PROFILE_IMAGE_URL
    );
    const userInfoStr = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

    if (imageUrlAfterSignup) {
      setProfileImageUrl(imageUrlAfterSignup);
      return;
    }

    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      setProfileImageUrl(userInfo.profileImageUrl);
    }
  }, []);

  return profileImageUrl;
};
