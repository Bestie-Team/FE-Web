"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import STORAGE_KEYS from "@/constants/storageKeys";
import { UserInfo } from "@/models/user";

export type UserInfoMini = Pick<UserInfo, "accountId" | "profileImageUrl">;

interface AuthContextType {
  token: string | null;
  userInfo: UserInfoMini | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
  login: (authToken: string, user: UserInfoMini) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  const login = (authToken: string, user: UserInfoMini) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
    sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
    setToken(authToken);
    setUserInfo(user);
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
