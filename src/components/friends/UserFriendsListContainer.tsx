import React, { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as lighty from "lighty-type";
import { friendsModalStateAtom, selectedFriendAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../shared/Modal/Modal";
import { friendDeleteModalAtom, friendReportModalAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useReport from "../report/hooks/useReport";
import ReportModal from "../shared/Modal/ReportModal";
import { useAuth } from "../shared/providers/AuthProvider";

const DeleteFriendModal = memo(
  ({
    isOpen,
    onClose,
    onDelete,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <Modal
        title="친구를 삭제하시겠어요?"
        content="복구할 수 없어요."
        left="취소"
        right="삭제하기"
        action={onDelete}
        onClose={onClose}
      />
    );
  }
);

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
      <ReportModal
        title="친구를 신고하시겠어요?"
        action={onReport}
        onClose={onClose}
      />
    );
  }
);

DeleteFriendModal.displayName = "DeleteFriendModal";
ReportFriendModal.displayName = "ReportFriendModal";

export default function UserFriendsListContainer({
  friends,
}: {
  friends: lighty.User[];
}) {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useRecoilState(friendsModalStateAtom);
  const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useRecoilState(
    friendDeleteModalAtom
  );
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

  const handleCloseDeleteModal = () => {
    setDeleteFriendModalOpen(false);
  };

  const handleCloseReportModal = () => {
    setReportFriendModalOpen(false);
  };

  return (
    <>
      <FriendsListContainer
        friends={friends}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <DeleteFriendModal
        isOpen={deleteFriendModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={deleteFriend}
      />
      <ReportFriendModal
        isOpen={reportFriendModalOpen}
        onClose={handleCloseReportModal}
        onReport={reportFriend}
      />
    </>
  );
}
