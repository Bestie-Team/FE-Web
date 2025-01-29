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
    "/invitation": (
      <HeaderWithBackBtn pageName="초대장" color="white" backToHome={true} />
    ),
    "/signup": <HeaderWithBackBtn pageName="프로필 생성" color="white" />,
    "/feed": pathname.endsWith("edit") ? (
      <Header pageName="피드 수정" />
    ) : (
      <Header pageName="추억피드" />
    ),
    "/hidden": <HeaderWithBackBtn pageName="피드 관리" color="white" />,
    "/record": <HeaderWithBackBtn pageName="기록하기" color="#f4f4f4" />,
    "/schedule": <Header pageName="약속 캘린더" />,
    "/my": pathname.endsWith("edit") ? (
      <HeaderWithBackBtn pageName="프로필 편집" />
    ) : (
      <Header pageName="My" />
    ),
    "/gathering": pathname.endsWith("gathering") ? (
      <Header pageName="나의 약속" />
    ) : pathname.endsWith("new") ? (
      <HeaderWithBackBtn pageName="약속 생성" color="#FFF " />
    ) : (
      <HeaderWithBackBtn
        fontColor="#FFF"
        pageName="약속 상세"
        icon={
          <div className="cursor-pointer" onClick={handleShare}>
            <ShareIcon />
          </div>
        }
      />
    ),
    "/groups":
      pathname.endsWith("new") || pathname.endsWith("done") ? (
        <HeaderWithBackBtn pageName="그룹 생성" color="#FFF" />
      ) : (
        <HeaderWithBackBtn pageName="나의 그룹" color="#f4f4f4" />
      ),
    "/": <BackgroundReversibleHeader />,
    "/?ref=signup": <BackgroundReversibleHeader />,
  };

  const matchedHeader = Object.keys(headerConfig).find((key) =>
    pathname.startsWith(key)
  );

  return matchedHeader ? headerConfig[matchedHeader] : null;
}
