"use client";
import React, { useCallback, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import Sticker from "../shared/Sticker";
import useImage from "use-image";
import { cardImageUrlAtom, stickersAtom } from "@/atoms/card";
import { useRecoilState, useRecoilValue } from "recoil";
import Konva from "konva";
import { Sticker as StickerType } from "./Decorate";

interface DecoratingSectionProps {
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}
export default function DecoratingSection({
  stageRef,
}: DecoratingSectionProps) {
  const cardImageUrl = useRecoilValue(cardImageUrlAtom);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stickers, setStickers] = useRecoilState(stickersAtom);
  const [cardImage] = useImage(cardImageUrl);
  const deselectSticker = useCallback(() => setSelectedId(null), []);
  const selectSticker = useCallback((id: number) => setSelectedId(id), []);

  const updateStickerAttributes = useCallback(
    (id: number, newAttrs: Partial<Konva.NodeConfig>) => {
      setStickers((prevStickers) =>
        prevStickers.map((sticker) =>
          sticker.id === id
            ? ({ ...sticker, ...newAttrs } as StickerType)
            : sticker
        )
      );
    },
    [setStickers]
  );

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
          onMouseDown={deselectSticker}
          onTouchStart={deselectSticker}
          onClick={() => {
            setSelectedId(null);
          }}
          alt="card"
          width={282}
          height={372}
          id="0"
          image={cardImage}
          x={0}
          y={0}
        />
        {stickers.map((sticker) => (
          <Sticker
            onDragEnd={(event) => {
              updateStickerAttributes(sticker.id, {
                x: event.target.x(),
                y: event.target.y(),
              });
            }}
            key={sticker.id}
            {...sticker}
            draggable
            isSelected={sticker.id === selectedId}
            onSelect={() => {
              selectSticker(sticker.id);
            }}
            // onChange={(newAttrs) =>
            //   updateStickerAttributes(sticker.id, newAttrs)
            // }
          />
        ))}
      </Layer>
    </Stage>
  );
}
