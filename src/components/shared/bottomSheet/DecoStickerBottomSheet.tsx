import React, { useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import Image from "next/image";
import clsx from "clsx";
import { silver_stickers } from "@/constants/stickers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { silverDecorateStickersAtom, stickersAtom } from "@/atoms/card";
import { Sticker } from "@/components/cards/Decorate";

export default function DecoStickerBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const setSilverStickersClicked = useSetRecoilState(
    silverDecorateStickersAtom
  );
  const [stickers, setStickers] = useRecoilState<Sticker[]>(stickersAtom);
  const [selectedKind, setSelectedKind] = useState("실버");
  const decoKinds = ["실버", "큐빅", "빈티지", "이벤트"];

  return (
    <BottomSheetWrapper bar onClose={onClose} open={open} bright={true}>
      <Flex direction="column" className="p-[24px] pt-[4px]" align="center">
        <div>
          <Flex>
            {decoKinds.map((kind) => (
              <span
                className={clsx(
                  "py-[8px] px-[12px] text-B2",
                  selectedKind === kind
                    ? "font-[600] text-grayscale-900"
                    : "text-grayscale-400"
                )}
                key={kind}
                onClick={() => setSelectedKind(kind)}
              >
                {kind}
              </span>
            ))}
          </Flex>
          <Spacing size={16} />
          <div className="grid grid-cols-4 grid-rows-3 gap-5 w-fit">
            {silver_stickers.map((sticker, idx) => (
              <Flex
                key={`sticker_${idx}`}
                justify="center"
                align="center"
                className="bg-grayscale-50 rounded-[12px] w-[64px] h-[64px]"
              >
                <Image
                  onClick={() => {
                    setSilverStickersClicked((prev) => ({
                      ...prev,
                      [idx]: true,
                    }));
                    setStickers([
                      ...stickers,
                      {
                        id: Number(new Date()),
                        src: `/deco_stickers/${sticker}`,
                        x: 100,
                        y: 50,
                        width: 64,
                        height: 64,
                      },
                    ]);
                  }}
                  src={`/deco_stickers/${sticker}`}
                  alt={`sticker${idx}`}
                  width={64}
                  height={64}
                />
              </Flex>
            ))}
          </div>
        </div>
      </Flex>
    </BottomSheetWrapper>
  );
}
