"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const cardImageUrl = useRecoilValue(cardImageUrlAtom);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [stickers, setStickers] = useRecoilState(stickersAtom);
  const [cardImage, status] = useImage(cardImageUrl);

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

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading image</div>;
  return (
    <Stage
      width={stageSize.width * 0.8}
      height={stageSize.height * 0.8}
      ref={stageRef}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
