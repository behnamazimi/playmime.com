import posthog from "posthog-js";

type EventProperties = Record<string, unknown>;

export const AD_EVENTS = {
  SLOT_MOUNTED: "footer_ad_slot_mounted",
  IMPRESSION: "footer_ad_impression",
  VIEWABLE: "footer_ad_viewable",
  LOADED: "footer_ad_loaded",
  UNFILLED: "footer_ad_unfilled",
  ERROR: "footer_ad_error",
  CLICK: "footer_ad_click",
} as const;

export type AdEvent = (typeof AD_EVENTS)[keyof typeof AD_EVENTS];

export function trackEvent(
  eventName: string,
  properties?: EventProperties,
): void {
  if (typeof window === "undefined") return;

  posthog.capture(eventName, properties);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...properties,
  });
}

export function trackAdEvent(
  event: AdEvent,
  properties?: EventProperties,
): void {
  trackEvent(event, {
    ad_placement: "footer",
    ad_provider: "google_adsense",
    ...properties,
  });
}
