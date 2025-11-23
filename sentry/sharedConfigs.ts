const isDev = process.env.NODE_ENV === "development";

const enabled =
  (process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true" ||
    !!process.env.NEXT_PUBLIC_SENTRY_DSN) &&
  !isDev;

export const sharedConfigs = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled,
  tracesSampleRate: 0.2,
  sampleRate: 0.2,
  debug: false,
};
