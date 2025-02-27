import React, { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useFriends from "./hooks/useFriends";
import { friendsModalStateAtom, selectedFriendAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../shared/Modal/Modal";
import { friendDeleteModalAtom } from "@/atoms/modal";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import { lightyToast } from "@/utils/toast";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
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

DeleteFriendModal.displayName = "DeleteFriendModal";

export default function UserFriendsListContainer() {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useRecoilState(friendsModalStateAtom);
  const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useRecoilState(
    friendDeleteModalAtom
  );
  const selectedFriendId = useRecoilValue(selectedFriendAtom);

  const { data, loadMore, isFetching } = useFriends({
    userId: userInfo?.accountId,
  });

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

  const handleCloseModal = () => {
    setDeleteFriendModalOpen(false);
  };

  useInfiniteScroll({ isFetching, loadMore });

  if (!data || isFetching) return <DotSpinnerSmall />;

  return (
    <>
      <FriendsListContainer
        friends={data}
        // hasMore={hasNextPage}
        // loadMore={loadMore}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {
        <DeleteFriendModal
          isOpen={deleteFriendModalOpen}
          onClose={handleCloseModal}
          onDelete={deleteFriend}
        />
      }
    </>
  );
}
