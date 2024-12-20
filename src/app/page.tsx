"use client";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import PlusButton from "../components/shared/buttons/PlusCircleButton";
import NavBar from "../components/shared/NavBar";
import Toast from "@/components/shared/toasts/Toast";
import RoundChip from "@/components/shared/chips/RoundChip";
import { InvitationToast } from "@/components/shared/toasts/InvitationToast";
import Input from "@/components/shared/inputs/Input";
import Spacing from "@/components/shared/Spacing";
import Tooltip from "@/components/shared/tootlips/Tooltip";
import AddPhoto from "@/components/shared/AddPhoto";

export default function Home() {
  return (
    <>
      <div className="box-border pt-[48px] pb-24">
        <div>
          <div className="bg-grayscale-100 text-T1 p-2">
            빛나는 추억을 기록하는 사이트 Lighty 라이티
          </div>
          <div className="bg-grayscale-200 text-T2 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-300 text-T3 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-400 text-T4 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-500 text-T5 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-600 text-T6 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-100 text-B1 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-200 text-B2 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-300 text-B3 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-400 text-B4 p-2">Lighty 라이티</div>
          <div className="bg-grayscale-500 text-B5 p-2">Lighty 라이티</div>
        </div>
        <div className="p-2">
          <PlusButton />
        </div>
        <NavBar />
        <AddPhoto />
        <Spacing size={28} />
        <Input value="lighty" onChange={() => {}} />
        <Tooltip
          title="안녕?"
          direction="right"
          closeButton={false}
          className="py-[8px] px-[12px]"
        />
        <Toast comment={"수정이 완료되었어요."} label="토스트버튼" />
        <InvitationToast />
        <RoundChip label="text" color="white" onClick={() => {}} />
        <FixedBottomButton label={"버튼"} onClick={() => {}} />
      </div>
    </>
  );
}
