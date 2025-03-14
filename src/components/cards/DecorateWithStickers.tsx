import React, { useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Spacing from "../shared/Spacing";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardFrameAtom,
  cardImageUrlAtom,
  cardSelectedFeedAtom,
  decoBottomSheetStateAtom,
} from "@/atoms/card";
import Flex from "../shared/Flex";
import * as fabric from "fabric";
import DecoStickerBottomSheet from "../shared/BottomDrawer/DecoStickerBottomSheet";
import cropAndResizeImage from "@/utils/cropAndResizeImage";
import { format } from "date-fns";
import FloatingButton from "../shared/Button/FloatingButton";
import BottomButton from "../shared/Button/BottomButton";
import PhotoSaveBottomSheet from "../shared/BottomDrawer/PhotoSaveBottomSheet";

export default function DecorateWithStickers() {
  const [decoBottomSheetState, setDecoBottomSheetState] = useRecoilState(
    decoBottomSheetStateAtom
  );
  const [imageBottomSheetOpen, setImageBottomSheetOpen] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const selectedFrame = useRecoilValue(cardFrameAtom);
  const cardImgUrl = useRecoilValue(cardImageUrlAtom);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [deco, setDeco] = useState<boolean>(false);
  const selectedFeed = useRecoilValue(cardSelectedFeedAtom);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const frames = [
    "https://cdn.lighty.today/frame1.jpeg",
    "https://cdn.lighty.today/frame2.jpeg",
    "https://cdn.lighty.today/frame3.jpeg",
    "https://cdn.lighty.today/frame4.jpeg",
    "https://cdn.lighty.today/frame5.jpeg",
    "https://cdn.lighty.today/frame6.jpeg",
    "https://cdn.lighty.today/frame7.jpeg",
    "https://cdn.lighty.today/frame8.png",
    "https://cdn.lighty.today/frame9.png",
    "https://cdn.lighty.today/frame10.png",
  ];

  useEffect(() => {
    if (canvasElementRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasElementRef.current, {
        width: 282,
        height: 372,
      });
    }
    return () => {
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  const handleCaptureImage = useCallback(async () => {
    if (ref.current === null || !fabricCanvasRef.current) return;
    if (imageRef.current) {
      console.log("resize");
    }
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const img = new Image();

      img.src = dataUrl;
      img.onload = async () => {
        const canvas = fabricCanvasRef.current;
        if (canvas) {
          const bgImage = new fabric.Image(img, {
            originX: "left",
            originY: "top",
            crossOrigin: "anonymous",
          });

          const canvasAspectRatio = canvas.width! / canvas.height!;
          const imageAspectRatio = img.width / img.height;

          if (imageAspectRatio > canvasAspectRatio) {
            bgImage.scaleToWidth(canvas.width!);
          } else {
            bgImage.scaleToHeight(canvas.height!);
          }

          canvas.backgroundImage = bgImage;
          canvas.renderAll();
        }
        // setImg(img);
      };
      setDeco(true);
    } catch (err) {
      console.error("이미지 캡처 오류:", err);
    }
  }, []);

  const handleAddSticker = async (path: string) => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      try {
        const stickerObj = await fabric.Image.fromURL(path, {
          crossOrigin: "anonymous",
        });
        stickerObj.set({
          scaleX: 0.25,
          scaleY: 0.25,
        });

        canvas.add(stickerObj);
        canvas.renderAll();
      } catch (error) {
        console.error("Error adding sticker:", error);
      }
    } else {
      console.error("Canvas reference is not initialized.");
    }
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    if (fabricCanvasRef.current) {
      const uri = fabricCanvasRef.current.toDataURL({
        format: "png",
        multiplier: 2,
      });
      setImageUri(uri);
      setImageBottomSheetOpen(true);
    }
  };

  useEffect(() => {
    const applyCrop = async () => {
      try {
        const croppedImageUrl = await cropAndResizeImage(
          selectedFeed.imageUrl as string,
          230, // 원하는 너비
          250 // 원하는 높이
        );
        setCroppedImage(croppedImageUrl);
      } catch (err) {
        console.error("이미지 자르기 실패:", err);
      }
    };

    applyCrop();
  }, [selectedFeed.imageUrl]);

  return (
    <Flex
      direction="column"
      className={"!min-h-dvh h-full pb-[60px] pt-safe-top"}
    >
      {deco === false ? (
        <Flex
          className="!h-dvh pt-[76px] pb-[60px]"
          direction="column"
          justify="space-between"
        >
          <div>
            <Flex direction="column" className="gap-3 px-6">
              <span className="text-T2">해당 프레임을 선택할까요?</span>
              <span className="text-B3 text-grayscale-500">
                꾸미기 시작하면 프레임을 바꿀 수 없어요.
              </span>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align="center"
              className={styles.cardContainer}
            >
              <div
                ref={ref}
                id="card"
                className="relative rounded-[20px] w-full"
              >
                <img
                  alt="frame"
                  height={372}
                  width={282}
                  className={styles.frame}
                  src={frames[selectedFrame]}
                />
                <div className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    {croppedImage ? (
                      <img
                        src={croppedImage}
                        alt="Cropped Image"
                        width={230}
                        height={218}
                      />
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#AEAEAE",
                          height: 218,
                          width: 230,
                        }}
                      />
                    )}
                  </div>
                  <Flex direction="column" className="px-5 py-1 pb-5 h-[100px]">
                    <span className={styles.textWrapper}>
                      {selectedFeed.name || ""}
                    </span>
                    <Spacing size={8} />
                    <span className="text-C5">{selectedFeed.content}</span>
                    <Spacing size={12} />
                    <span className={styles.dateWrapper}>
                      {format(selectedFeed.date.slice(0, 10), "yyyy.MM.dd")}
                    </span>
                  </Flex>
                </div>
              </div>
            </Flex>
          </div>
          <div className={"mb-safe-bottom"}>
            <BottomButton
              disabled={selectedFrame == null}
              onClick={handleCaptureImage}
              label="꾸미기 시작"
            />
          </div>
        </Flex>
      ) : (
        <>
          <Spacing size={76} />
          <Flex className="w-full px-6">
            <span className="text-B4 text-grayscale-500">
              점선 영역이 이미지 영역이에요!
            </span>
          </Flex>
          <Spacing size={32} />
        </>
      )}
      <Flex
        direction="column"
        align="center"
        className="h-full"
        justify="space-between"
      >
        <div style={{ width: "282px", height: "372px" }} ref={stageRef}>
          <canvas
            ref={canvasElementRef}
            id="canvas"
            style={{
              width: "282px",
              height: "372px",
              backgroundImage: `url(${cardImgUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
        </div>
        {deco && (
          <div
            className={"absolute bottom-[60px] left-0 right-0 mb-safe-bottom"}
          >
            <FloatingButton tooltip />
            <BottomButton
              label={"이미지 저장"}
              onClick={() => {
                handleExport();
              }}
            />
          </div>
        )}
      </Flex>

      {decoBottomSheetState ? (
        <DecoStickerBottomSheet
          handleSticker={handleAddSticker}
          open={decoBottomSheetState}
          onClose={() => setDecoBottomSheetState(false)}
        />
      ) : null}
      {imageBottomSheetOpen && imageUri !== "" && (
        <PhotoSaveBottomSheet
          onClose={() => setImageBottomSheetOpen(false)}
          src={imageUri}
        />
      )}
    </Flex>
  );
}

const styles = {
  frame: "rounded-[20px] w-[282px] h-[372px]",
  button:
    "absolute z-10 py-[10px] px-3 text-C2 bg-grayscale-900 rounded-[10px] cursor-pointer text-base-white",
  saveButton:
    "w-[120px] px-3 py-[6px] rounded-xl border border-[#D8D8D8] text-[#D8D8D8] bg-base-white text-B4 cursor-pointer",
  cardContainer:
    "relative rounded-[20px] w-[282px] h-[453px] self-center mx-auto",
  cardWrapper:
    "absolute top-[27px] left-[26.5px] flex flex-col bg-base-white rounded-xl w-[230px] h-[318px]",
  imageWrapper:
    "w-[230px] h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "w-[230px] h-[220px]",
  textWrapper: "text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
