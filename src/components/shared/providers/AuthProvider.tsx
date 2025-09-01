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
  token: string | null;
  userInfo: UserInfoMini | null;
  login: (userInfo: lighty.LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserInfo: () => Promise<void>;
  userDeleted: boolean;
  setUserDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const { data: userProfile } = useUserProfile();

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUserInfo(null);
  }, []);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedAuth = await getStoredAuth();
      if (!storedAuth?.token) return;

      setToken(storedAuth.token);
      setUserInfo(storedAuth.userInfo);

      try {
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
      } catch (err) {
        logout();
        console.error("Auth 검증 실패:", err);
      }
    } catch (err) {
      console.error("초기화 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const updateUserInfo = useCallback(async () => {
    try {
      setIsLoading(true);

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
    setToken(accessToken);
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
        token,
        userInfo,
        login,
        logout,
        isAuthenticated: !!token && !!userInfo,
        isLoading,
        updateUserInfo,
        userDeleted,
        setUserDeleted,
        setToken,
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
