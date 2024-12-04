"use client";
import AddPhoto from "./shared/AddPhoto";
import FixedBottomButton from "./shared/buttons/FixedBottomButton";
import LightyIcon from "./shared/icons/LightyIcon";
import Input from "./shared/inputs/Input";

export default function New() {
  return (
    <div className="mx-auto w-full flex flex-col h-screen">
      <div className="flex flex-col gap-[24px] pt-[76px] px-[24px]">
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
        <div className="flex flex-col gap-[16px]">
          <div className="mx-auto py-[12px]">
            <AddPhoto />
          </div>
          <div className="flex flex-col gap-[30px]">
            <Input label="이름" placeholder="이름을 입력해주세요" />
            <div>
              <Input
                label="프로필 계정 아이디"
                placeholder="프로필 계정 아이디를 입력해주세요"
              />
              <span className="text-C2 text-grayscale-500">
                *영문 소문자, 숫자, 특수기호 (_)만 입력 가능
              </span>
            </div>
          </div>
        </div>
      </div>
      <FixedBottomButton
        label="라이티 시작하기"
        className="bg-grayscale-200"
        onClick={() => console.log("")}
      />
    </div>
  );
}
