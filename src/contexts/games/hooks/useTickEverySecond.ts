import { useEffect, useRef } from "react";

const interval = 1000;

const useTickEverySecond = (isActive: boolean, callback: () => void) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        callback();
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, callback]);
};

export default useTickEverySecond;
