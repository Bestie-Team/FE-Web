import React, { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { selectedFriendAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../shared/Modal/Modal";
import { friendReportModalAtom, modalStateAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useReport from "../report/hooks/useReport";
import { useAuth } from "../shared/providers/AuthProvider";
import Report from "../shared/Modal/Report/Report";

const ReportFriendModal = memo(
  ({
    isOpen,
    onClose,
    onReport,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onReport: (reason: { reason: string }) => void;
  }) => {
    if (!isOpen) return null;

    return (
      <Report
        title="친구를 신고하시겠어요?"
        action={onReport}
        onClose={onClose}
      />
    );
  }
);

ReportFriendModal.displayName = "ReportFriendModal";

export default function UserFriendsListContainer({
  friends,
}: {
  friends: lighty.User[];
}) {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportFriendModalOpen, setReportFriendModalOpen] = useRecoilState(
    friendReportModalAtom
  );
  const selectedFriendId = useRecoilValue(selectedFriendAtom);

  const deleteSuccessHandler = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await queryClient.invalidateQueries({
      queryKey: ["friends", userInfo?.accountId],
    });
  };

  const { mutate: deleteFriend } = useDeleteFriend({
    friendId: selectedFriendId,
    onSuccess: deleteSuccessHandler,
  });

  const { mutate: reportFriend } = useReport({
    report: { reportedId: selectedFriendId, type: "FRIEND" },
    onSuccess: deleteSuccessHandler,
    onError: (error) => lightyToast.error(error.message),
  });
  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  const MODAL_CONFIGS = {
    deleteFriend: {
      title: "친구를 삭제하시겠어요?",
      content: "복구할 수 없어요.",
      leftButton: "취소",
      rightButton: "삭제하기",
      action: () => deleteFriend(),
    },
  };

  return (
    <>
      <FriendsListContainer friends={friends} />
      <ReportFriendModal
        isOpen={reportFriendModalOpen}
        onClose={() => setReportFriendModalOpen(false)}
        onReport={reportFriend}
      />
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={MODAL_CONFIGS[modalState.type].action}
          onClose={closeModal}
        />
      )}
    </>
  );
}
