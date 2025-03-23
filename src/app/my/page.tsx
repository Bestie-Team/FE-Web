"use client";
import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import Header from "@/components/shared/Header/Header";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import {
  openAskMobile,
  openPrivacyPolicyMobile,
  openSuggestMobile,
  openTermsMobile,
} from "@/webview/actions";
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";
import { getLogout } from "@/remote/auth";
import STORAGE_KEYS from "@/constants/storageKeys";

const MyHeader = React.memo(({ shadow }: { shadow: boolean }) => {
  return (
    <div
      className={clsx(styles.headerWrapper, shadow && "shadow-bottom", "z-20")}
    >
      <Header headerLabel="My" />
    </div>
  );
});

MyHeader.displayName = "MyHeader";

export default function MyPage() {
  const [profileInfo, setProfileInfo] = useState<
    { profileImageUrl: string; accountId: string } | undefined
  >(undefined);
  const { data: user } = useUserDetail();
  const { logout } = useAuth();
  const router = useRouter();
  const isPast = useScrollThreshold();
  const { isReactNativeWebView } = useReactNativeWebView();

  const openTermsPage = () => {
    if (isReactNativeWebView) {
      openTermsMobile();
    }
  };

  const openPrivacyPolicyPage = () => {
    if (isReactNativeWebView) {
      openPrivacyPolicyMobile();
    }
  };

  const openAskPage = () => {
    if (isReactNativeWebView) {
      openAskMobile();
    }
  };

  const openSuggestPage = () => {
    if (isReactNativeWebView) {
      openSuggestMobile();
    }
  };

  const handleLogout = useCallback(async () => {
    const deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (deviceId) {
      await getLogout(deviceId);
    }
    logout();
  }, [router, logout]);

  useEffect(() => {
    const initializeProfileInfo = () => {
      if (user && user.profileImageUrl) {
        return {
          profileImageUrl: user.profileImageUrl,
          accountId: user.accountId,
        };
      } else return undefined;
    };
    setProfileInfo((prev) => prev || initializeProfileInfo());
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-dvh w-full pt-safe-top">
      <MyHeader shadow={isPast} />
      <div>
        <main className="pt-[68px]">
          <Suspense fallback={<DotSpinner />}>
            <UserProfile
              userProfileImage={profileInfo?.profileImageUrl}
              userAccountId={profileInfo?.accountId}
              userName={user.name}
            />
            <Spacing size={12} />
            <MyMainInfo
              groupCount={user.groupCount}
              feedCount={user.feedCount}
              friendsCount={user.friendCount}
            />
          </Suspense>
          <Spacing size={16} />
          <SettingsMenu
            logout={handleLogout}
            user={user}
            openAskPageFn={openAskPage}
            openSuggestPageFn={openSuggestPage}
          />
          <footer className={styles.termsWrapper}>
            <span
              onClick={openTermsPage}
              className={clsx("mr-[13px]", styles.letter)}
            >
              <ins>이용약관</ins>
            </span>
            <span onClick={openPrivacyPolicyPage} className={styles.letter}>
              <ins>개인 정보 처리방침</ins>
            </span>
          </footer>
          <Spacing size={120} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  headerWrapper:
    "z-20 h-12 fixed max-w-[430px] mx-auto w-full transition-shadow duration-300",
  letter: "cursor-pointer",
  termsWrapper: "w-full py-2 px-5 text-C5 text-grayscale-300",
};
