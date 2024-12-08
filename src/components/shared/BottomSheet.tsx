import { useState } from "react";
import Button from "./buttons/Button";
import Dimmed from "./Dimmed";
import Flex from "./Flex";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import PencilIcon from "./icons/PencilIcon";
import PicturesIcon from "./icons/PicturesIcon";
import UserIcon from "./icons/UserIcon";
import Spacing from "./Spacing";
import Text from "./Text";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function BottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  // 애니메이션 종료 핸들러
  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose(); // 애니메이션이 끝난 후 모달 닫기
      setIsClosing(false);
    }
  };

  // 모달 바깥 클릭 핸들러
  const handleBackdropClick = () => {
    setIsClosing(true); // 닫는 애니메이션 활성화
  };
  if (open === false) return null;

  return (
    <Dimmed onClick={handleBackdropClick} isClosing={isClosing}>
      {/**BottomSheetContainer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          `${isClosing ? "animate-slideOut" : "animate-slideIn"}`,
          "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-[var(--bottomSheet-zindex)] pb-[34px]"
        )}
        onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 시 호출
      >
        <Flex direction="column">
          <Flex
            justify="center"
            style={{ paddingTop: "6px", paddingBottom: "18px" }}
          >
            <RectIcon />
          </Flex>
          <Flex
            direction="column"
            style={{ padding: "24px", paddingTop: "4px" }}
          >
            <Text className="text-T3">추억을 만들어볼까요?</Text>
            <Spacing size={20} />
            <ActionItem
              onClick={() => {
                router.push("/record");
              }}
              icon={<UserIcon width="18" height="18" color="#fff" />}
              title={"모임 생성하기"}
              subTitle="모임을 만들고 친구들에게 모임 초대장을 보내요"
            />
            <Spacing size={20} />
            <ActionItem
              icon={<PencilIcon />}
              title={"추억 기록하기"}
              subTitle="소중한 모임 추억을 기록하고 공유할 수 있어요"
            />
            <Spacing size={20} />
            <ActionItem
              icon={<PicturesIcon />}
              title={"추억 카드 만들기"}
              subTitle="소중한 모임 추억을 기록하고 공유할 수 있어요"
            />
          </Flex>
        </Flex>
      </div>
    </Dimmed>
  );
}

function ActionItem({
  title,
  onClick,
  subTitle,
  icon,
}: {
  title: string;
  onClick?: () => void;
  subTitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <Flex style={{ paddingTop: "12px", paddingBottom: "12px", width: "full" }}>
      <Button className="bg-grayscale-900 w-[40px] h-[40px] p-[11px] rounded-full cursor-default">
        {icon}
      </Button>
      <Spacing size={12} direction="horizontal" />
      <Flex style={{ flexGrow: 1, cursor: "pointer" }} onClick={onClick}>
        <Flex direction="column" style={{ flexGrow: 1 }}>
          <span className="text-T5">{title}</span>
          <Spacing size={4} />
          <span className="text-C2 text-grayscale-400">{subTitle}</span>
        </Flex>
        <Spacing size={12} />
        <ArrowRightIcon />
      </Flex>
    </Flex>
  );
}

function RectIcon() {
  return (
    <svg
      width="58"
      height="4"
      viewBox="0 0 58 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Rectangle 181"
        opacity="0.55"
        d="M0 2C0 0.895431 0.895431 0 2 0H56C57.1046 0 58 0.895431 58 2C58 3.10457 57.1046 4 56 4H2C0.895432 4 0 3.10457 0 2Z"
        fill="#9EA1A4"
        style={{
          fill: "#9EA1A4",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
