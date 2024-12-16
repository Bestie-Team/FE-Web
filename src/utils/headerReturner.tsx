import {
  Header,
  HeaderTransparent,
  HeaderTransparentWithLogo,
} from "@/components/shared/Header";
import SettingIcon from "@/components/shared/icons/SettingIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderReturner() {
  const pathname = usePathname();
  const headerConfig: {
    [key: string]: React.ReactNode | null;
  } = {
    "/signin": null,
    "/home": <HeaderTransparentWithLogo />,
    "/invitation": <HeaderTransparent pageName="초대장" color="white" />,
    "/new": <HeaderTransparent pageName="프로필 생성" square={false} />,
    "/feed": <Header pageName="추억 피드" />,
    "/hidden": <HeaderTransparent pageName="피드 관리" />,
    "/record": <HeaderTransparent pageName="기록하기" />,
    "/schedule": <Header pageName="모임 캘린더" />,
    "/my": <Header pageName="My" icon={<SettingIcon />} />,
    "/gathering": (
      <HeaderTransparent
        fontColor="#FFF"
        pageName="모임 상세"
        icon={<ShareIcon />}
      />
    ),
  };

  const matchedHeader = Object.keys(headerConfig).find((key) =>
    pathname.startsWith(key)
  );

  return matchedHeader ? headerConfig[matchedHeader] : null;
}
