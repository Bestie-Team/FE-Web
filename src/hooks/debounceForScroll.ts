import { useState, useCallback } from "react";

type UseDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => (...args: any[]) => void;

const useDebounce: UseDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId]
  );
};

export default useDebounce;
