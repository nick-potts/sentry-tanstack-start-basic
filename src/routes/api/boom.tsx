import { createFileRoute } from "@tanstack/react-router";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/boom").methods({
  POST: async ({ request }) => {
    throw new Error("Boom!");
  },
});
