"use client";
import React, { useMemo } from "react";
import HeaderReturner from "@/utils/headerReturner";
import Card from "@/components/cards/Card";
import StickerContainer from "@/components/cards/StickerContainer";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/buttons";
import Konva from "konva";
import { stickersAtom } from "@/atoms/card";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";

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

export default function Page() {
  const [stickers, setStickers] = useRecoilState<Sticker[]>(stickersAtom);

  const stageRef = React.useRef<Konva.Stage | null>(null);

  function downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    if (stageRef.current == null) return;
    const scale = 4;
    const uri = stageRef.current.toDataURL({ pixelRatio: scale });
    console.log(uri);

    downloadURI(uri, "card.png");
  };

  const header = useMemo(() => HeaderReturner(), []);
  return (
    <div className="p-auto">
      <div className="bg-base-white">{header}</div>
      <Card />
      <StickerContainer setStickers={setStickers} stickers={stickers} />
      <Spacing size={8} />
      <Button className={styles.button} onClick={handleExport}>
        사진
      </Button>
      <Spacing size={8} />
      <DecoratingSection stageRef={stageRef} />
    </div>
  );
}

const styles = {
  button: "px-[12px] py-[8px] rounded-[12px] bg-base-white text-B4",
};
