"use client";
import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import NavBar from "@/components/shared/NavBar";
import HeaderReturner from "@/utils/headerReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";
import TermOfUse from "@/components/terms/TermOfUse";
import { useState } from "react";

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
      <Flex direction="column" className="bg-base-white">
        <div
          className={clsx(
            headerWrapperStyle,
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
        <div className={termsWrapperStyle}>
          <ins
            onClick={() => {
              onClickTermOfUse();
            }}
            className={clsx("mr-[13px]", letterStyle)}
          >
            이용약관
          </ins>
          <ins
            onClick={() => {
              onClickTermOfUse("privatePolicy");
            }}
            className={letterStyle}
          >
            개인 정보 처리방침
          </ins>
        </div>
        <Spacing size={80} />
        <NavBar />
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

const headerWrapperStyle =
  "max-w-[430px] fixed w-full px-[20px] transition-shadow duration-300";

const letterStyle = "cursor-pointer";

const termsWrapperStyle =
  "w-full py-[8px] px-[20px] text-C5 text-grayscale-300";
