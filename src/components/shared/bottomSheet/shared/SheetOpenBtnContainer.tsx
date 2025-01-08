import { useSetRecoilState } from "recoil";
import Tooltip from "../../tootlips/Tooltip";
import { homeModalStateAtom } from "@/atoms/home";
import { usePathname } from "next/navigation";
import { recordModalStateAtom } from "@/atoms/record";
import { gatheringModalStateAtom } from "@/atoms/gathering";
import { cardDecorateModalStateAtom } from "@/atoms/card";
import BottomSheetOpenButton from "../../buttons/BottomSheetOpenButton";
import LightyDeco from "../../icons/LightyDeco";

export default function SheetOpenBtnContainer({
  tooltip = false,
}: {
  tooltip?: boolean;
}) {
  const pathname = usePathname();
  const getModalStateAtom = () => {
    if (pathname.startsWith("/home")) return homeModalStateAtom;
    if (pathname.endsWith("/gathering")) return gatheringModalStateAtom;
    if (pathname.startsWith("/card")) return cardDecorateModalStateAtom;
    return recordModalStateAtom;
  };

  const getModalTooltip = () => {
    if (pathname.startsWith("/home")) return "추억 피드를 등록해보세요!";
    if (pathname.startsWith("/card")) return "👀 스티커로 꾸며보세요!";
  };

  const getIcon = () => {
    if (pathname.startsWith("/card")) return <LightyDeco />;
  };

  const setModalOpen = useSetRecoilState(getModalStateAtom());

  return (
    <>
      <BottomSheetOpenButton
        icon={getIcon()}
        className={styles.plusButton}
        onClick={() => setModalOpen(true)}
      />
      {tooltip ? (
        <div className={styles.toolTipWrapper}>
          <Tooltip
            direction="right"
            closeButton={true}
            title={getModalTooltip()}
          />
        </div>
      ) : null}
    </>
  );
}

const styles = {
  plusButton:
    "absolute bottom-[86px] right-[16px] z-10 shadow-lg transition-transform duration-300 cursor-pointer hover:animate-shrink-grow-less",
  toolTipWrapper: "absolute bottom-[92px] right-[84px] z-14",
};
