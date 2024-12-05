"use client";
import { Header, HeaderTransparent } from "@/components/shared/Header";
import { usePathname } from "next/navigation";
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
    if (pathname.startsWith("/new")) {
      return <HeaderTransparent pageName="프로필 생성" square={false} />;
    }
    if (pathname.startsWith("/feed")) {
      return <Header pageName="추억 피드" />;
    }
  }
  return (
    <>
      {header()}
      <div className="w-[430px] mx-auto">{children}</div>
    </>
  );
};
