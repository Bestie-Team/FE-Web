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

  const checkDeselect = () => {
    if (true) {
      setSelectedId(null);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleChange = (
    id: number,
    newAttrs: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...newAttrs } : sticker
      )
    );
  };

  return (
    <Stage
      width={282}
      height={372}
      ref={stageRef}
      style={{ width: "full", display: "flex", justifyContent: "center" }}
    >
      <Layer
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          overflow: "visible",
          margin: "0 auto",
        }}
      >
        <Image
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          onClick={() => {
            setSelectedId(null);
          }}
          alt="card"
          width={282}
          height={372}
          id="0"
          image={useImage(cardImageUrl as string)[0]}
          x={0}
          y={0}
        />
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            {...sticker}
            draggable
            isSelected={sticker.id === selectedId}
            onSelect={() => {
              handleSelect(sticker.id);
            }}
            onChange={(newAttrs) => handleChange(sticker.id, newAttrs)}
            // onResizeEnd={() => setSelectedId(null)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
