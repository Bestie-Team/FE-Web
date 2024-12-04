"use client";
import { HeaderWithButton } from "@/components/shared/Header";
import { usePathname } from "next/navigation";
interface Props {
  children?: React.ReactNode;
}

export const NextLayout = ({ children }: Props) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      {!pathname.includes("/signin") && (
        <HeaderWithButton pageName="프로필 생성" square={false} />
      )}
      <div className="w-[430px] mx-auto">{children}</div>
    </>
  );
};
