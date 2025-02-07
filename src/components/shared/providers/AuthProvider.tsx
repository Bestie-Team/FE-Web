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
import { getUserAuth } from "@/remote/auth";

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

  const userAuth = async () => {
    return await getUserAuth();
  };

  useEffect(() => {
    if (userInfo == null) {
      try {
        const user = userAuth();
        user.then((value) => {
          if (value) {
            sessionStorage.setItem(
              STORAGE_KEYS.USER_INFO,
              JSON.stringify({
                accountId: value.accountId,
                profileImageUrl: value.profileImageUrl,
              })
            );
          }
        });
      } catch (error) {
        console.log("유저정보 반환 실해");
      }
    }
  }, [userInfo]);

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
