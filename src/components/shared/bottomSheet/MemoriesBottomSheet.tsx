import React from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import ActionItem from "./ActionItem";
import { useRouter } from "next/navigation";
import Text from "../Text";
import UserIcon from "../icons/UserIcon";
import PencilIcon from "../icons/PencilIcon";
import PicturesIcon from "../icons/PicturesIcon";
import BottomSheetWrapper from "./BottomSheetWrapper";

export default function MemoriesBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  return (
    <BottomSheetWrapper onClose={onClose} open={open}>
      <Flex direction="column" className="p-[24px] pt-[4px]">
        <Text className="text-T3">추억을 만들어볼까요?</Text>
        {actions.map((action) => {
          return (
            <React.Fragment key={`${action.title}`}>
              <Spacing size={20} />
              <ActionItem
                onClick={() => {
                  onClose();
                  router.push(action.link);
                }}
                icon={action.icon}
                title={action.title}
                subTitle={action.subTitle}
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
    icon: <UserIcon width="18" height="18" color="#fff" />,
    title: "모임 생성하기",
    subTitle: "모임을 만들고 친구들에게 모임 초대장을 보내요",
    link: "/record",
  },
  {
    icon: <PencilIcon />,
    title: "추억 기록하기",
    subTitle: "소중한 모임 추억을 기록하고 공유할 수 있어요",
    link: "/feed",
  },
  {
    icon: <PicturesIcon />,
    title: "추억 카드 만들기",
    subTitle: "소중한 모임 추억을 기록하고 공유할 수 있어요",
    link: "/invitation",
  },
];
