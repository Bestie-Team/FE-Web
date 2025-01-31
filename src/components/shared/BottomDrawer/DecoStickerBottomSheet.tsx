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
      return { stickers: pastel_stickers, path: `deco_stickers/pastel` };
    } else if (selectedKind === "큐빅")
      return { stickers: sparkle_stickers, path: `deco_stickers/sparkle` };
    else return null;
  };

  const selectedStickers = stickers();
  return (
    <BottomSheetWrapper bar onClose={onClose} open={open} bright={true}>
      <Flex direction="column" className="p-6 pt-1" align="center">
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
                      layout="fixed"
                      onClick={() =>
                        handleSticker(
                          `https://cdn.lighty.today/${selectedStickers.path}/${sticker}`
                        )
                      }
                      src={`https://cdn.lighty.today/${selectedStickers.path}/${sticker}`}
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
  stickerKind: "py-2 px-3 text-B2 cursor-pointer",
  wrapper: "grid grid-cols-4 grid-rows-3 gap-5 w-fit",
  box: "bg-grayscale-50 rounded-[12px] w-16 h-16",
};
