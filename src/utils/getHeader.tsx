import {
  BackgroundReversibleHeader,
  Header,
  HeaderWithBackBtn,
} from "@/components/shared/Header";
import ShareIcon from "@/components/shared/Icon/ShareIcon";
import React from "react";
import handleShare from "./handleShare";

export default function getHeader(pathname: string) {
  const headerConfig: {
    [key: string]: React.ReactNode | null;
  } = {
    "/signin": null,
    "/home": <BackgroundReversibleHeader />,
    "/invitation": <HeaderWithBackBtn pageName="초대장" color="white" />,
    "/signup": <HeaderWithBackBtn pageName="프로필 생성" color="white" />,
    "/feed": <Header pageName="추억피드" />,
    "/hidden": <HeaderWithBackBtn pageName="피드 관리" color="white" />,
    "/record": <HeaderWithBackBtn pageName="기록하기" />,
    "/schedule": <Header pageName="모임 캘린더" />,
    "/my": pathname.endsWith("edit") ? (
      <HeaderWithBackBtn pageName="프로필 편집" />
    ) : (
      <Header pageName="My" />
    ),
    "/gathering": pathname.endsWith("gathering") ? (
      <Header pageName="나의 모임" />
    ) : pathname.endsWith("new") ? (
      <HeaderWithBackBtn pageName="모임 생성" />
    ) : (
      <HeaderWithBackBtn
        fontColor="#FFF"
        pageName="모임 상세"
        icon={
          <div className="cursor-pointer" onClick={handleShare}>
            <ShareIcon />
          </div>
        }
      />
    ),
    "/groups":
      pathname.endsWith("new") || pathname.endsWith("done") ? (
        <HeaderWithBackBtn pageName="그룹 생성" />
      ) : (
        <HeaderWithBackBtn pageName="나의 그룹" color="#f4f4f4" />
      ),
  };

  const matchedHeader = Object.keys(headerConfig).find((key) =>
    pathname.startsWith(key)
  );

  return matchedHeader ? headerConfig[matchedHeader] : null;
}
