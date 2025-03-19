"use client";
import ToggleButton from "@/components/shared/Button/ToggleButton";
import Flex from "@/components/shared/Flex";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import Spacing from "@/components/shared/Spacing";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NoticeSettingPage() {
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  return (
    <div className="min-h-dvh pt-safe-top">
      <HeaderWithBtn
        headerLabel="알림 설정"
        onClickBackBtn={() => router.back()}
      />
      <Spacing size={48} />
      <div className="pt-safe-top">
        <Flex direction="column" className="pt-3">
          <SettingItem isOn={isOn} setIsOn={setIsOn} />
        </Flex>
      </div>
    </div>
  );
}

function SettingItem({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Flex className="p-5" justify="space-between" align="center">
      <Flex direction="column" className="gap-1">
        <span className="text-T4">서비스 소식 알림</span>
        <span className="text-B4">초대장, 친구 신청, 그룹 초대 알림</span>
      </Flex>
      <ToggleButton isOn={isOn} setIsOn={setIsOn} />
    </Flex>
  );
}
