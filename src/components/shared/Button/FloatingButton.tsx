"use client";

import { cardDecorateModalStateAtom } from "@/atoms/card";
import { gatheringModalStateAtom } from "@/atoms/gathering";
import { homeModalStateAtom } from "@/atoms/home";
import { recordModalAtom } from "@/atoms/modal";
import { usePathname } from "next/navigation";
import type React from "react";
import LightyDeco from "../Icon/LightyDeco";
import { useSetRecoilState } from "recoil";
import PlusIcon from "../Icon/PlusIcon";
import Tooltip from "../Tooltip/Tooltip";

const FloatingButton = ({ tooltip }: { tooltip?: boolean }) => {
  const pathname = usePathname();
  const getModalStateAtom = () => {
    if (pathname.endsWith("/")) return homeModalStateAtom;
    if (pathname.endsWith("/gathering")) return gatheringModalStateAtom;
    if (pathname.startsWith("/card")) return cardDecorateModalStateAtom;
    return recordModalAtom;
  };

  const getModalTooltip = () => {
    if (pathname === "/") return "추억 피드를 등록해보세요!";
    if (pathname === "/feed") return "추억 피드를 등록해보세요!";
    if (pathname === "/gathering") return "추억 피드를 등록해보세요!";
    if (pathname.startsWith("/card")) return "👀 스티커로 꾸며보세요!";
  };

  const setModalOpen = useSetRecoilState(getModalStateAtom());

  const handleClick = (e: React.MouseEvent) => {
    setModalOpen(true);
  };

  return (
    <>
      {tooltip ? (
        <div className={styles.toolTipWrapper}>
          <Tooltip
            direction="right"
            closeButton={true}
            title={getModalTooltip()}
          />
        </div>
      ) : null}
      <div
        onClick={handleClick}
        data-testid="plus-circle-button"
        className={styles.plusButton}
      >
        {pathname.startsWith("/card") ? (
          <LightyDeco />
        ) : (
          <PlusIcon width="23.3" height="23.3" />
        )}
      </div>
    </>
  );
};

export default FloatingButton;
const styles = {
  plusButton:
    "bg-grayscale-900 rounded-full w-14 h-14 flex items-center justify-center absolute bottom-[86px] right-[16px] z-10 shadow-lg transition-transform duration-300 cursor-pointer hover:animate-shrink-grow-less",
  toolTipWrapper: "absolute bottom-[92px] right-[84px] z-14",
};
