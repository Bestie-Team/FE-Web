"use client";
import SettingsMenu from "@/components/my/SettingsMenu";
import MyMainInfo from "@/components/my/MyMainInfo";
import UserProfile from "@/components/my/UserProfile";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import NavBar from "@/components/shared/NavBar";
import HeaderReturner from "@/utils/HeaderReturner";
import useScrollShadow from "@/hooks/useScrollShadow";
import clsx from "clsx";

export default function MyPage() {
  const hasShadow = useScrollShadow();
  return (
    <Flex direction="column">
      <div
        className={clsx(
          "max-w-[430px] z-10 fixed w-full px-[20px] transition-shadow duration-300",
          hasShadow ? "shadow-bottom" : ""
        )}
      >
        {HeaderReturner()}
      </div>
      <Spacing size={48} />
      <Spacing size={20} />
      <UserProfile />
      <Spacing size={12} />
      <MyMainInfo />
      <Spacing size={16} />
      <SettingsMenu />
      <div className="w-full py-[8px] px-[20px] text-C5 text-grayscale-300">
        <span className="mr-[13px] border-b-[1px] border-b-[#AEAEAE]">
          이용약관
        </span>
        <span className="border-b-[1px] border-b-[#AEAEAE]">
          개인 정보 처리방침
        </span>
      </div>
      <Spacing size={80} />
      <NavBar />
    </Flex>
  );
}
