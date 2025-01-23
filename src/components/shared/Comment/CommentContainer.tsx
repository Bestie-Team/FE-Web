import React, { useState } from "react";
import clsx from "clsx";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ArrowUpIcon from "../Icon/ArrowUpIcon";
import useMakeComment from "@/components/feeds/hooks/useMakeComment";
import useFeedComments from "@/components/feeds/hooks/useGetComments";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import RectIcon from "../Icon/RectIcon";
import CommentItem from "./CommentItem";

export default function CommentContainer({
  selectedFeedId,
  onClose,
}: {
  selectedFeedId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const [isClosing, setIsClosing] = useState(false);
  const [newComment, setNewComment] = useState("");

  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  const order = "DESC";
  const limit = 10;

  const { data: comments } = useFeedComments({ feedId: selectedFeedId });

  const { mutate: postComment } = useMakeComment({
    feedId: selectedFeedId,
    content: newComment,
    onSuccess: async () => {
      toast.success("댓글을 등록하였습니다.");
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId: selectedFeedId }],
      });
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds", { order, minDate, maxDate, limit }],
      });
    },
    onError: (error) => console.log(error),
  });

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
          width: "full",
          willChange: "transform",
        }}
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          styles.bottomSheetContainer,
          isClosing ? "animate-slideOut" : "animate-slideIn"
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <Flex direction="column" className="w-full">
          <Flex justify="center" className="w-full pt-[6px] pb-[18px]">
            <RectIcon />
          </Flex>
          <div className="pl-[24px] text-T3">댓글</div>
          <Spacing size={12} />
          <Flex direction="column" className={styles.commentWrapper}>
            {comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </Flex>
          <div className={styles.inputWrapper}>
            <Input
              value={newComment}
              placeholder="댓글 달기"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <Button className={styles.submitButton} onClick={postComment}>
              <ArrowUpIcon />
            </Button>
          </div>
        </Flex>
      </div>
    </Dimmed>
  );
}

const styles = {
  commentWrapper: "w-full gap-4 p-[20px] pt-[16px] h-[272px] overflow-hidden",
  bottomSheetContainer:
    "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-10 pb-[34px]",
  inputWrapper:
    "relative px-[20px] py-[12px] w-full border-t-[1px] border-grayscale-50",
  submitButton:
    "bg-base-white p-[8px] rounded-full absolute right-[39px] top-[20.5px]",
};
