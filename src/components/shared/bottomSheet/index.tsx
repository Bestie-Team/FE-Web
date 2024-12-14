import { useSetRecoilState } from "recoil";
import PlusCircleButton from "../buttons/PlusCircleButton";
import Tooltip from "../tootlips/Tooltip";
import { homeModalStateAtom } from "@/atoms/home";
import { usePathname } from "next/navigation";
import { recordModalStateAtom } from "@/atoms/record";

export default function SheetOpenBtnContainer() {
  const pathname = usePathname();
  const setRecordModalOpen = useSetRecoilState(
    pathname.startsWith("/home") ? homeModalStateAtom : recordModalStateAtom
  );
  return (
    <>
      <PlusCircleButton
        className={plusBtnStyle}
        onClick={() => setRecordModalOpen(true)}
      />
      <div className={toolTipWrapperStyle}>
        <Tooltip
          direction="right"
          closeButton={true}
          title={"추억 피드를 등록해보세요!"}
        />
      </div>
    </>
  );
}

const plusBtnStyle =
  "absolute bottom-[80px] right-[16px] z-10 shadow-lg transition-transform duration-300 hover:animate-shrink-grow-less";

const toolTipWrapperStyle = "absolute bottom-[84px] right-[74px] z-14";
