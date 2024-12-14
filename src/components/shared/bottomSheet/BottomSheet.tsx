import React, { useState } from "react";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import PencilIcon from "../icons/PencilIcon";
import PicturesIcon from "../icons/PicturesIcon";
import UserIcon from "../icons/UserIcon";
import Spacing from "../Spacing";
import Text from "../Text";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import ActionItem from "./ActionItem";
import RectIcon from "../icons/RectIcon";

export default function BottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
      setIsClosing(false);
    }
  };

  const handleBackdropClick = () => {
    setIsClosing(true);
  };
  if (open === false) return null;

  return (
    <Dimmed onClick={handleBackdropClick} isClosing={isClosing}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          containerStyle,
          `${isClosing ? "animate-slideOut" : "animate-slideIn"}`
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <Flex direction="column">
          <Flex justify="center" className="pt-[6px] pb-[18px]">
            <RectIcon />
          </Flex>
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
        </Flex>
      </div>
    </Dimmed>
  );
}

const containerStyle =
  "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-[var(--bottomSheet-zIndex)] pb-[34px]";

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
