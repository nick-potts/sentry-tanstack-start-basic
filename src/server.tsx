// src/server.ts
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";

import * as Sentry from "@sentry/tanstackstart-react";
import {
  createMiddleware,
  registerGlobalMiddleware,
} from "@tanstack/react-start";

Sentry.init({
  dsn: "https://b239a0008d315f9fc81a5978a47d6eaf@o4509366728589312.ingest.us.sentry.io/4509667179036672",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 1.0,

  beforeSend(event) {
    console.log("event sent to sentry", event);
    return event;
  },
  beforeBreadcrumb(breadcrumb) {
    console.log("breadcrumb sent to sentry", breadcrumb);
    return breadcrumb;
  },
});

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: "function" }).server(({ next }) => {
      return next();
    }),
    createMiddleware({ type: "function" }).server(
      Sentry.sentryGlobalServerMiddlewareHandler()
    ),
  ],
});

export default createStartHandler({
  createRouter,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
