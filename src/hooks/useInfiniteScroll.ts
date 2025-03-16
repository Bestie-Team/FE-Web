import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./debounceForScroll";

interface InfiniteScrollType {
  isFetching: boolean;
  loadMore: () => void;
}

const useInfiniteScroll = ({ isFetching, loadMore }: InfiniteScrollType) => {
  const [page, setPage] = useState(0);

  const checkScrollPosition = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    console.log(
      documentHeight,
      scrollTop,
      windowHeight,
      documentHeight - (scrollTop + windowHeight)
    );
    if (documentHeight - (scrollTop + windowHeight) < 500 && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching]);

  const debouncedScroll = useDebounce(checkScrollPosition, 300);

  useEffect(() => {
    document.addEventListener("scroll", debouncedScroll);

    return () => {
      document.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  useEffect(() => {
    if (page > 0) {
      loadMore();
    }
  }, [page]);
};

export default useInfiniteScroll;

interface InfiniteScrollRefType {
  isFetching: boolean;
  loadMore: () => void;
  targetRef: RefObject<HTMLElement>;
  threshold?: number;
  selectedTab?: string;
}

export const useInfiniteScrollByRef = ({
  isFetching,
  loadMore,
  targetRef,
  threshold = 360,
  selectedTab,
}: InfiniteScrollRefType) => {
  const [page, setPage] = useState(0);
  const isLoadingRef = useRef(false);

  const checkScrollPosition = useCallback(() => {
    if (!targetRef.current || isFetching || isLoadingRef.current) {
      return;
    }

    if (!targetRef.current || isFetching || isLoadingRef.current) {
      console.log("스크롤 체크 중단:", {
        refExists: !!targetRef.current,
        isFetching,
        isLoading: isLoadingRef.current,
      });
      return;
    }

    const element = targetRef.current;
    const elementHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const remainingScroll = elementHeight - (scrollTop + clientHeight);

    console.log("스크롤 위치 체크:", {
      elementHeight,
      scrollTop,
      clientHeight,
      remainingScroll,
      threshold,
    });

    if (remainingScroll < threshold) {
      console.log("무한 스크롤 트리거됨!");
      isLoadingRef.current = true;
      setPage((prev) => prev + 1);
    }
  }, [isFetching, targetRef, threshold, selectedTab]);

  // 디바운스 시간을 300ms에서 500ms로 증가하여 더 안정적으로 만듦
  const debouncedScroll = useDebounce(checkScrollPosition, 500);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) return;

    element.addEventListener("scroll", debouncedScroll);
    return () => {
      element.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll, targetRef]);

  useEffect(() => {
    if (page > 0 && !isFetching && isLoadingRef.current) {
      loadMore();
      isLoadingRef.current = false;
    }
  }, [page, loadMore, isFetching]);

  useEffect(() => {
    if (!isFetching) {
      isLoadingRef.current = false;
    }
  }, [isFetching]);
};
