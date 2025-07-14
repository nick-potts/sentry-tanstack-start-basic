import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boom")({
  component: RouteComponent,
  loader: () => {
    throw new Error("Boom!");
  },
});

function RouteComponent() {
  return <div>Hello "/boom"!</div>;
}
