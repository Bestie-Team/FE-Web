import React, { useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import { useRouter } from "next/navigation";
import Text from "../Text";
import ActionItem from "./ActionItem";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import { useSetRecoilState } from "recoil";
import { recordStepAtom } from "@/atoms/record";
import PhotoIcon from "../Icon/PhotoIcon";
import CameraIcon from "../Icon/CameraIcon";

export default function PhotoSelectBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const setStep = useSetRecoilState(recordStepAtom);
  const [down, setDown] = useState(false);
  const [link, setLink] = useState("/");

  const handleClose = () => {
    if (link == "/record") {
      setStep(1);
    }
    onClose();
    router.push(link);
  };

  return (
    <BottomSheetWrapper onClose={handleClose} open={open} down={down}>
      <Flex direction="column" className="px-6 pb-6">
        <Text className="text-T3">이미지 추가</Text>
        <Spacing size={12} />
        {actions.map((action) => {
          return (
            <React.Fragment key={`${action.title}`}>
              <ActionItem
                padding="py-4"
                onClick={() => {
                  setDown(true);
                  setTimeout(() => setLink(action.link), 50);
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
    icon: <PhotoIcon />,
    title: "앨범에서 선택하기",
    link: "/record",
  },
  {
    icon: <CameraIcon />,
    title: "카메라로 촬영하기",
    link: "/card",
  },
];
