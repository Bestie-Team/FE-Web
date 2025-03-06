"use client";
import { useRouter } from "next/navigation";
import Flex from "../shared/Flex";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import NoticeContainer from "./NoticeContainer";
import useReadNotification from "./hooks/useReadNotification";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DotSpinner from "../shared/Spinner/DotSpinner";

export default function Notice() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: read } = useReadNotification({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      read();
    }
  }, [isClient]);

  if (!isClient) {
    return <DotSpinner />;
  }

  return (
    <Flex direction="column" className="h-screen bg-grayscale-50">
      <Flex align="center" className="fixed h-12 gap-[6px]">
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
      <NoticeContainer />
    </Flex>
  );
}
const arrowIconContainerStyle =
  "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer";
