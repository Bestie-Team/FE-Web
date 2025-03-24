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
import { FabricImage, type Canvas, Text } from "fabric";
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
  const imageRef = React.useRef<HTMLImageElement | null>(null);
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
      });
    }
    return () => {
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  const handleOriginalCapture = useCallback(async () => {
    setDeco(true);
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
      img.crossOrigin = "anonymous";
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
    } catch (err) {
      console.error("이미지 캡처 오류:", err);
    }
  }, []);

  // 최신 Fabric.js 버전을 위한 수정된 솔루션
  const handleSimpleCaptureForWebView = useCallback(
    (
      setDeco: (value: boolean) => void,
      fabricCanvasRef: React.MutableRefObject<Canvas | null>,
      frames: string[],
      selectedFrame: number,
      croppedImage: string | null,
      selectedFeed: any
    ) => {
      if (!fabricCanvasRef.current) return;

      setTimeout(() => {
        setDeco(true);

        // 프레임 이미지 직접 로드
        FabricImage.fromURL(frames[selectedFrame], {
          crossOrigin: "anonymous",
        })
          .then((frameObj) => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;

            frameObj.scaleToWidth(canvas.width!);
            frameObj.scaleToHeight(canvas.height!);

            canvas.backgroundImage = frameObj;
            canvas.renderAll();

            if (croppedImage) {
              FabricImage.fromURL(croppedImage, {
                crossOrigin: "anonymous",
              })
                .then((contentObj) => {
                  // 콘텐츠 이미지 위치 및 크기 조정
                  contentObj.scaleToWidth(230);
                  contentObj.set({
                    left: 26,
                    top: 77,
                  });

                  canvas.add(contentObj);
                  canvas.renderAll();

                  addTextToCanvas(canvas, selectedFeed);
                })
                .catch((error) => {
                  console.error("콘텐츠 이미지 로드 오류:", error);
                  addTextToCanvas(canvas, selectedFeed);
                });
            } else {
              addTextToCanvas(canvas, selectedFeed);
            }
          })
          .catch((error) => {
            console.error("프레임 이미지 로드 오류:", error);
          });
      }, 500);
    },
    []
  );

  // 텍스트 추가 헬퍼 함수
  const addTextToCanvas = (canvas: Canvas, feed: any) => {
    // 이름 텍스트
    const nameText = new Text(feed.name || "", {
      left: 26,
      top: 310,
      fontFamily: "Arial",
      fontSize: 14,
      fill: "black",
    });

    // 콘텐츠 텍스트
    const contentText = new Text(feed.content || "", {
      left: 26,
      top: 330,
      fontFamily: "Arial",
      fontSize: 12,
      fill: "#666",
    });

    // 날짜 텍스트
    const dateText = new Text(format(feed.date.slice(0, 10), "yyyy.MM.dd"), {
      left: 26,
      top: 350,
      fontFamily: "Arial",
      fontSize: 10,
      fill: "#999",
    });

    // 캔버스에 텍스트 추가
    canvas.add(nameText, contentText, dateText);
    canvas.renderAll();
  };

  const handleCaptureImage = useCallback(() => {
    // 웹뷰 환경 감지
    const isWebView = isReactNativeWebView;
    if (isWebView) {
      // 웹뷰용 방법 사용
      handleSimpleCaptureForWebView(
        setDeco,
        fabricCanvasRef,
        frames,
        selectedFrame,
        croppedImage,
        selectedFeed
      );
    } else {
      handleOriginalCapture();
    }
  }, [
    isReactNativeWebView,
    handleSimpleCaptureForWebView,
    handleOriginalCapture,
  ]);

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
    setTimeout(() => {
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
    }, 100);
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
