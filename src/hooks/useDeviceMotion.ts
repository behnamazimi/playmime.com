import { useState, useEffect, useCallback, useRef } from "react";

export type DeviceOrientation = "upward" | "downward" | "stable";

interface DeviceMotionConfig {
  /** The minimum time (ms) a device must remain in stable mode for confirming stabilization. */
  stabilizationConfirmTime?: number;
}

const THRESHOLDS = {
  stable: 2.5,
  upward: 6.5,
  downward: -6.5,
  tiltTolerance: 2.5,
} as const;

const IS_IOS = /iPhone|iPad|iPod/i.test(
  typeof navigator !== "undefined" ? navigator.userAgent : ""
);

const normalizeAcceleration = (
  x: number | null,
  y: number | null,
  z: number | null
): { x: number; y: number; z: number } => ({
  x: x ?? 0,
  y: y ?? 0,
  z: IS_IOS ? (z ?? 0) * -1 : (z ?? 0),
});

export const useDeviceMotion = (
  onOrientationChange: (orientation: DeviceOrientation) => void,
  config: DeviceMotionConfig = {}
): DeviceOrientation => {
  const { stabilizationConfirmTime = 300 } = config;
  const stabilizationStartTime = useRef<number | null>(null);

  const [currentOrientation, setCurrentOrientation] =
    useState<DeviceOrientation>("stable");
  const [isStabilized, setIsStabilized] = useState(false);

  const requestPermission = useCallback(async (): Promise<PermissionState> => {
    if (typeof window === "undefined") return "denied";

    // Handle iOS permission request
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      "requestPermission" in DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        return await DeviceMotionEvent.requestPermission();
      } catch (error) {
        console.error("Error requesting device motion permission:", error);
        return "denied";
      }
    }

    // For non-iOS devices that support device motion
    if (window.DeviceMotionEvent) {
      return "granted";
    }

    return "denied";
  }, []);

  // Add permission request on mount
  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (typeof window === "undefined") return;

      // Only for iOS devices that require permission
      if (
        IS_IOS &&
        typeof DeviceMotionEvent !== "undefined" &&
        "requestPermission" in DeviceMotionEvent
      ) {
        await requestPermission();
      }
    };

    checkAndRequestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.DeviceMotionEvent) {
      console.warn("Device motion events are not supported");
      return;
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { y, z } = normalizeAcceleration(
        acceleration.x,
        acceleration.y,
        acceleration.z
      );

      let newOrientation: DeviceOrientation | undefined = undefined;

      if (
        Math.abs(z) < THRESHOLDS.stable &&
        Math.abs(y) < THRESHOLDS.tiltTolerance
      ) {
        if (!stabilizationStartTime.current) {
          stabilizationStartTime.current = Date.now();
        } else if (
          Date.now() - stabilizationStartTime.current >=
          stabilizationConfirmTime
        ) {
          if (!isStabilized) {
            setIsStabilized(true);
            newOrientation = "stable";
          }
        }
      } else {
        stabilizationStartTime.current = null;
        if (isStabilized) {
          if (z > THRESHOLDS.upward && y < THRESHOLDS.tiltTolerance) {
            newOrientation = "upward";
            setIsStabilized(false);
          } else if (
            z < THRESHOLDS.downward &&
            Math.abs(y) < THRESHOLDS.tiltTolerance
          ) {
            newOrientation = "downward";
            setIsStabilized(false);
          }
        }
      }

      if (newOrientation && newOrientation !== "stable") {
        setCurrentOrientation(newOrientation);
        onOrientationChange(newOrientation);
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isStabilized, onOrientationChange, stabilizationConfirmTime]);

  return currentOrientation;
};

export default useDeviceMotion;
