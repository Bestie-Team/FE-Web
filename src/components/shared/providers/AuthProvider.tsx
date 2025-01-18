import STORAGE_KEYS from "@/constants/storageKeys";
import { UserInfo } from "@/models/user";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export type UserInfoMini = Pick<UserInfo, "accountId" | "profileImageUrl">;

interface AuthContextType {
  token: string | null;
  userInfo: UserInfoMini | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedUserInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

    if (savedToken != null) {
      setToken(savedToken);
    }

    if (savedUserInfo != null) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
