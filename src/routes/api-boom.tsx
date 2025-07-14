import { createFileRoute } from "@tanstack/react-router";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { useState } from "react";

export const Route = createFileRoute("/api-boom")({
  component: RouteComponent,
});

function RouteComponent() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  return (
    <>
      <button
        onClick={() => {
          fetch("/api/boom", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          })
            .then((res) => {
              if (res.ok) {
                setToast({ message: "Success!", type: "success" });
              } else {
                setToast({ message: "Error: Request failed", type: "error" });
              }
              setTimeout(() => setToast(null), 3000);
              return res.json();
            })
            .catch((err) => {
              setToast({ message: `Error: ${err.message}`, type: "error" });
              setTimeout(() => setToast(null), 3000);
            });
        }}
      >
        Say Hello
      </button>

      {toast && (
        <div
          className={`fixed bottom-4 left-4 px-4 py-2 rounded-md text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
