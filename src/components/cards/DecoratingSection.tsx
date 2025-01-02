import React, { useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import Sticker from "../shared/Sticker";
import useImage from "use-image";
import { cardImageUrlAtom, stickersAtom } from "@/atoms/card";
import { useRecoilState, useRecoilValue } from "recoil";
import Konva from "konva";

export default function DecoratingSection({
  stageRef,
}: {
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}) {
  const cardImageUrl = useRecoilValue(cardImageUrlAtom);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stickers, setStickers] = useRecoilState(stickersAtom);

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
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
      <Layer>
        <Image
          alt="card"
          width={339}
          height={453}
          id="0"
          image={useImage(cardImageUrl as string)[0]}
          x={0}
          y={0}
          onMouseDown={() => {
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
  );
}
