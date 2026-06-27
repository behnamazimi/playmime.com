import posthog from "posthog-js";

// Automatically handled by Next.js. Initializes PostHog for client-side instrumentation.
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  autocapture: false,
  capture_dead_clicks: false,
  rageclick: false,
  disable_session_recording: true,
  capture_performance: false,
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});
