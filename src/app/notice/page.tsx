"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import useReadNotification from "@/components/notice/hooks/useReadNotification";
import Flex from "@/components/shared/Flex";
import NoticeContainer from "@/components/notice/NoticeContainer";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";

export default function NoticePage() {
  const queryClient = useQueryClient();
  const { mutate: read } = useReadNotification({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  useEffect(() => {
    read();
  }, []);

  return (
    <Flex direction="column" className="h-dvh bg-grayscale-50">
      <Suspense>
        <HeaderWithBtn headerLabel="알림" bgColor="#F4F4F4" />
        <NoticeContainer />
      </Suspense>
    </Flex>
  );
}
