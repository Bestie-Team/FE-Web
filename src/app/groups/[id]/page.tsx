"use client";

import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import useDeleteGroup from "@/components/groups/hooks/useDeleteGroup";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAddGroupMember from "@/components/groups/hooks/useAddGroupMember";
import Modal from "@/components/shared/Modal/Modal";
import { modalStateAtom } from "@/atoms/modal";
import useExitGroup from "@/components/groups/hooks/useExitGroup";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { User } from "lighty-type";
import { selectedGroupDetailAtom } from "@/atoms/group";
import ErrorPage from "@/components/shared/ErrorPage";
import Flex from "@/components/shared/Flex";
import GroupOptions from "@/components/groups/GroupOptions";
import ArrowLeftIcon from "@/components/shared/Icon/ArrowLeftIcon";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import GroupDetailContainer from "@/components/groups/GroupDetailContainer";
import dynamic from "next/dynamic";
import { selectedFriendsAtom } from "@/atoms/friends";

const SelectFriendsContainer = dynamic(
  () => import("@/components/friends/SelectFriendsContainer"),
  {
    ssr: false,
    loading: () => <DotSpinner />,
  }
);

interface GroupDetailPageProps {
  params: {
    id: string;
  };
}

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userInfo } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const [selectedFriends, setSelectedFriends] =
    useRecoilState(selectedFriendsAtom);
  const reset = useResetRecoilState(selectedFriendsAtom);
  const selectedGroup = useRecoilValue(selectedGroupDetailAtom);

  const [openList, setOpenList] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDeleteSuccess = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["groups"] }),
      queryClient.invalidateQueries({ queryKey: ["user/detail"] }),
    ]);
    lightyToast.success("그룹 나가기/삭제 성공");
    router.replace("/social");
  };

  const addMemberSuccessHandler = async (data: { message: string }) => {
    await queryClient.invalidateQueries({
      queryKey: ["groups"],
    });
    lightyToast.success(data.message);
    setSelectedFriends([]);
  };

  const { mutate: deleteGroup } = useDeleteGroup({
    groupId: params.id,
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: exitGroup } = useExitGroup({
    groupId: params.id,
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: addMember } = useAddGroupMember({
    groupId: params.id,
    friendIds:
      selectedFriends && selectedFriends.length > 0
        ? selectedFriends?.map((friend) => friend.id)
        : null,
    onSuccess: addMemberSuccessHandler,
  });

  useEffect(() => {
    setIsClient(true);

    return reset();
  }, [isClient]);

  if (!isClient || selectedGroup.id == "") return <ErrorPage />;

  if (openList === true) {
    return (
      <SelectFriendsContainer
        type="group"
        paddingTop="20px"
        action={() => {
          setOpenList(false);
          addMember();
        }}
      />
    );
  }
  const { description, members, owner, groupImageUrl } = selectedGroup;

  const groupEdit: GroupEditProps = {
    id: selectedGroup.id,
    name: selectedGroup.name,
    description: selectedGroup.description,
    groupImageUrl: selectedGroup.groupImageUrl,
    members: selectedGroup.members,
  };
  const { accountId } = owner;
  const isOwner = accountId === userInfo?.accountId;

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  const MODAL_CONFIGS = {
    deleteGroup: {
      title: "친구를 삭제하시겠어요?",
      content: "복구할 수 없어요.",
      leftButton: "취소",
      rightButton: "삭제하기",
      action: () => deleteGroup(),
    },
    exitGroup: {
      title: "그룹을 나가시겠어요?",
      content: "",
      leftButton: "취소",
      rightButton: "나가기",
      action: () => exitGroup(),
    },
  };

  return (
    <Flex direction="column" className="w-full min-h-dvh bg-base-white">
      <Flex align="center" className={styles.headerWrapper}>
        <div
          className="cursor-pointer pl-[17px] pr-[3px] mr-[6px]"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon color="white" />
        </div>
        <span className={styles.headerFont}>그룹 상세</span>
        <GroupOptions isOwner={isOwner} group={groupEdit} />
      </Flex>
      <GroupDetailContainer
        groupImageUrl={groupImageUrl}
        setIsLoaded={setIsLoaded}
        isLoaded={isLoaded}
        selectedGroup={selectedGroup}
        owner={owner}
        description={description}
        members={members}
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
    </Flex>
  );
}

const styles = {
  headerWrapper:
    "z-20 fixed w-full before:h-[48px] left-0 top-0 pr-5 items-center",
  headerFont: "flex-grow text-T3 text-base-white",
  divider: "flex-shrink-0 h-[1px] w-full bg-grayscale-50",
  dividerWrapper: "pl-[26px] pr-[14px] bg-base-white",
  title: "font-[700] text-base leading-[20.8px] flex-grow",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
  button:
    "bg-grayscale-50 active:bg-grayscale-100 transition duration-75 px-3 py-2 rounded-lg text-T6",
};
