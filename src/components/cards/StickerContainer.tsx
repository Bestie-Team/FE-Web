import React, { useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import clsx from "clsx";

interface Stickers {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function StickerContainer({
  stickers,
  setStickers,
}: {
  stickers: Stickers[];
  setStickers: (stickers: Stickers[]) => void;
}) {
  const [selectSticker, setSelectSticker] = useState<{
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
  }>({ 1: false, 2: false, 3: false, 4: false });
  return (
    <Flex className="w-full justify-center py-[16px] gap-[20px]">
      <div className={imageWrapper}>
        <Image
          src="/sticker1.png"
          width={64}
          height={64}
          alt="sticker1"
          className={clsx("cursor-pointer")}
          onClick={() => {
            setSelectSticker({ ...selectSticker, 1: true });
            setStickers([
              ...stickers,
              {
                id: Number(new Date()),
                src: "/sticker1.png",
                x: 50,
                y: 50,
                width: 100,
                height: 100,
              },
            ]);
          }}
        />
      </div>
      <div className={imageWrapper}>
        <Image
          src="/sticker2.png"
          width={64}
          height={64}
          alt="sticker2"
          className={clsx("cursor-pointer")}
          onClick={() => {
            setSelectSticker({ ...selectSticker, 2: true });
            setStickers([
              ...stickers,
              {
                id: Number(new Date()),
                src: "/sticker2.png",
                x: 100,
                y: 50,
                width: 100,
                height: 100,
              },
            ]);
          }}
        />
      </div>
      <div className={imageWrapper}>
        <Image
          src="/sticker3.png"
          width={64}
          height={64}
          alt="sticker3"
          className={clsx("cursor-pointer")}
          onClick={() => {
            setSelectSticker({ ...selectSticker, 3: true });
            setStickers([
              ...stickers,
              {
                id: Number(new Date()),
                src: "/sticker3.png",
                x: 150,
                y: 50,
                width: 100,
                height: 100,
              },
            ]);
          }}
        />
      </div>
      <div className={imageWrapper}>
        <Image
          src="/sticker4.png"
          width={64}
          height={64}
          alt="sticker4"
          className={clsx("cursor-pointer")}
          onClick={() => {
            setSelectSticker({ ...selectSticker, 4: true });
            setStickers([
              ...stickers,
              {
                id: Number(new Date()),
                src: "/sticker4.png",
                x: 200,
                y: 50,
                width: 100,
                height: 100,
              },
            ]);
          }}
        />
      </div>
    </Flex>
  );
}

const imageWrapper = "rounded-[12px] bg-[#D9D9D9] w-[64px] h-[64px]";
