import { useState, useEffect, useCallback, RefObject } from "react";
import useDebounce from "./debounceForScroll";

interface InfiniteScrollByWidthRefType {
  isFetching: boolean;
  loadMore: () => void;
  targetRef: RefObject<HTMLElement>;
  threshold?: number;
}

export const useInfiniteScrollByWidth = ({
  isFetching,
  loadMore,
  targetRef,
  threshold = 100,
}: InfiniteScrollByWidthRefType) => {
  const [page, setPage] = useState(0);

  const checkScrollPosition = useCallback(() => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const scrollWidth = element.scrollWidth;
    const scrollLeft = element.scrollLeft;
    const clientWidth = element.clientWidth;

    if (scrollWidth - (scrollLeft + clientWidth) < threshold && !isFetching) {
      setPage((prev) => prev + 1);
    }
    console.log("Remaining width:", scrollWidth - (scrollLeft + clientWidth));
  }, [isFetching, targetRef, threshold]);

  const debouncedScroll = useDebounce(checkScrollPosition, 300);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    element.addEventListener("scroll", debouncedScroll);

    return () => {
      element.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll, targetRef]);

  useEffect(() => {
    if (page > 0) {
      loadMore();
    }
  }, [page, loadMore]);
};
