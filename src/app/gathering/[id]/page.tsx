"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { modalStateAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import GatheringDetail from "@/components/gathering/GatheringDetail";
import TabParamHandler from "@/components/shared/TabParamHandler";
import dynamic from "next/dynamic";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import handleShare from "@/utils/handleShare";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import ShareIcon from "@/components/shared/Icon/ShareIcon";
import { MENU_TYPES } from "@/models/dropdown";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});
const GatheringOptions = dynamic(
  () => import("@/components/gathering/GatheringOption"),
  { ssr: false }
);

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const router = useRouter();
  const { userInfo } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);
  const { data: selectedGathering } = useGatheringDetail({
    id,
    enabled: !!id,
  });
  const { mutate: deleteGathering } = useDeleteGathering({
    id,
    onSuccess: (data) => {
      lightyToast.success(data.message);
      router.replace("/gathering");
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const sharingData = {
    url: `https://lighty.today/gathering/${id}`,
    text: selectedGathering?.description || "",
    title: selectedGathering?.name || "",
  };

  const MODAL_CONFIGS = {
    deleteGathering: {
      title: "약속을 삭제하시겠어요?",
      content: "약속 관련 정보가 전부 삭제되며 이는 복구할 수 없어요.",
      leftButton: "취소",
      rightButton: "삭제하기",
      action: () => deleteGathering(),
    },
  };

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  const clickBackBtnHandler = () => {
    if (selectedTab == "1") {
      router.push("/gathering?tab=1");
    } else if (selectedTab == "2") {
      router.push("/gathering?tab=2");
    } else {
      router.back();
    }
  };

  if (!selectedGathering) {
    return;
  }

  const { gatheringDate, hostUser } = selectedGathering;

  const isEnded = new Date(gatheringDate).getTime() < new Date().getTime();

  return (
    <div className="w-full min-h-dvh bg-grayscale-50">
      <HeaderWithBtn
        onClickBackBtn={clickBackBtnHandler}
        headerLabel="약속 상세"
        fontColor="white"
        icon={
          <div className={"flex gap-[14px]"}>
            <div
              className="cursor-pointer"
              onMouseDown={() => handleShare(sharingData)}
            >
              <ShareIcon />
            </div>
            {userInfo?.accountId === hostUser.accountId && (
              <GatheringOptions
                type={
                  isEnded ? MENU_TYPES.GATHERING_ENDED : MENU_TYPES.GATHERING
                }
                gathering={selectedGathering}
              />
            )}
          </div>
        }
      />
      <GatheringDetail
        selectedGathering={selectedGathering}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
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
      <TabParamHandler setSelectedTab={setSelectedTab} />
    </div>
  );
}
