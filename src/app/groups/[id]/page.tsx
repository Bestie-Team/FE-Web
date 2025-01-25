"use client";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/shared/GroupLeaderContainer";
import GroupBannerContainer from "@/components/groups/GroupBannerContainer";
import Flex from "@/components/shared/Flex";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Spacing from "@/components/shared/Spacing";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import PencilIcon from "@/components/shared/Icon/PencilIcon";
import GroupInfoContainer from "@/components/groups/GroupInfoContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import useDeleteGroup from "@/components/groups/hooks/useDeleteGroup";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SelectFriendsContainer from "@/components/friends/SelectFriendsContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import { selectedFriendsAtom } from "@/atoms/friends";
import useAddGroupMember from "@/components/groups/hooks/useAddGroupMember";
import Modal from "@/components/shared/Modal/Modal";
import { toast } from "react-toastify";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { groupDeleteModalAtom, groupExitModalAtom } from "@/atoms/modal";
import useExitGroup from "@/components/groups/hooks/useExitGroup";

export default function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const selectedFriends = useRecoilValue(selectedFriendsAtom);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: group_data, isFetching } = useGroup();

  const [deleteModalOpen, setDeleteModalOpen] =
    useRecoilState(groupDeleteModalAtom);
  const [exitModalOpen, setExitModalOpen] = useRecoilState(groupExitModalAtom);

  const [openList, setOpenList] = useState<boolean>(false);

  const { mutate: deleteGroup } = useDeleteGroup({
    groupId: params.id,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      });
      toast.success("그룹을 성공적으로 삭제하였습니다");
      router.replace("/groups");
    },
  });

  const { mutate: exitGroup } = useExitGroup({
    groupId: params.id,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      });
      toast.success("그룹을 나갔습니다");
      router.replace("/groups");
    },
  });

  const { mutate: addMember } = useAddGroupMember({
    groupId: params.id,
    friendIds: selectedFriends.map((friend) => friend.id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      toast.success(data.message);
    },
  });

  const selectedGroup = group_data?.find((group) => group.id === params.id);

  if (isFetching) return <FullPageLoader />;

  if (!selectedGroup) {
    return <div>그룹을 찾을 수 없습니다.</div>;
  }

  const { description, members, owner, groupImageUrl } = selectedGroup;

  if (openList === true) {
    return (
      <SelectFriendsContainer
        isNew={false}
        paddingTop="20px"
        action={() => {
          setOpenList(false);
          addMember();
        }}
      />
    );
  }
  if (openList === false)
    return (
      <Flex direction="column" className="w-full h-screen bg-grayscale-50">
        <GroupBannerContainer imageUrl={groupImageUrl} owner={owner} />
        <GroupInfoContainer group={selectedGroup} />
        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>
        <GroupLeaderContainer groupLeader={owner} />
        <Spacing size={10} />
        <LightyInfoContainer
          icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
          title={<span className={styles.title}>그룹 소개</span>}
          content={
            <Flex className={styles.contentWrapper}>
              <span>{description}</span>
            </Flex>
          }
        />
        <Spacing size={10} />
        <LightyInfoContainer
          icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
          title={
            <span
              className={styles.title}
            >{`약속 멤버 ${members.length}`}</span>
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
    "w-full px-[20px] py-[16px] border-[1px] border-grayscale-100 rounded-[12px] text-B3",
  button:
    "bg-grayscale-50 hover:bg-grayscale-100 px-[12px] py-[8px] rounded-[8px] text-T6",
};
