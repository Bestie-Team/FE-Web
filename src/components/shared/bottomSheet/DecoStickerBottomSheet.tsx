import React, { useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Image from "next/image";
import clsx from "clsx";
import { pastel_stickers, sparkle_stickers } from "@/constants/photoCard";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";

export default function DecoStickerBottomSheet({
  open = true,
  onClose,
  handleSticker,
}: {
  open?: boolean;
  handleSticker: (path: string) => void;
  onClose: () => void;
}) {
  const [selectedKind, setSelectedKind] = useState("파스텔");
  const decoKinds = ["파스텔", "큐빅", "빈티지", "이벤트"];
  const stickers = () => {
    if (selectedKind === "파스텔") {
      return { stickers: pastel_stickers, path: `/deco_stickers/pastel` };
    } else if (selectedKind === "큐빅")
      return { stickers: sparkle_stickers, path: `/deco_stickers/sparkle` };
    else return null;
  };

  const selectedStickers = stickers();
  return (
    <BottomSheetWrapper bar onClose={onClose} open={open} bright={true}>
      <Flex direction="column" className="p-[24px] pt-[4px]" align="center">
        <div>
          <Flex>
            {decoKinds.map((kind) => (
              <span
                className={clsx(
                  styles.stickerKind,
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
          <div className={styles.wrapper}>
            {!!selectedStickers
              ? selectedStickers.stickers.map((sticker, idx) => (
                  <Flex
                    key={`pastel_sticker_${idx}`}
                    justify="center"
                    align="center"
                    className={styles.box}
                  >
                    <Image
                      className="cursor-pointer"
                      onClick={() =>
                        handleSticker(`${selectedStickers.path}/${sticker}`)
                      }
                      src={`${selectedStickers.path}/${sticker}`}
                      alt={`sticker${idx}`}
                      width={64}
                      height={64}
                    />
                  </Flex>
                ))
              : null}
          </div>
        </div>
      </Flex>
    </BottomSheetWrapper>
  );
}

const styles = {
  stickerKind: "py-[8px] px-[12px] text-B2 cursor-pointer",
  wrapper: "grid grid-cols-4 grid-rows-3 gap-5 w-fit",
  box: "bg-grayscale-50 rounded-[12px] w-[64px] h-[64px]",
};
