"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import useReadNotification from "@/components/notice/hooks/useReadNotification";
import Flex from "@/components/shared/Flex";
import NoticeContainer from "@/components/notice/NoticeContainer";
import HeaderWithBtn from "@/components/layout/Header/HeaderWithBtn";
import type * as lighty from "lighty-type";
import type { InfiniteData } from "@tanstack/react-query";

export default function NoticePage() {
  const queryClient = useQueryClient();
  const { mutate: read } = useReadNotification({
    onSuccess: () => {
      const now = new Date().toISOString();
      queryClient.setQueryData(
        ["notification"],
        (
          old:
            | InfiniteData<lighty.NotificationListResponse>
            | undefined
            | null
        ) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((n) =>
                n.readAt ? n : { ...n, readAt: now }
              ),
            })),
          };
        }
      );
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
