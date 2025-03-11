"use client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import useReadNotification from "@/components/notice/hooks/useReadNotification";
import Flex from "@/components/shared/Flex";
import ArrowLeftIcon from "@/components/shared/Icon/ArrowLeftIcon";
import NoticeContainer from "@/components/notice/NoticeContainer";
import clsx from "clsx";
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";

export default function NoticePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: read } = useReadNotification({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
  const { isReactNativeWebView } = useReactNativeWebView();

  useEffect(() => {
    read();
  }, []);

  return (
    <Flex direction="column" className="h-dvh bg-grayscale-50">
      <Flex
        align="center"
        className={clsx(
          "max-w-[430px] mx-auto w-full fixed h-12 gap-[6px] bg-grayscale-50",
          isReactNativeWebView ? "pt-safe-top" : ""
        )}
      >
        <div
          className={arrowIconContainerStyle}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">알림</span>
      </Flex>
      <Suspense>
        <NoticeContainer />
      </Suspense>
    </Flex>
  );
}
const arrowIconContainerStyle =
  "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer";
