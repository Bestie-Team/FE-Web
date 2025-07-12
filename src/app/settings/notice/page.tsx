"use client";
import ToggleButton from "@/components/shared/Button/ToggleButton";
import Flex from "@/components/shared/Flex";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import Modal from "@/components/shared/Modal/Modal";
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";
import Spacing from "@/components/shared/Spacing";
import { patchNotificationToken } from "@/remote/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NoticeSettingPage() {
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReactNativeWebView } = useReactNativeWebView();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    requestNotificationPermission();

    const handleAppFocus = () => {
      if (isReactNativeWebView) {
        requestNotificationPermission();
      }
    };

    window.addEventListener("focus", handleAppFocus);
    return () => window.removeEventListener("focus", handleAppFocus);
  }, [isReactNativeWebView]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; notificationToken: string | null } =
        JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.AGREE_NOTIFICATION_PERMISSION) {
        setIsOn(!!message.notificationToken);
        if (message.notificationToken) {
          patchNotificationToken({ token: message.notificationToken });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-dvh pt-safe-top">
      <HeaderWithBtn
        headerLabel="알림 설정"
        onClickBackBtn={() => router.back()}
      />
      <Spacing size={48} />
      <Flex direction="column" className="pt-3">
        <SettingItem isOn={isOn} setIsOn={openModal} />
      </Flex>

      {isModalOpen && (
        <Modal
          content="'설정 > 앱 > Lighty' 에서 알림 권한을 변경해주세요"
          left="닫기"
          action={closeModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

function SettingItem({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: () => void;
}) {
  return (
    <Flex className="p-5" justify="space-between" align="center">
      <Flex direction="column" className="gap-1">
        <span className="text-T4">서비스 소식 알림</span>
        <span className="text-B4 text-[#A0A1A3]">
          초대장, 친구 신청, 그룹 초대 알림
        </span>
      </Flex>
      <ToggleButton isOn={isOn} setIsOn={setIsOn} />
    </Flex>
  );
}
