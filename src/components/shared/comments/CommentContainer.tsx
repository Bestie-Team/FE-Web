import React, { useState } from "react";
import clsx from "clsx";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";
import CommentWrapper from "./CommentWrapper";
import CommentItem from "./CommentItem";
import Input from "../inputs/Input";
import Button from "../buttons";
import ArrowUpIcon from "../icons/ArrowUpIcon";

export default function CommentContainer({ onClose }: { onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose(); // 애니메이션이 끝난 후 모달 닫기
    }
  };

  const handleBackdropClick = () => {
    setIsClosing(true); // 닫는 애니메이션 활성화
  };

  return (
    <Dimmed onClick={handleBackdropClick}>
      <div
        style={{
          willChange: "transform",
        }}
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          bottomSheetContainerStyle,
          isClosing ? "animate-slideOut" : "animate-slideIn"
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <Flex direction="column">
          <Flex justify="center" className="pt-[6px] pb-[18px]">
            <RectIcon />
          </Flex>
          <div className="pl-[24px] text-T3">댓글</div>
          <Spacing size={12} />
          <CommentWrapper>
            {[1, 2, 3, 4, 5, 1, 1].map((_, index) => (
              <React.Fragment key={`commentItem${index}`}>
                <CommentItem />
                <Spacing size={16} />
              </React.Fragment>
            ))}
          </CommentWrapper>
          <div className={inputWrapperStyle}>
            <Input
              value={newComment}
              placeholder="댓글 달기"
              displayLength={false}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <Button className={submitButtonStyle}>
              <ArrowUpIcon />
            </Button>
          </div>
        </Flex>
      </div>
    </Dimmed>
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

const bottomSheetContainerStyle =
  "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-10 pb-[34px]";

const inputWrapperStyle = "relative px-[20px] py-[12px] w-full";

const submitButtonStyle =
  "bg-base-white p-[8px] rounded-full absolute right-[39px] top-[20.5px]";
