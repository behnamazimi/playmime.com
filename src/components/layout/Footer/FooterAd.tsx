"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AD_EVENTS, trackAdEvent } from "@/utils/analytics";

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const SLOT_ID = "9632820730";
const adsEnabled = Boolean(clientId && SLOT_ID);

const UNFILLED_TIMEOUT_MS = 5000;
const VIEWABLE_DELAY_MS = 1000;

const FooterAd = () => {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();
  const pushedRef = useRef(false);
  const viewableTrackedRef = useRef(false);
  const loadedTrackedRef = useRef(false);
  const unfilledTrackedRef = useRef(false);

  const requestAd = useCallback(() => {
    if (pushedRef.current || !adRef.current) return;
    pushedRef.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      trackAdEvent(AD_EVENTS.IMPRESSION, {
        page_path: pathname,
        slot_id: SLOT_ID,
        client_id: clientId,
      });
    } catch (error) {
      pushedRef.current = false;
      trackAdEvent(AD_EVENTS.ERROR, {
        page_path: pathname,
        error: error instanceof Error ? error.message : String(error),
        stage: "request",
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (!adsEnabled) return;

    trackAdEvent(AD_EVENTS.SLOT_MOUNTED, { page_path: pathname });

    if (window.adsbygoogle) {
      requestAd();
    }
  }, [pathname, requestAd]);

  useEffect(() => {
    if (!adsEnabled || !adRef.current) return;

    const adElement = adRef.current;
    let viewableTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (viewableTimer) {
          clearTimeout(viewableTimer);
          viewableTimer = null;
        }

        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;

        viewableTimer = setTimeout(() => {
          if (viewableTrackedRef.current || !adRef.current) return;

          const rect = adRef.current.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) -
            Math.max(rect.top, 0);
          const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;

          if (visibleRatio >= 0.5) {
            viewableTrackedRef.current = true;
            trackAdEvent(AD_EVENTS.VIEWABLE, { page_path: pathname });
          }
        }, VIEWABLE_DELAY_MS);
      },
      { threshold: [0.5] },
    );

    observer.observe(adElement);

    return () => {
      observer.disconnect();
      if (viewableTimer) clearTimeout(viewableTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!adsEnabled || !adRef.current) return;

    const adElement = adRef.current;

    const trackLoaded = () => {
      if (loadedTrackedRef.current || unfilledTrackedRef.current) return;
      loadedTrackedRef.current = true;
      trackAdEvent(AD_EVENTS.LOADED, { page_path: pathname });
    };

    const trackUnfilled = () => {
      if (loadedTrackedRef.current || unfilledTrackedRef.current) return;
      unfilledTrackedRef.current = true;
      trackAdEvent(AD_EVENTS.UNFILLED, { page_path: pathname });
    };

    const mutationObserver = new MutationObserver(() => {
      if (adElement.querySelector("iframe")) {
        trackLoaded();
      }
    });

    mutationObserver.observe(adElement, { childList: true, subtree: true });

    const unfilledTimer = setTimeout(() => {
      if (adElement.querySelector("iframe")) {
        trackLoaded();
      } else {
        trackUnfilled();
      }
    }, UNFILLED_TIMEOUT_MS);

    return () => {
      mutationObserver.disconnect();
      clearTimeout(unfilledTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!adsEnabled || !adRef.current) return;

    const container = adRef.current.parentElement;
    if (!container) return;

    let mouseDownOnAd = false;

    const onMouseDown = (event: MouseEvent) => {
      mouseDownOnAd = container.contains(event.target as Node);
    };

    const onBlur = () => {
      if (!mouseDownOnAd) return;
      mouseDownOnAd = false;
      trackAdEvent(AD_EVENTS.CLICK, { page_path: pathname });
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("blur", onBlur);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("blur", onBlur);
    };
  }, [pathname]);

  if (!adsEnabled) return null;

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={requestAd}
        onError={() =>
          trackAdEvent(AD_EVENTS.ERROR, {
            page_path: pathname,
            error: "script_load_failed",
            stage: "script",
          })
        }
      />
      <div className="my-3 w-full overflow-hidden">
        <p className="mb-1 text-[10px] uppercase tracking-wide text-gray-300">
          Ad
        </p>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={SLOT_ID}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
};

export default FooterAd;
