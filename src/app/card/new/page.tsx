"use client";
import React, { useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import HeaderReturner from "@/utils/headerReturner";
import Sticker from "@/components/shared/Sticker";

import Card from "@/components/cards/Card";
import StickerContainer from "@/components/cards/StickerContainer";
import useImage from "use-image";
import { useRecoilValue } from "recoil";
import { cardImageUrlAtom } from "@/atoms/card";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/buttons";
import Konva from "konva";

export default function Page() {
  const [stickers, setStickers] = useState<
    {
      id: number;
      src: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  >([]);
  const cardImageUrl = useRecoilValue(cardImageUrlAtom);
  const stageRef = React.useRef<Konva.Stage | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleChange = (
    id: number,
    newAttrs: { x: number; y: number; width: number; height: number }
  ) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...newAttrs } : sticker
      )
    );
  };
  function downloadURI(uri: string, name: string) {
    let link = document.createElement("a");
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

  return (
    <div className="p-auto">
      <div className="bg-base-white">{HeaderReturner()}</div>
      <Card />
      <StickerContainer setStickers={setStickers} stickers={stickers} />
      <Spacing size={8} />
      <Button
        className="px-[12px] py-[8px] rounded-[12px] bg-base-white text-B4"
        onClick={handleExport}
      >
        사진
      </Button>
      <Spacing size={8} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
      >
        <Layer>
          <Image
            width={339}
            height={453}
            id="0"
            image={useImage(cardImageUrl as string)[0]}
            x={0}
            y={0}
            onClick={() => {
              setSelectedId(null);
            }}
          />
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              {...sticker}
              draggable
              isSelected={sticker.id === selectedId}
              onSelect={() => handleSelect(sticker.id)}
              onChange={(newAttrs) => handleChange(sticker.id, newAttrs)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
