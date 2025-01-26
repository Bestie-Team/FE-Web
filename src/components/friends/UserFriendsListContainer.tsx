import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useFriends from "./hooks/useFriends";
import { friendsModalStateAtom, selectedFriendAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "../shared/Modal/Modal";
import { friendDeleteModalAtom } from "@/atoms/modal";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function UserFriendsListContainer() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useRecoilState(friendsModalStateAtom);
  const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useRecoilState(
    friendDeleteModalAtom
  );
  const selectedFriendId = useRecoilValue(selectedFriendAtom);

  const { data, loadMore, hasNextPage, isFetching } = useFriends();

  const { mutate: deleteComment } = useDeleteFriend({
    friendId: selectedFriendId,
    onSuccess: async () => {
      toast.success("친구를 삭제했습니다");
      await queryClient.invalidateQueries({
        queryKey: ["friends", { accountId: "aaaa", limit: 20 }],
      });
    },
  });

  if (!data || isFetching) return <DotSpinnerSmall />;
  return (
    <>
      <FriendsListContainer
        friends={data}
        hasMore={hasNextPage}
        loadMore={loadMore}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {deleteFriendModalOpen ? (
        <Modal
          title="친구를 삭제하시겠어요?"
          content=" 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteComment()}
          onClose={() => setDeleteFriendModalOpen(false)}
        />
      ) : null}
    </>
  );
}
