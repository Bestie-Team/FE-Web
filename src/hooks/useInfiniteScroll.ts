import { RefObject, useCallback, useEffect, useState } from "react";
import useDebounce from "./debounceForScroll";

interface InfiniteScrollType {
  isFetching: boolean;
  loadMore: () => void;
}

const useInfiniteScroll = ({ isFetching, loadMore }: InfiniteScrollType) => {
  const [page, setPage] = useState(1);

  const checkScrollPosition = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (documentHeight - (scrollTop + windowHeight) < 150 && !isFetching) {
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
    loadMore();
  }, [page]);
};

export default useInfiniteScroll;

interface InfiniteScrollRefType {
  isFetching: boolean;
  loadMore: () => void;
  targetRef: RefObject<HTMLElement>;
  threshold?: number;
}

export const useInfiniteScrollByRef = ({
  isFetching,
  loadMore,
  targetRef,
  threshold = 400,
}: InfiniteScrollRefType) => {
  const [page, setPage] = useState(1);

  const checkScrollPosition = useCallback(() => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const elementHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;

    if (elementHeight - (scrollTop + clientHeight) < threshold && !isFetching) {
      setPage((prev) => prev + 1);
    }
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
    loadMore();
  }, [page, loadMore]);
};
