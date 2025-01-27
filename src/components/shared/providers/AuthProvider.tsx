"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import STORAGE_KEYS from "@/constants/storageKeys";
import { UserInfo } from "@/models/user";
import * as lighty from "lighty-type";

export type UserInfoMini = Pick<UserInfo, "accountId" | "profileImageUrl">;

interface AuthContextType {
  token: string | null;
  userInfo: UserInfoMini | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
  login: (userInfo: lighty.LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    else {
      const userToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return userToken;
    }
  });
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(() => {
    if (typeof window === "undefined") return null;
    else {
      const savedUserInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
      return savedUserInfo ? JSON.parse(savedUserInfo) : null;
    }
  });

  const login = (userInfo: lighty.LoginResponse) => {
    setToken(userInfo.accessToken);
    setUserInfo({
      accountId: userInfo.accountId,
      profileImageUrl: userInfo.profileImageUrl,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
    setToken(null);
    setUserInfo(null);
  };

  const contextValue = {
    token,
    userInfo,
    setUserInfo,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
