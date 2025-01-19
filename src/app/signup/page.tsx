"use client";
import LightyIcon from "@/components/shared/Icon/LightyIcon";
import Spacing from "@/components/shared/Spacing";
import UploadProfileForm from "@/components/UploadProfileForm";
import getHeader from "@/utils/getHeader";
import { usePathname } from "next/navigation";

export default function SignupPage() {
  const pathname = usePathname();
  const header = getHeader(pathname);
  return (
    <div className="flex flex-col gap-[24px] bg-base-white h-screen">
      {header}
      <Spacing size={28} />
      <div className={styles.container}>
        <LightyIcon width="20" height="20" color={"#0A0A0A"} />
        <div className={styles.greeting}>
          <div>반가워요!</div>
          <div>프로필 계정을 만들어볼까요?</div>
        </div>
        <span className="text-B3 text-grayscale-500">
          프로필 사진을 등록하고, 프로필 아이디를 등록해주세요.
        </span>
        <UploadProfileForm />
      </div>
    </div>
  );
}

const styles = {
  container: "flex flex-col gap-[16px] px-[24px]",
  greeting: "flex flex-col gap-[7px] text-T2",
};
