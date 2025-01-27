"use client";

import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Spacing from "@/components/shared/Spacing";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TermOfUse from "@/components/terms/TermOfUse";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import getHeader from "@/utils/getHeader";
import STORAGE_KEYS from "@/constants/storageKeys";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function MyPage() {
  const [scrollReady, setScrollReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [privatePolicyOpen, setPrivatePolicyOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState<
    { profileImageUrl: string; accountId: string } | undefined
  >(undefined);

  const { data: user, isFetching, isError } = useUserDetail();
  const { logout } = useAuth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader("/my");
  const hasShadow = useScrollShadow(scrollReady ? containerRef : undefined);

  const onClickTermOfUse = (term?: string) => {
    if (term === "privatePolicy") {
      setPrivatePolicyOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleLogout = async () => {
    router.push("/");
    logout();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    const imageUrlFromSignup = localStorage.getItem(
      STORAGE_KEYS.PROFILE_IMAGE_URL
    );
    const userInfoSession = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

    if (refParam === "signup" && imageUrlFromSignup && userInfoSession) {
      const userInfo = JSON.parse(userInfoSession);
      setProfileInfo({
        profileImageUrl: imageUrlFromSignup,
        accountId: userInfo.accountId,
      });
    } else if (user) {
      setProfileInfo({
        profileImageUrl: user.profileImageUrl as string,
        accountId: user.accountId,
      });
    } else if (userInfoSession) {
      const userInfo = JSON.parse(userInfoSession);
      setProfileInfo(userInfo);
    }
  }, [user]);

  useEffect(() => {
    if (!isFetching && !isError) {
      setScrollReady(true);
    }
  }, [isFetching, isError]);

  if (!user) return null;

  return (
    <div ref={containerRef}>
      <div
        className={clsx(
          styles.headerWrapper,
          hasShadow && "shadow-bottom",
          open || privatePolicyOpen ? "" : "z-20"
        )}
      >
        {header}
      </div>
      <Spacing size={68} />
      {isFetching || isError ? (
        <DotSpinner />
      ) : (
        <>
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
          <div className={styles.termsWrapper}>
            <Link
              href="https://curious-lettuce-6c7.notion.site/155c4ba8c0728033941adeca5c02f345"
              target="_blank"
              onClick={() => onClickTermOfUse()}
              className={clsx("mr-[13px]", styles.letter)}
            >
              <ins>이용약관</ins>
            </Link>
            <Link
              href="https://curious-lettuce-6c7.notion.site/154c4ba8c07280008378ce95a2effe3a"
              target="_blank"
              onClick={() => onClickTermOfUse("privatePolicy")}
              className={styles.letter}
            >
              <ins>개인 정보 처리방침</ins>
            </Link>
          </div>
          <Spacing size={120} />
          {(open || privatePolicyOpen) && (
            <TermOfUse
              label={open ? "이용 약관" : "개인 정보 처리방침"}
              onClick={() => {
                if (open) {
                  setOpen(false);
                } else {
                  setPrivatePolicyOpen(false);
                }
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  headerWrapper:
    "z-20 h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  letter: "cursor-pointer",
  termsWrapper: "w-full py-2 px-5 text-C5 text-grayscale-300",
};
