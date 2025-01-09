"use client";
import Konva from "konva";
import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

interface StickerProps {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}

const Sticker = ({
  src,
  x,
  y,
  draggable,
  isSelected,
  onSelect,
  onChange,
}: // onResizeEnd,
StickerProps) => {
  const [image] = useImage(src);
  const shapeRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current as Konva.Image]);
      transformerRef.current.getLayer()!.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        alt="sticker"
        image={image}
        x={x}
        y={y}
        draggable={draggable}
        width={80}
        height={80}
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (node) {
            const newWidth = node.width() * node.scaleX();
            const newHeight = node.height() * node.scaleY();
            onChange({
              x: node.x(),
              y: node.y(),
              width: newWidth,
              height: newHeight,
            });
          }
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default Sticker;
