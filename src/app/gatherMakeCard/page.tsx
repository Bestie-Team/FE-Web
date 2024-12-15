"use client";

import InvitationGather from "@/components/gathering/invitationGather";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import ArrowLeftIcon from "@/components/shared/icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GatherMakeCard() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="pt-[97px] h-screen relative">
      <div className="flex items-center gap-[10px] mb-[32px]">
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="text-neutral-950 text-lg font-semibold font-['Pretendard'] leading-normal">
          모임 생성
        </div>
      </div>
      <InvitationGather
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        openVal={true}
      />
      <FixedBottomButton
        disabled={!selectedImage}
        label="모임 생성 완료"
        onClick={() => {
          router.push("/home");
        }}
      />
    </div>
  );
}
