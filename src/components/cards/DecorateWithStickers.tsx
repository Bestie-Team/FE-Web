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
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";
import { openSettingsMobile, saveImageMobile } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";
import { lightyToast } from "@/utils/toast";
import Modal from "../shared/Modal/Modal";

export default function DecorateWithStickers() {
  const [decoBottomSheetState, setDecoBottomSheetState] = useRecoilState(
    decoBottomSheetStateAtom
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageBottomSheetOpen, setImageBottomSheetOpen] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const selectedFrame = useRecoilValue(cardFrameAtom);
  const cardImgUrl = useRecoilValue(cardImageUrlAtom);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [deco, setDeco] = useState<boolean>(false);
  const selectedFeed = useRecoilValue(cardSelectedFeedAtom);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { isReactNativeWebView } = useReactNativeWebView();

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
        preserveObjectStacking: true,
      });
    }
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  // const handleCaptureImage = useCallback(async () => {
  //   setDeco(true);
  //   if (ref.current === null || !fabricCanvasRef.current) {
  //     console.log(ref.current, ref);
  //     console.log(fabricCanvasRef.current);
  //     return;
  //   }

  //   try {
  //     const canvas = await html2canvas(ref.current, {
  //       scale: 3,
  //       useCORS: true,
  //       allowTaint: false,
  //       backgroundColor: null,
  //       logging: false,
  //     });

  //     const dataUrl = canvas.toDataURL("image/png", 1.0);

  //     const img = new Image();
  //     img.crossOrigin = "anonymous";

  //     // img.src = dataUrl;
  //     img.onload = async () => {
  //       const canvas = fabricCanvasRef.current;
  //       if (canvas) {
  //         const bgImage = new fabric.Image(img, {
  //           originX: "left",
  //           originY: "top",
  //           crossOrigin: "anonymous",
  //         });

  //         const canvasAspectRatio = canvas.width! / canvas.height!;
  //         const imageAspectRatio = img.width / img.height;

  //         if (imageAspectRatio > canvasAspectRatio) {
  //           bgImage.scaleToWidth(canvas.width!);
  //         } else {
  //           bgImage.scaleToHeight(canvas.height!);
  //         }

  //         canvas.backgroundImage = bgImage;
  //         canvas.renderAll();
  //       }
  //     };
  //     img.onerror = (error) => {
  //       console.error("이미지 로드 오류:", error);
  //       lightyToast.error("이미지 로드에 실패했습니다");
  //     };

  //     img.src = dataUrl;
  //   } catch (err) {
  //     console.error("이미지 캡처 오류:", err);
  //     lightyToast.error("이미지 캡처에 실패했습니다");
  //   }
  // }, [croppedImage, ref.current]);

  const handleCaptureImage = useCallback(async () => {
    setDeco(true);
    if (!ref.current || !fabricCanvasRef.current) {
      console.log(ref.current, ref);
      console.log(fabricCanvasRef.current);
      return;
    }

    try {
      // 📌 html2canvas 설정 최적화
      const canvas = await html2canvas(ref.current, {
        scale: Math.min(2, window.devicePixelRatio), // 모바일 최적화: 성능을 고려한 scale 조정
        useCORS: true,
        allowTaint: false,
        backgroundColor: "transparent",
        logging: false,
      });

      // 📌 메모리 사용량 최적화를 위한 크기 조절
      const dataUrl = canvas.toDataURL("image/png", 0.8); // 퀄리티를 0.8로 낮춰서 최적화

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = async () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const bgImage = new fabric.Image(img, {
          originX: "left",
          originY: "top",
          crossOrigin: "anonymous",
        });

        const canvasAspectRatio = canvas.width! / canvas.height!;
        const imageAspectRatio = img.width / img.height;

        // 📌 모바일에서 비율 조절 시 더 부드럽게 맞춤
        if (imageAspectRatio > canvasAspectRatio) {
          bgImage.scaleToWidth(canvas.width!);
        } else {
          bgImage.scaleToHeight(canvas.height!);
        }

        canvas.backgroundImage = bgImage;
        canvas.renderAll();
      };

      img.onerror = (error) => {
        console.error("이미지 로드 오류:", error);
        lightyToast.error("이미지 로드에 실패했습니다");
      };

      // 📌 로드 대기 시간을 추가해 모바일에서의 실패 확률 줄이기
      setTimeout(() => {
        img.src = dataUrl;
      }, 100); // 100ms 대기 후 로드 시도
    } catch (err) {
      console.error("이미지 캡처 오류:", err);
      lightyToast.error("이미지 캡처에 실패했습니다");
    }
  }, [croppedImage, ref]);

  const handleAddSticker = async (path: string) => {
    if (!fabricCanvasRef.current) {
      console.error("Canvas reference is not initialized.");
      return;
    }
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
      lightyToast.error("스티커 추가에 실패했습니다");
    }
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    if (fabricCanvasRef.current) {
      const uri = fabricCanvasRef.current.toDataURL({
        format: "png",
        multiplier: 2,
      });

      if (isReactNativeWebView) {
        saveImageMobile(uri);
        return;
      }
      setImageUri(uri);
      setImageBottomSheetOpen(true);
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.SAVE_IMAGE_SUCCESS) {
        lightyToast.success("포토 카드 저장 완료");
      }
      if (message.type === WEBVIEW_EVENT.SAVE_IMAGE_PERMISSION_DENIED) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const applyCrop = async () => {
      if (!selectedFeed.imageUrl) return;

      try {
        const croppedImageUrl = await cropAndResizeImage(
          selectedFeed.imageUrl as string,
          230, // 원하는 너비
          250 // 원하는 높이
        );
        setCroppedImage(croppedImageUrl);
      } catch (err) {
        console.error("이미지 자르기 실패:", err);
        lightyToast.error("이미지 처리에 실패했습니다");
      }
    };

    applyCrop();
  }, [selectedFeed.imageUrl]);

  return (
    <div className="h-dvh overflow-y-scroll no-scrollbar">
      {!deco && (
        <Flex
          className="min-h-dvh pt-safe-top pb-12"
          direction="column"
          justify="space-between"
        >
          <div className="pt-[76px]">
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
                  crossOrigin="anonymous"
                />
                <div className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    {croppedImage ? (
                      <img
                        src={croppedImage}
                        alt="Cropped Image"
                        width={230}
                        height={218}
                        crossOrigin="anonymous"
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
          <div className="mb-safe-bottom">
            <BottomButton
              disabled={selectedFrame == null}
              onClick={handleCaptureImage}
              label="꾸미기 시작"
            />
          </div>
        </Flex>
      )}
      {/* 이 부분이 deco가 false일 때도 렌더링 돼서 아랫 부분에 스크롤 생기고 있었어요. */}
      <Flex
        direction="column"
        justify="space-between"
        className="min-h-dvh pt-safe-top pb-12 w-full"
        style={{ display: deco ? "flex" : "none" }}
      >
        <Flex
          className="w-full px-6 pt-[76px]"
          direction="column"
          align="center"
        >
          <span className="text-B4 text-base-white w-full"></span>
          <Spacing size={32} />
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
                touchAction: "none",
              }}
            />
          </div>
        </Flex>
        <div className="relative mx-auto max-w-[430px] w-full mb-safe-bottom">
          <FloatingButton tooltip />
          <BottomButton
            label={"이미지 저장"}
            onClick={() => {
              handleExport();
            }}
          />
        </div>
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

      {isModalOpen && (
        <Modal
          action={() => openSettingsMobile()}
          onClose={() => setIsModalOpen(false)}
          content="라이티의 사진 권한을 허용해주세요"
          left="닫기"
          right="설정"
        />
      )}
    </div>
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
