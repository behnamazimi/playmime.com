import posthog from "posthog-js";

const NEXTJS_CONTROL_FLOW_ERRORS = new Set(["NEXT_REDIRECT", "NEXT_NOT_FOUND"]);

// Automatically handled by Next.js. Initializes PostHog for client-side instrumentation.
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host:
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://t.playmime.com",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  autocapture: false,
  capture_dead_clicks: false,
  rageclick: false,
  disable_session_recording: true,
  capture_performance: false,
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
  before_send: (event) => {
    if (!event || event.event !== "$exception") {
      return event;
    }

    const exceptionList = event.properties?.["$exception_list"] ?? [];
    const exception = exceptionList[0];
    const message = exception?.["$exception_message"];

    if (typeof message === "string" && NEXTJS_CONTROL_FLOW_ERRORS.has(message)) {
      return null;
    }

    return event;
  },
});
