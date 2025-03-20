"use client";

import { useRecoilState, useResetRecoilState } from "recoil";
import useDeleteGroup from "@/components/groups/hooks/useDeleteGroup";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAddGroupMember from "@/components/groups/hooks/useAddGroupMember";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import useExitGroup from "@/components/groups/hooks/useExitGroup";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { User } from "lighty-type";
import Flex from "@/components/shared/Flex";
import GroupOptions from "@/components/groups/GroupOptions";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import GroupDetailContainer from "@/components/groups/GroupDetailContainer";
import dynamic from "next/dynamic";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useGroupDetail } from "@/components/groups/hooks/useGroupDetail";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import DetailSkeleton from "@/components/shared/Skeleton/DetailSkeleton";
import useReport from "@/components/report/hooks/useReport";
import MODAL_CONFIGS from "@/constants/modal-configs";

const SelectFriendsContainer = dynamic(
  () => import("@/components/friends/SelectFriendsContainer"),
  {
    ssr: false,
    loading: () => <DotSpinner />,
  }
);

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(() => import("@/components/shared/Modal/Report/Report"));

export type GroupEditProps = {
  id: string;
  name: string;
  description: string;
  groupImageUrl: string;
  members?: User[];
};

export default function GroupDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userInfo } = useAuth();
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
  const [report, setReport] = useRecoilState(reportInfoAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFriends, setSelectedFriends] =
    useRecoilState(selectedFriendsAtom);
  const reset = useResetRecoilState(selectedFriendsAtom);
  const { data: groupDetail } = useGroupDetail(id ? id : "");

  const [openList, setOpenList] = useState<boolean>(false);

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
    groupId: id || "",
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: exitGroup } = useExitGroup({
    groupId: id || "",
    onSuccess: handleDeleteSuccess,
  });

  const { mutate: addMember } = useAddGroupMember({
    groupId: id || "",
    friendIds:
      selectedFriends && selectedFriends.length > 0
        ? selectedFriends?.map((friend) => friend.id)
        : null,
    onSuccess: addMemberSuccessHandler,
  });

  const { mutate: reportGroup } = useReport({
    onSuccess: (data: { message: string }) => lightyToast.success(data.message),
    onError: (error: Error) => lightyToast.error(error.message),
  });

  useEffect(() => {
    return reset();
  }, []);

  if (openList === true) {
    return (
      <SelectFriendsContainer
        type="group"
        paddingTop={20}
        action={() => {
          setOpenList(false);
          addMember();
        }}
      />
    );
  }

  if (!groupDetail) {
    return <DetailSkeleton />;
  }

  const groupEdit: GroupEditProps = {
    id: groupDetail.id,
    name: groupDetail.name,
    description: groupDetail.description,
    groupImageUrl: groupDetail.groupImageUrl,
    members: groupDetail.members,
  };
  const { accountId } = groupDetail.owner;
  const isOwner = accountId === userInfo?.accountId;

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  const modalAction =
    modalState.type === "deleteGroup" ? () => deleteGroup() : () => exitGroup();

  return (
    <Flex direction="column" className="w-full min-h-dvh">
      <HeaderWithBtn
        headerLabel="그룹 상세"
        fontColor="white"
        icon={<GroupOptions isOwner={isOwner} group={groupEdit} />}
      />
      <GroupDetailContainer
        groupDetail={groupDetail}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={modalAction}
          onClose={closeModal}
        />
      )}
      {reportModal.isOpen && (
        <Report
          report={report}
          setReport={setReport}
          handleReport={() => {
            reportGroup(report);
            setReportModal((prev) => ({ ...prev, isOpen: false }));
          }}
          onClose={() => setReportModal((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </Flex>
  );
}
