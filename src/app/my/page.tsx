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
import { usePathname } from "next/navigation";
import getHeader from "@/utils/getHeader";

export default function MyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const header = getHeader(pathname);
  const hasShadow = useScrollShadow(containerRef);
  const [open, setOpen] = useState(false);
  const [privatePolicyOpen, setPrivatePolicyOpen] = useState(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  console.log("profileImageUrl", profileImageUrl);

  const onClickTermOfUse = (term?: string) => {
    if (term && term === "privatePolicy") {
      setPrivatePolicyOpen(true);
    } else setOpen(true);
  };

  useEffect(() => {
    setIsClient(true);
    const storedImageUrl = localStorage.getItem("profile_image_url") as string;
    setProfileImageUrl(storedImageUrl);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="h-screen bg-base-white overflow-y-scroll no-scrollbar"
    >
      <div
        className={clsx(
          styles.headerWrapper,
          hasShadow ? "shadow-bottom" : "",
          open || privatePolicyOpen ? "" : "z-10"
        )}
      >
        {header}
      </div>
      <Spacing size={68} />
      <UserProfile />
      <Spacing size={12} />
      <MyMainInfo />
      <Spacing size={16} />
      <SettingsMenu />
      <div className={styles.termsWrapper}>
        <Link
          href={
            "https://curious-lettuce-6c7.notion.site/155c4ba8c0728033941adeca5c02f345"
          }
          target="_blank"
          onClick={() => {
            onClickTermOfUse();
          }}
          className={clsx("mr-[13px]", styles.letter)}
        >
          <ins>이용약관</ins>
        </Link>
        <Link
          href={
            "https://curious-lettuce-6c7.notion.site/154c4ba8c07280008378ce95a2effe3a"
          }
          target="_blank"
          onClick={() => {
            onClickTermOfUse("privatePolicy");
          }}
          className={styles.letter}
        >
          <ins>개인 정보 처리방침</ins>
        </Link>
      </div>
      <Spacing size={80} />
      {open || privatePolicyOpen ? (
        <TermOfUse
          label={open ? "이용 약관" : "개인 정보 처리방침"}
          onClick={() => {
            if (open) {
              setOpen(false);
            } else setPrivatePolicyOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-[48px] fixed max-w-[430px] w-full transition-shadow duration-300",
  letter: "cursor-pointer",

  termsWrapper: "w-full py-[8px] px-[20px] text-C5 text-grayscale-300",
};
