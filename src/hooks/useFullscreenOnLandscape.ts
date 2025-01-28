import { useEffect } from "react";
import { useFullscreen } from "ahooks";

function useFullscreenOnLandscape({
  isMobile,
  isLandscape,
  target = null,
}: {
  isMobile: boolean;
  isLandscape: boolean;
  target?: HTMLElement | null;
}) {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(
    target ??
      (typeof document !== "undefined" ? document.documentElement : null)
  );

  useEffect(() => {
    if (isMobile && isLandscape && !isFullscreen) {
      enterFullscreen();
    }
    if (!isLandscape && isFullscreen) {
      exitFullscreen();
    }
  }, [isMobile, isLandscape, isFullscreen, enterFullscreen, exitFullscreen]);

  return isFullscreen;
}

export default useFullscreenOnLandscape;
