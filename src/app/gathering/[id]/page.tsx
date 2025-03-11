"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { modalStateAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import ArrowLeftIcon from "@/components/shared/Icon/ArrowLeftIcon";
import Spacing from "@/components/shared/Spacing";
import GatheringDetail from "@/components/gathering/GatheringDetail";
import TabParamHandler from "@/components/shared/TabParamHandler";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"));

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const router = useRouter();
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

  if (!selectedGathering) {
    return;
  }

  return (
    <div className="relative min-h-dvh bg-grayscale-50 w-full">
      <header className={header}>
        <button
          className={
            "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer active:animate-shrink-grow"
          }
          onClick={() => {
            if (selectedTab == "1") {
              router.push("/gathering?tab=1");
            } else if (selectedTab == "2") {
              router.push("/gathering?tab=2");
            } else {
              router.back();
            }
          }}
        >
          <ArrowLeftIcon color="#FFF" />
        </button>
        <div className="flex-1 text-base-white">{"약속 상세"}</div>
        <Spacing size={6} />
      </header>
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
const header =
  "absolute top-0 left-0 right-0 flex z-20 max-w-[430px] w-full items-center h-12 text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px] gap-[6px] pl-[0px] pr-5";
