import {
  Header,
  HeaderWithBackIcon,
  HeaderTransparentWithLogo,
} from "@/components/shared/Header";
import SettingIcon from "@/components/shared/icons/SettingIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import { usePathname } from "next/navigation";
import React from "react";
import handleShare from "./handleShare";

export default function HeaderReturner() {
  const pathname = usePathname();
  const headerConfig: {
    [key: string]: React.ReactNode | null;
  } = {
    "/signin": null,
    "/home": <HeaderTransparentWithLogo />,
    "/invitation": <HeaderWithBackIcon pageName="초대장" color="white" />,
    "/new": <HeaderWithBackIcon pageName="프로필 생성" />,
    "/feed": <Header pageName="추억 피드" />,
    "/hidden": <HeaderWithBackIcon pageName="피드 관리" />,
    "/record": <HeaderWithBackIcon pageName="기록하기" />,
    "/schedule": <Header pageName="모임 캘린더" />,
    "/my": pathname.endsWith("edit") ? (
      <HeaderWithBackIcon pageName="프로필 편집" />
    ) : (
      <Header pageName="My" icon={<SettingIcon />} />
    ),
    "/gathering": pathname.endsWith("gathering") ? (
      <Header pageName="나의 모임" />
    ) : pathname.endsWith("new") ? (
      <HeaderWithBackIcon pageName="모임 생성" />
    ) : (
      <HeaderWithBackIcon
        fontColor="#FFF"
        pageName="모임 상세"
        icon={
          <div className="cursor-pointer" onClick={handleShare}>
            <ShareIcon />
          </div>
        }
      />
    ),
    "/groups": pathname.endsWith("new") ? (
      <HeaderWithBackIcon pageName="그룹 생성" />
    ) : (
      <HeaderWithBackIcon pageName="나의 그룹" />
    ),
    "/card": <HeaderWithBackIcon pageName="카드 생성" />,
  };

  const matchedHeader = Object.keys(headerConfig).find((key) =>
    pathname.startsWith(key)
  );

  return matchedHeader ? headerConfig[matchedHeader] : null;
}
