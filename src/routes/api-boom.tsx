import { createFileRoute } from "@tanstack/react-router";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api-boom").methods({
  POST: async ({ request }) => {
    throw new Error("Boom!");
  },
});

export const Route = createFileRoute("/api-boom")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <button
      onClick={() => {
        fetch("/api-boom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }).then((res) => res.json());
      }}
    >
      Say Hello
    </button>
  );
}
