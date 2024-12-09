"use client";
import {
  Header,
  HeaderTransparent,
  HeaderTransparentWithLogo,
} from "@/components/shared/Header";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}

export const NextLayout = ({ children }: Props) => {
  const pathname = usePathname();
  console.log(pathname);

  function header() {
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
    if (pathname.startsWith("/record")) {
      return <HeaderTransparent pageName="기록하기" />;
    }
  }
  return (
    <RecoilRoot>
      {header()}
      <div style={{ scrollbarWidth: "none" }} className="max-w-[430px] mx-auto">
        {children}
      </div>
    </RecoilRoot>
  );
};
