"use client";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupBannerContainer from "@/components/groups/GroupBannerContainer";
import Flex from "@/components/shared/Flex";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Spacing from "@/components/shared/Spacing";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import PencilIcon from "@/components/shared/Icon/PencilIcon";
import GroupInfoContainer from "@/components/groups/GroupInfoContainer";
import { useRecoilState, useResetRecoilState } from "recoil";
import useDeleteGroup from "@/components/groups/hooks/useDeleteGroup";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SelectFriendsContainer from "@/components/friends/SelectFriendsContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import { selectedFriendsAtom } from "@/atoms/friends";
import useAddGroupMember from "@/components/groups/hooks/useAddGroupMember";
import Modal from "@/components/shared/Modal/Modal";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { groupDeleteModalAtom, groupExitModalAtom } from "@/atoms/modal";
import useExitGroup from "@/components/groups/hooks/useExitGroup";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import LeaderContainer from "@/components/shared/LeaderContainer";
import { User } from "lighty-type";

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
  const [isClient, setIsClient] = useState(false);
  const [selectedFriends, setSelectedFriends] =
    useRecoilState(selectedFriendsAtom);
  const reset = useResetRecoilState(selectedFriendsAtom);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: group_data, isFetching } = useGroup({ limit: 50 });

  const [deleteModalOpen, setDeleteModalOpen] =
    useRecoilState(groupDeleteModalAtom);
  const [exitModalOpen, setExitModalOpen] = useRecoilState(groupExitModalAtom);

  const [openList, setOpenList] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDeleteSuccess = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["groups"] }),
      queryClient.invalidateQueries({ queryKey: ["user/detail"] }),
    ]);
    lightyToast.success("그룹 나가기/삭제 성공");
    router.replace("/groups");
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

  const selectedGroup = group_data?.find((group) => group.id === params.id);

  useEffect(() => {
    setIsClient(true);

    return reset();
  }, []);

  if (isFetching || !isClient) return <FullPageLoader />;

  if (!selectedGroup) {
    return <div>그룹을 찾을 수 없습니다.</div>;
  }

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

  return (
    <Flex direction="column" className="w-full min-h-dvh bg-base-white">
      <GroupBannerContainer
        groupEdit={groupEdit}
        imageUrl={groupImageUrl}
        owner={owner}
        setIsLoaded={setIsLoaded}
      />
      {!isLoaded && <DotSpinner />}
      <GroupInfoContainer group={selectedGroup} />
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
      <LeaderContainer leader={owner} />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>그룹 소개</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`약속 멤버 ${members.length}`}</span>
        }
        content={<GatheringMembersSlider members={members} />}
      />
      {deleteModalOpen && (
        <Modal
          title="그룹을 삭제하시겠어요?"
          content="그룹 관련 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteGroup()}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
      {exitModalOpen && (
        <Modal
          title="그룹을 나가시겠어요?"
          left="취소"
          right="나가기"
          action={() => exitGroup()}
          onClose={() => setExitModalOpen(false)}
        />
      )}
    </Flex>
  );
}

const styles = {
  divider: "flex-shrink-0 h-[1px] w-full bg-grayscale-50",
  dividerWrapper: "pl-[26px] pr-[14px] bg-base-white",
  title: "font-[700] text-[16px] leading-[20.8px] flex-grow",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-[12px] text-B3",
  button:
    "bg-grayscale-50 hover:bg-grayscale-100 px-3 py-2 rounded-[8px] text-T6",
};
