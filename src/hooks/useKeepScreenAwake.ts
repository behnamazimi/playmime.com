import { useState, useEffect, useCallback } from "react";
import { KeepAwake } from "@capacitor-community/keep-awake";

const useKeepScreenAwake = (
  shouldKeepAwake: boolean
): { wakeLockActive: boolean } => {
  const [wakeLockActive, setKeepAwakeActive] = useState(false);

  const requestKeepAwake = useCallback(async (): Promise<void> => {
    try {
      await KeepAwake.keepAwake();

      setKeepAwakeActive(true);
    } catch {
      // Nothing to handle
    }
  }, []);

  const releaseKeepAwake = useCallback(async () => {
    const isSupported = await KeepAwake.isSupported();
    if (isSupported) {
      KeepAwake.allowSleep().then(() => {
        setKeepAwakeActive(false);
      });
    }
  }, []);

  useEffect(() => {
    if (shouldKeepAwake) {
      requestKeepAwake();
    } else {
      releaseKeepAwake();
    }

    return () => {
      releaseKeepAwake();
    };
  }, [shouldKeepAwake, requestKeepAwake, releaseKeepAwake]);

  return { wakeLockActive };
};

export default useKeepScreenAwake;
