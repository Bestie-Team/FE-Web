import React, { RefObject, useEffect, useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Text from "../Text";
import ActionItem from "./ActionItem";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import PhotoIcon from "../Icon/PhotoIcon";
import CameraIcon from "../Icon/CameraIcon";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import { useReactNativeWebView } from "../providers/ReactNativeWebViewProvider";
import { requestCameraPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";
import Modal from "../Modal/Modal";

export default function PhotoSelectBottomSheet({
  onClose,
  fileInputRef,
  cameraInputRef,
  handleImageUpload,
}: {
  onClose: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  cameraInputRef: RefObject<HTMLInputElement>;
  handleImageUpload: (e: any) => void;
}) {
  const handleClose = () => {
    onClose();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReactNativeWebView } = useReactNativeWebView();

  const closeModal = () => setIsModalOpen(false);

  const onClickCamera = () => {
    if (isReactNativeWebView) {
      requestCameraPermission();
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.CAMERA_OPEN) {
        cameraInputRef.current?.click();
      }
      if (message.type === WEBVIEW_EVENT.CAMERA_PERMISSION_DENIED) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <BottomSheetWrapper onClose={handleClose}>
      <Flex direction="column" className="px-6 pb-6">
        <Text className="text-T3">이미지 추가</Text>
        <Spacing size={12} />
        <label className="flex gap-3 py-3 w-full active:bg-grayscale-100 transition duration-75">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
          <div className="bg-grayscale-900 w-10 h-10 flex justify-center items-center rounded-full cursor-default">
            <PhotoIcon />
          </div>
          <Flex className="gap-3 flex-grow cursor-pointer items-center">
            <Flex direction="column" className="gap-1 flex-grow items-start">
              <span className="text-T5">앨범에서 선택하기</span>
            </Flex>
            <ArrowRightIcon />
          </Flex>
        </label>
        {actions.map((action) => {
          return (
            <React.Fragment key={`${action.title}`}>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
              <ActionItem
                padding="py-4"
                onClick={onClickCamera}
                icon={action.icon}
                title={action.title}
              />
            </React.Fragment>
          );
        })}
      </Flex>

      {isModalOpen && (
        <Modal
          content="'설정 > 앱 > Lighty' 에서 카메라 권한을 허용해주세요"
          left="닫기"
          action={closeModal}
          onClose={closeModal}
        />
      )}
    </BottomSheetWrapper>
  );
}

const actions = [
  {
    icon: <CameraIcon />,
    title: "카메라로 촬영하기",
    link: "/card",
  },
];
