import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export function useSsrSafeLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);

  if (!isClient) {
    return [initialValue, () => {}]; // No-op setter for SSR
  }

  return [storedValue, setStoredValue];
}
