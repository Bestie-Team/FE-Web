"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalStateAtom } from "@/atoms/modal";
import { lightyToast } from "@/utils/toast";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import GatheringDetail from "@/components/gathering/GatheringDetail";
import TabParamHandler from "@/components/shared/TabParamHandler";
import dynamic from "next/dynamic";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import handleShare from "@/utils/handleShare";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import ShareIcon from "@/components/shared/Icon/ShareIcon";
import { MENU_TYPES } from "@/models/dropdown";
import { isIntersectingAtom } from "@/atoms/scroll";
import DetailSkeleton from "@/components/shared/Skeleton/DetailSkeleton";
import MODAL_CONFIGS from "@/constants/modal-configs";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const GatheringOptions = dynamic(
  () => import("@/components/gathering/GatheringOption"),
  { ssr: false }
);

export default function GatheringDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { userInfo } = useAuth();
  const isIntersecting = useRecoilValue(isIntersectingAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);
  const { data: selectedGathering } = useGatheringDetail({
    id: id || "",
  });
  const { mutate: deleteGathering } = useDeleteGathering({
    id: id || "",
    onSuccess: (data) => {
      lightyToast.success(data.message);
      router.replace("/gathering");
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const sharingData = {
    url: `https://lighty.today/gathering/detail?id=${id}`,
    text: selectedGathering?.description || "",
    title: selectedGathering?.name || "",
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
    return <DetailSkeleton />;
  }

  const { gatheringDate, hostUser } = selectedGathering;

  const isEnded = new Date(gatheringDate).getTime() < new Date().getTime();

  return (
    <div className="w-full min-h-dvh bg-grayscale-50">
      <HeaderWithBtn
        onClickBackBtn={clickBackBtnHandler}
        headerLabel="약속 상세"
        fontColor={!isIntersecting ? "#0A0A0A" : "white"}
        bgColor={!isIntersecting ? "white" : ""}
        icon={
          <div className={"flex gap-[14px]"}>
            <button
              type="button"
              aria-label="약속 공유"
              className="cursor-pointer bg-transparent border-0 p-0"
              onClick={() => handleShare(sharingData)}
            >
              <ShareIcon />
            </button>
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
          action={() => deleteGathering()}
          onClose={closeModal}
        />
      )}
      <TabParamHandler setSelectedTab={setSelectedTab} />
    </div>
  );
}
