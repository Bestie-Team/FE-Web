"use client";

import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import TermOfUse from "@/components/terms/TermOfUse";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import getHeader from "@/utils/getHeader";
import STORAGE_KEYS from "@/constants/storageKeys";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { scrollProgressAtom } from "@/atoms/scroll";
import { useRecoilValue } from "recoil";

const Header = React.memo(
  ({
    open,
    privatePolicyOpen,
  }: {
    open: boolean;
    privatePolicyOpen: boolean;
  }) => {
    const scrollProgress = useRecoilValue(scrollProgressAtom);
    return (
      <header
        className={clsx(
          styles.headerWrapper,
          scrollProgress > 0.01 && "shadow-bottom",
          open || privatePolicyOpen ? "" : "z-20"
        )}
      >
        {getHeader("/my")}
      </header>
    );
  }
);

export default function MyPage() {
  const [modalState, setModalState] = useState<
    "none" | "open" | "privatePolicy"
  >("none");
  const [profileInfo, setProfileInfo] = useState<
    { profileImageUrl: string; accountId: string } | undefined
  >(undefined);

  const { data: user, isFetching, isError } = useUserDetail();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    router.push("/");
    logout();
  }, [router, logout]);

  useEffect(() => {
    const initializeProfileInfo = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get("ref");
      const imageUrlFromSignup = localStorage.getItem(
        STORAGE_KEYS.PROFILE_IMAGE_URL
      );
      const userInfoSession = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

      if (refParam === "signup" && imageUrlFromSignup && userInfoSession) {
        const userInfo = JSON.parse(userInfoSession);
        return {
          profileImageUrl: imageUrlFromSignup,
          accountId: userInfo.accountId,
        };
      }

      if (user) {
        return {
          profileImageUrl: user.profileImageUrl as string,
          accountId: user.accountId,
        };
      }

      if (userInfoSession) {
        return JSON.parse(userInfoSession);
      }

      return undefined;
    };

    setProfileInfo(initializeProfileInfo());
  }, [user]);

  if (!user) return null;

  if (isFetching || isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DotSpinner />
      </div>
    );
  }

  return (
    <div>
      <Header
        open={modalState === "open"}
        privatePolicyOpen={modalState === "privatePolicy"}
      />
      <main className="pt-[68px]">
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
        <Spacing size={16} />
        <SettingsMenu logout={handleLogout} />
        <footer className={styles.termsWrapper}>
          <Link
            href="https://curious-lettuce-6c7.notion.site/155c4ba8c0728033941adeca5c02f345"
            target="_blank"
            onClick={() => setModalState("open")}
            className={clsx("mr-[13px]", styles.letter)}
          >
            <ins>이용약관</ins>
          </Link>
          <Link
            href="https://curious-lettuce-6c7.notion.site/154c4ba8c07280008378ce95a2effe3a"
            target="_blank"
            onClick={() => setModalState("privatePolicy")}
            className={styles.letter}
          >
            <ins>개인 정보 처리방침</ins>
          </Link>
        </footer>

        <Spacing size={120} />

        {modalState !== "none" && (
          <TermOfUse
            label={modalState === "open" ? "이용 약관" : "개인 정보 처리방침"}
            onClick={() => setModalState("none")}
          />
        )}
      </main>
    </div>
  );
}

const styles = {
  headerWrapper:
    "z-20 h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  letter: "cursor-pointer",
  termsWrapper: "w-full py-2 px-5 text-C5 text-grayscale-300",
};
