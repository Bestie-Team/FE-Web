"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Spacing from "../shared/Spacing";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardDecorateModalStateAtom,
  cardFrameAtom,
  cardImageUrlAtom,
  cardSelectedGatheringAtom,
} from "@/atoms/card";
import Flex from "../shared/Flex";
import clsx from "clsx";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import SheetOpenBtnContainer from "../shared/BottomDrawer/shared/SheetOpenBtnContainer";
import * as fabric from "fabric";
import DecoStickerBottomSheet from "../shared/BottomDrawer/DecoStickerBottomSheet";
import downloadURI from "@/utils/downloadURI";
import cropAndResizeImage from "@/utils/cropAndResizeImage";

export default function DecorateWithStickers() {
  const [decoModalOpen, setDecoModalOpen] = useRecoilState(
    cardDecorateModalStateAtom
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const selectedFrame = useRecoilValue(cardFrameAtom);
  const cardImgUrl = useRecoilValue(cardImageUrlAtom);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [deco, setDeco] = useState<boolean>(false);
  const selectedGathering = useRecoilValue(cardSelectedGatheringAtom);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const frames = [
    "/frame1.jpeg",
    "/frame2.jpeg",
    "/frame3.jpeg",
    "/frame4.jpeg",
    "/frame5.jpeg",
    "/frame6.jpeg",
    "/frame7.jpeg",
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
      downloadURI(uri, "card.png");
    }
  };

  useEffect(() => {
    const applyCrop = async () => {
      try {
        const croppedImageUrl = await cropAndResizeImage(
          selectedGathering.invitationImageUrl as string,
          230, // 원하는 너비
          250 // 원하는 높이
        );
        setCroppedImage(croppedImageUrl);
      } catch (err) {
        console.error("이미지 자르기 실패:", err);
      }
    };

    applyCrop();
  }, [selectedGathering.invitationImageUrl]);

  return (
    <div className="h-screen flex flex-col pt-[72px] px-[20px] items-center">
      <Flex justify="space-between" className="px-[20px] w-full" align="center">
        <span className="text-B4 text-grayscale-500">
          점선 영역이 이미지 영역이에요!
        </span>
      </Flex>
      <Spacing size={32} />
      {deco === false ? (
        <div className={clsx(styles.cardContainer)}>
          <div className={styles.dimmed} />
          <button className={styles.button} onClick={handleCaptureImage}>
            꾸미기 시작
          </button>
          <div ref={ref} id="card" className="relative rounded-[20px] w-full">
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
              <Flex
                direction="column"
                className="px-[20px] py-[10px] pb-[20px] h-[100px]"
              >
                <span className={styles.textWrapper}>
                  {selectedGathering.name}
                </span>
                <Spacing size={8} />
                <span className="text-C5">{selectedGathering.description}</span>
                <Spacing size={16} />
                <span className={styles.dateWrapper}>
                  {selectedGathering.date}
                </span>
              </Flex>
            </div>
          </div>
        </div>
      ) : null}
      <Flex direction="column">
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
      </Flex>
      {decoModalOpen ? (
        <DecoStickerBottomSheet
          handleSticker={handleAddSticker}
          open={decoModalOpen}
          onClose={() => setDecoModalOpen(false)}
        />
      ) : null}
      {deco ? <SheetOpenBtnContainer tooltip /> : null}
      <FixedBottomButton
        bgColor="bg-grayscale-50"
        label={"이미지 저장"}
        onClick={() => {
          handleExport();
        }}
      />
    </div>
  );
}

const styles = {
  dimmed:
    "absolute flex justify-center items-center z-10 bg-grayscale-10 inset-0 opacity-50",
  frame: "rounded-[20px] w-[282px] h-[372px]",
  button:
    "absolute z-10 py-[10px] px-[12px] text-C2 bg-grayscale-900 rounded-[10px] cursor-pointer text-base-white",
  saveButton:
    "w-[120px] px-[12px] py-[6px] rounded-[12px] border border-[#D8D8D8] text-[#D8D8D8] bg-base-white text-B4 cursor-pointer",
  cardContainer:
    "relative flex justify-center items-center rounded-[20px] w-[282px] h-[453px]",
  cardWrapper:
    "absolute top-[27px] left-[26.5px] flex flex-col bg-base-white rounded-[12px] w-[230px] h-[318px]",
  imageWrapper:
    "w-[230px] h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "w-[230px] h-[220px]",
  textWrapper: "text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
