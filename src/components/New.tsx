"use client";
import LightyIcon from "./shared/icons/LightyIcon";
import Spacing from "./shared/Spacing";
import UploadProfileForm from "./UploadProfileForm";

export default function New() {
  return (
    <div className="flex flex-col gap-[24px] px-[24px] bg-base-white h-screen">
      <Spacing size={28} />
      <div className="flex flex-col gap-[16px]">
        <LightyIcon width="20" height="20" color={"#0A0A0A"} />
        <div className="flex flex-col gap-[7px] text-T2">
          <div>반가워요!</div>
          <div>프로필 계정을 만들어볼까요?</div>
        </div>
        <span className="text-B3 text-grayscale-500">
          프로필 사진을 등록하고, 프로필 아이디를 등록해주세요.
        </span>
      </div>
      <UploadProfileForm />
    </div>
  );
}
