import * as Sentry from "@sentry/nextjs";

const reportError = (error: unknown) => {
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = JSON.stringify(error);
  }

  Sentry.captureMessage(errorMessage, {
    level: "error",
  });
};

export default reportError;
