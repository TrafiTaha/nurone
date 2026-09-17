"use client";

import { useState, type FormEvent } from "react";
import { ArrowGlyph } from "@/components/ui/Button";

/** The original footer's "Join our newsletter", as a working (front-end) signup. */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("newsletter-email") ?? "").trim();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  };

  if (state === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-bone">
        <span className="text-live">✓</span> You&apos;re on the list. Weekly updates, nothing else.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="type-label text-dim">
        Join our newsletter
      </label>
      <div className="mt-3 flex items-center border-b border-line-strong transition-colors focus-within:border-signal-hi">
        <input
          id="newsletter-email"
          name="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "newsletter-error" : undefined}
          onChange={() => state === "error" && setState("idle")}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-bone placeholder:text-dim focus:outline-none"
        />
        <button type="submit" className="group grid size-10 place-items-center text-bone transition-colors hover:text-signal-hi">
          <span className="sr-only">Subscribe</span>
          <ArrowGlyph className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {state === "error" && (
        <p id="newsletter-error" className="mt-2 text-xs text-[#ff9b9b]">
          Enter a valid email address.
        </p>
      )}
    </form>
  );
}
