/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );

  return debouncedFunc as T;
}
