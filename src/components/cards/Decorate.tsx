"use client";
import React from "react";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/buttons/Button";
import Konva from "konva";
import dynamic from "next/dynamic";
import Flex from "@/components/shared/Flex";
import downloadURI from "@/utils/downloadURI";

const DecoratingSection = dynamic(
  () => import("@/components/cards/DecoratingSection"),
  {
    ssr: false,
  }
);

export interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Decorate() {
  const stageRef = React.useRef<Konva.Stage | null>(null);

  const handleExport = () => {
    if (!stageRef.current) return;
    const scale = 4;
    const uri = stageRef.current.toDataURL({ pixelRatio: scale });
    downloadURI(uri, "card.png");
  };

  return (
    <div className="flex justify-center">
      <Flex direction="column">
        <DecoratingSection stageRef={stageRef} />
        <Spacing size={8} />
        <Flex justify="center">
          <Button className={styles.button} onClick={handleExport}>
            사진 저장하기
          </Button>
        </Flex>
        <Spacing size={100} />
      </Flex>
    </div>
  );
}

const styles = {
  button:
    "w-[120px] px-[12px] py-[6px] rounded-[12px] border border-[#D8D8D8] text-[#D8D8D8] bg-base-white text-B4 cursor-pointer",
};
