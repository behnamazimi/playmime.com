import type NodeCache from "node-cache";
import * as Sentry from "@sentry/nextjs";

export async function register() {
  // Initialize NodeCache
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const NodeCache = (await import("node-cache")).default;
    const config: NodeCache.Options = {
      stdTTL: process.env.NODE_ENV === "production" ? 0 : 60,
    };

    global.cacheConfigs = new NodeCache(config);
    global.cacheUser = new NodeCache(config);
  }

  // Initialize Sentry
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry/sentry.edge.config");
  } else if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry/sentry.server.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
