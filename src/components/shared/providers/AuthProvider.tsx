"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import STORAGE_KEYS from "@/constants/storageKeys";
import { UserInfo } from "@/models/user";
import * as lighty from "lighty-type";
import { getUserAuth } from "@/remote/auth";
import useUserProfile from "@/components/users/hooks/useUserProfile";
import {
  clearAuthStorage,
  getStoredAuth,
  saveAuthToStorage,
} from "@/utils/authStorage";

export type UserInfoMini = Pick<UserInfo, "accountId" | "profileImageUrl">;

interface AuthContextType {
  userInfo: UserInfoMini | null;
  login: (userInfo: lighty.LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserInfo: () => Promise<void>;
  userDeleted: boolean;
  setUserDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const { data: userProfile } = useUserProfile();

  const logout = useCallback(() => {
    clearAuthStorage();
    setUserInfo(null);
  }, []);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedAuth = await getStoredAuth();

      if (!storedAuth?.token) {
        logout();
        return;
      }

      const hasUserInfo =
        storedAuth.userInfo && Object.keys(storedAuth.userInfo).length > 0;

      if (hasUserInfo) {
        // 로컬 정보가 있으면 일단 상태로 세팅
        setUserInfo(storedAuth.userInfo);
      }

      // userInfo가 없거나 빈 객체면 서버에서 가져오기
      if (!hasUserInfo) {
        const user = await getUserAuth();
        if (user) {
          const newUserInfo = {
            accountId: user.accountId,
            profileImageUrl: user.profileImageUrl,
          };
          localStorage.setItem(
            STORAGE_KEYS.USER_INFO,
            JSON.stringify(newUserInfo)
          );
          setUserInfo(newUserInfo);
        } else {
          logout();
        }
      }
    } catch (err) {
      console.error("Auth 초기화 실패:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const updateUserInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getUserAuth();
      if (!user) {
        logout();
        return;
      }
      const newUserInfo = {
        accountId: user.accountId,
        profileImageUrl: user.profileImageUrl,
      };
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
    } catch (err) {
      console.error("updateUserInfo 실패:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const login = useCallback((loginInfo: lighty.LoginResponse) => {
    const { accessToken, accountId, profileImageUrl } = loginInfo;
    const userInfoData = { accountId, profileImageUrl };
    saveAuthToStorage(accessToken, userInfoData);
    setUserInfo(userInfoData);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (
      userProfile &&
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
        user_id: userProfile.id,
      });
    }
  }, [userProfile]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
        isAuthenticated: !!userInfo && Object.keys(userInfo).length > 0,
        isLoading,
        updateUserInfo,
        userDeleted,
        setUserDeleted,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
