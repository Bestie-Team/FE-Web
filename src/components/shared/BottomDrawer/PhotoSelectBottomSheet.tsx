import React, { RefObject } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Text from "../Text";
import ActionItem from "./ActionItem";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import PhotoIcon from "../Icon/PhotoIcon";
import CameraIcon from "../Icon/CameraIcon";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

export default function PhotoSelectBottomSheet({
  onClose,
  onClickCamera,
  fileInputRef,
  handleImageUpload,
}: {
  onClose: () => void;
  onClickCamera: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleImageUpload: (e: any) => void;
}) {
  const handleClose = () => {
    onClose();
  };

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
              <ActionItem
                padding="py-4"
                onClick={() => {
                  onClickCamera();
                }}
                icon={action.icon}
                title={action.title}
              />
            </React.Fragment>
          );
        })}
      </Flex>
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
