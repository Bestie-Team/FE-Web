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
  console.log(pathname);
  if (pathname.startsWith("/signin")) {
    return null;
  }
  if (pathname.startsWith("/home")) {
    return <HeaderTransparentWithLogo />;
  }
  if (pathname.startsWith("/invitation")) {
    return <HeaderTransparent pageName="초대장" color="white" />;
  }
  if (pathname.startsWith("/new")) {
    return <HeaderTransparent pageName="프로필 생성" square={false} />;
  }
  if (pathname.startsWith("/feed")) {
    return <Header pageName="추억 피드" />;
  }
  if (pathname.startsWith("/hidden")) {
    return <HeaderTransparent pageName="피드 관리" />;
  }
  if (pathname.startsWith("/record")) {
    return <HeaderTransparent pageName="기록하기" />;
  }
  if (pathname.startsWith("/schedule")) {
    return <Header pageName="모임 캘린더" />;
  }
  if (pathname.startsWith("/my")) {
    return <Header pageName="My" icon={<SettingIcon />} />;
  }
  if (pathname.startsWith("/gathering")) {
    console.log("gathering");
    return (
      <HeaderTransparent
        fontColor={"#FFF"}
        pageName="모임 상세"
        icon={<ShareIcon />}
      />
    );
  }
}
