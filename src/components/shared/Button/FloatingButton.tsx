import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import type { RecoilState } from "recoil";
import type { FC } from "react";

import { gatheringModalStateAtom } from "@/atoms/gathering";
import { recordModalAtom } from "@/atoms/modal";
import LightyDeco from "../Icon/LightyDeco";
import PlusIcon from "../Icon/PlusIcon";
import Tooltip from "../Tooltip/Tooltip";
import { decoBottomSheetStateAtom } from "@/atoms/card";

interface FloatingButtonProps {
  tooltip?: boolean;
  onClick?: () => void;
}

type PathConfig = {
  path: string;
  modalAtom: RecoilState<boolean>;
  tooltipText?: string;
};

const PATH_CONFIGS: PathConfig[] = [
  {
    path: "/feed",
    modalAtom: recordModalAtom,
    tooltipText: "추억 피드를 등록해보세요!",
  },
  {
    path: "/gathering",
    modalAtom: gatheringModalStateAtom,
    tooltipText: "추억 피드를 등록해보세요!",
  },
  {
    path: "/card",
    modalAtom: decoBottomSheetStateAtom,
    tooltipText: "👀 스티커로 꾸며보세요!",
  },
];

const FloatingButton: FC<FloatingButtonProps> = ({
  tooltip = false,
  onClick,
}) => {
  const pathname = usePathname();
  const getPathConfig = () => {
    return (
      PATH_CONFIGS.find((config) => pathname === config.path) ?? PATH_CONFIGS[0]
    );
  };

  const currentConfig = getPathConfig();
  const setModalOpen = useSetRecoilState(currentConfig.modalAtom);

  const handleClick = () => {
    setModalOpen(true);
    onClick?.();
  };

  return (
    <>
      {tooltip && currentConfig.tooltipText && (
        <div className="absolute bottom-[92px] right-[84px] z-14 mb-safe-bottom">
          <Tooltip
            direction="right"
            closeButton={true}
            title={currentConfig.tooltipText}
          />
        </div>
      )}
      <button
        name="floating_button"
        onClick={handleClick}
        data-testid="plus-circle-button"
        className="bg-grayscale-900 mb-safe-bottom rounded-full w-14 h-14 flex items-center justify-center absolute bottom-[86px] right-[16px] z-10 shadow-lg transition cursor-pointer active:animate-shrink-grow-less duration-300 ease-in-out"
        type="button"
      >
        {pathname.startsWith("/card") ? (
          <LightyDeco />
        ) : (
          <PlusIcon width="23.3" height="23.3" />
        )}
      </button>
    </>
  );
};

export default FloatingButton;
