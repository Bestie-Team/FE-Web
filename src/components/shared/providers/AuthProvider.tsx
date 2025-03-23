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
import { useRouter } from "next/navigation";

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
  userDeletion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoMini | null>(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const router = useRouter();

  const initialize = async () => {
    if (userDeleted) {
      return;
    }
    setIsLoading(true);
    try {
      if (typeof window === "undefined") {
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const storedUserInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);

      // 토큰이 없으면 초기화
      if (!storedToken) {
        setToken(null);
        setUserInfo(null);
        setIsLoading(false);
        return;
      }

      // 토큰 설정
      setToken(storedToken);

      // 사용자 정보가 있으면 설정
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }

      // 토큰 유효성 검증 및 사용자 정보 업데이트
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
          // 사용자 정보를 가져오지 못했으면 로그아웃
          logout();
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        // API 오류 시 로그아웃
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!!userInfo) {
      if (typeof window !== "undefined" && userInfo.accountId) {
        window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "", {
          user_id: userInfo.accountId,
        });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    initialize();
  }, []);

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

  const login = (userInfo: lighty.LoginResponse) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userInfo.accessToken);

    const userInfoData = {
      accountId: userInfo.accountId,
      profileImageUrl: userInfo.profileImageUrl,
    };

    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfoData));

    setToken(userInfo.accessToken);
    setUserInfo(userInfoData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setToken(null);
    setUserInfo(null);

    router.push("/");
  };

  const userDeletion = () => {
    logout();
    setUserDeleted(true);
  };

  const contextValue = {
    setToken,
    token,
    userInfo,
    setUserInfo,
    login,
    logout,
    isAuthenticated: !!token && !!userInfo,
    isLoading,
    updateUserInfo,
    setUserDeleted,
    userDeletion,
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
