import { useSetRecoilState } from "recoil";
import PlusCircleButton from "../buttons/PlusCircleButton";
import Tooltip from "../tootlips/Tooltip";
import { homeModalStateAtom } from "@/atoms/home";
import { usePathname } from "next/navigation";
import { recordModalStateAtom } from "@/atoms/record";
import { gatheringModalStateAtom } from "@/atoms/gathering";

export default function SheetOpenBtnContainer() {
  const pathname = usePathname();
  const getModalStateAtom = () => {
    if (pathname.startsWith("/home")) return homeModalStateAtom;
    if (pathname.endsWith("/gathering")) return gatheringModalStateAtom;
    return recordModalStateAtom;
  };

  const setModalOpen = useSetRecoilState(getModalStateAtom());

  const tooltip = false;

  return (
    <>
      <PlusCircleButton
        className={plusBtnStyle}
        onClick={() => setModalOpen(true)}
      />
      {tooltip ? (
        <div className={toolTipWrapperStyle}>
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

const plusBtnStyle =
  "absolute bottom-[80px] right-[16px] z-10 shadow-lg transition-transform duration-300 cursor-pointer hover:animate-shrink-grow-less";

const toolTipWrapperStyle = "absolute bottom-[84px] right-[74px] z-14";
