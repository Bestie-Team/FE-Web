"use client";
import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import TermOfUse from "@/components/terms/TermOfUse";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import Header from "@/components/shared/Header/Header";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

const MyHeader = React.memo(
  ({
    open,
    privatePolicyOpen,
    shadow,
  }: {
    open: boolean;
    privatePolicyOpen: boolean;
    shadow: boolean;
  }) => {
    return (
      <div
        className={clsx(
          styles.headerWrapper,
          shadow && "shadow-bottom",
          open || privatePolicyOpen ? "" : "z-20"
        )}
      >
        <Header headerLabel="My" />
      </div>
    );
  }
);

MyHeader.displayName = "MyHeader";

export default function MyPage() {
  const [modalState, setModalState] = useState<
    "none" | "open" | "privatePolicy"
  >("none");
  const [profileInfo, setProfileInfo] = useState<
    { profileImageUrl: string; accountId: string } | undefined
  >(undefined);
  const { data: user } = useUserDetail();
  const { logout } = useAuth();
  const router = useRouter();
  const isPast = useScrollThreshold();

  const handleLogout = useCallback(async () => {
    router.push("/signin");
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

  if (!user) return <DotSpinner />;

  return (
    <div className="min-h-dvh w-full pt-safe-top">
      <MyHeader
        shadow={isPast}
        open={modalState === "open"}
        privatePolicyOpen={modalState === "privatePolicy"}
      />
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
          <SettingsMenu logout={handleLogout} user={user} />
          <footer className={styles.termsWrapper}>
            <span
              // href="https://curious-lettuce-6c7.notion.site/155c4ba8c0728033941adeca5c02f345"
              // target="_blank"
              onClick={() => setModalState("open")}
              className={clsx("mr-[13px]", styles.letter)}
            >
              <ins>이용약관</ins>
            </span>
            <span
              // href="https://curious-lettuce-6c7.notion.site/154c4ba8c07280008378ce95a2effe3a"
              // target="_blank"
              onClick={() => setModalState("privatePolicy")}
              className={styles.letter}
            >
              <ins>개인 정보 처리방침</ins>
            </span>
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
    </div>
  );
}

const styles = {
  headerWrapper:
    "z-20 h-12 fixed max-w-[430px] mx-auto w-full transition-shadow duration-300",
  letter: "cursor-pointer",
  termsWrapper: "w-full py-2 px-5 text-C5 text-grayscale-300",
};
