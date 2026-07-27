"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_ACCESS_CODE } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Failed to authenticate");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setAuthError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <section className="w-full">
        <h1 className="text-xl font-medium">Session dashboard</h1>
        <p className="muted mt-2">Enter the demo code to continue.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-1 text-sm">
            <span>Access code</span>
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="input"
              placeholder={DEMO_ACCESS_CODE}
              disabled={isSubmitting}
            />
          </label>

          {authError ? (
            <p className="text-sm text-red-600">{authError}</p>
          ) : (
            <p className="muted">Demo code: {DEMO_ACCESS_CODE}</p>
          )}

          <button type="submit" className="btn w-full" >
            {isSubmitting ? "Signing in..." : "Continue"}
          </button>
        </form>
      </section>
    </main>
  );
}
