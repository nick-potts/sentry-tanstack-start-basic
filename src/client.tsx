// src/client.tsx
import {
  createMiddleware,
  registerGlobalMiddleware,
  StartClient,
} from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

import * as Sentry from "@sentry/tanstackstart-react";

const router = createRouter();

Sentry.init({
  dsn: "https://b239a0008d315f9fc81a5978a47d6eaf@o4509366728589312.ingest.us.sentry.io/4509667179036672",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  enabled: false,
});

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: "function" }).client(({ next }) => {
      console.log("global client middleware running");
      return next();
    }),
  ],
});

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>
);
