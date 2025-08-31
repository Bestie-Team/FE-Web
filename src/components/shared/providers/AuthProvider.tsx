"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import STORAGE_KEYS from "@/constants/storageKeys";
import { UserInfo } from "@/models/user";
import * as lighty from "lighty-type";
import { getUserAuth } from "@/remote/auth";
import { useRouter } from "next/navigation";
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
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoMini | null>>;
  login: (userInfo: lighty.LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  updateUserInfo: () => Promise<void>;
  setUserDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  userDeleted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const { data: userProfile } = useUserProfile();
  const router = useRouter();

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUserInfo(null);
    router.push("/");
  }, [router]);

  const validateAndSetAuth = useCallback(
    async (storedToken: string, storedUserInfo: UserInfoMini | null) => {
      setToken(storedToken);
      if (storedUserInfo) {
        setUserInfo(storedUserInfo);
      }

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
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        logout();
      }
    },
    [logout]
  );

  const initialize = useCallback(async () => {
    if (userDeleted) return;

    setIsLoading(true);
    try {
      const storedAuth = await getStoredAuth();
      if (storedAuth) {
        await validateAndSetAuth(storedAuth.token, storedAuth.userInfo);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userDeleted, validateAndSetAuth]);

  const updateUserInfo = async (): Promise<void> => {
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
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      logout();
    }
  };

  const login = (loginInfo: lighty.LoginResponse) => {
    const { accessToken, accountId, profileImageUrl } = loginInfo;
    const userInfoData = { accountId, profileImageUrl };

    saveAuthToStorage(accessToken, userInfoData);
    setToken(accessToken);
    setUserInfo(userInfoData);
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (userProfile && typeof window !== "undefined") {
      window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
        user_id: userProfile.id,
      });
    }
  }, [userProfile]);

  const contextValue = {
    token,
    userInfo,
    setUserInfo,
    login,
    logout,
    isAuthenticated: !!token && !!userInfo,
    setToken,
    isLoading,
    updateUserInfo,
    setUserDeleted,
    userDeleted,
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
