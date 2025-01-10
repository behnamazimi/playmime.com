// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { sharedConfigs } from "./sharedConfigs";
import {
  breadcrumbsIntegration,
  browserApiErrorsIntegration,
  browserTracingIntegration,
  functionToStringIntegration,
  httpContextIntegration,
  init,
} from "@sentry/nextjs";

init({
  ...sharedConfigs,
  integrations: [
    functionToStringIntegration(),
    browserApiErrorsIntegration(),
    breadcrumbsIntegration(),
    httpContextIntegration(),
    browserTracingIntegration({
      enableInp: true,
    }),
  ],
});
