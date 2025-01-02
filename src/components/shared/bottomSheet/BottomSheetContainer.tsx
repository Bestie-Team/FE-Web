import { useSetRecoilState } from "recoil";
import PlusCircleButton from "../buttons/PlusCircleButton";
import Tooltip from "../tootlips/Tooltip";
import { homeModalStateAtom } from "@/atoms/home";
import { usePathname } from "next/navigation";
import { recordModalStateAtom } from "@/atoms/record";
import { gatheringModalStateAtom } from "@/atoms/gathering";

export default function SheetOpenBtnContainer({
  tooltip = false,
}: {
  tooltip?: boolean;
}) {
  const pathname = usePathname();
  const getModalStateAtom = () => {
    if (pathname.startsWith("/home")) return homeModalStateAtom;
    if (pathname.endsWith("/gathering")) return gatheringModalStateAtom;
    return recordModalStateAtom;
  };

  const setModalOpen = useSetRecoilState(getModalStateAtom());

  return (
    <>
      <PlusCircleButton
        className={styles.plusButton}
        onClick={() => setModalOpen(true)}
      />
      {tooltip ? (
        <div className={styles.toolTipWrapper}>
          <Tooltip
            direction="right"
            closeButton={true}
            title={"추억 피드를 등록해보세요!"}
          />
        </div>
      ) : null}
    </>
  );
}

const styles = {
  plusButton:
    "absolute bottom-[86px] right-[16px] z-10 shadow-lg transition-transform duration-300 cursor-pointer hover:animate-shrink-grow-less",
  toolTipWrapper: "absolute bottom-[84px] right-[74px] z-14",
};
