"use client";
import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TermOfUse from "@/components/terms/TermOfUse";
import { useState } from "react";
import Link from "next/link";

export default function MyPage() {
  const hasShadow = useScrollShadow();
  const [open, setOpen] = useState(false);
  const [privatePolicyOpen, setPrivatePolicyOpen] = useState(false);

  const onClickTermOfUse = (term?: string) => {
    if (term && term === "privatePolicy") {
      setPrivatePolicyOpen(true);
    } else setOpen(true);
  };

  return (
    <div className="">
      <Flex
        direction="column"
        className="bg-base-white overflow-y-scroll no-scrollbar"
      >
        <div
          className={clsx(
            styles.headerWrapper,
            hasShadow ? "shadow-bottom" : "",
            open || privatePolicyOpen ? "" : "z-10"
          )}
        >
          {HeaderReturner()}
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
      </Flex>
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
    "max-w-[430px] fixed w-full px-[20px] transition-shadow duration-300",
  letter: "cursor-pointer",

  termsWrapper: "w-full py-[8px] px-[20px] text-C5 text-grayscale-300",
};
