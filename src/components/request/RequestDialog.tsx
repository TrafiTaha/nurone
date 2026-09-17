"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RequestForm } from "./RequestForm";

/** "Get in touch" opens a native modal dialog (focus trap, Esc and inert background for free). */
export function RequestDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Magnetic>
        <Button type="button" size="lg" variant="beam" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
          {site.contactCta.label}
        </Button>
      </Magnetic>

      <dialog
        ref={dialog}
        aria-labelledby="request-dialog-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm border border-line-strong bg-ink-900 p-0 text-bone shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)] open:animate-[fade-up_0.45s_var(--ease-expo)] backdrop:bg-transparent"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
          <p className="type-label flex items-center gap-2 text-dim">
            <span className="pulse size-1.5 rounded-full bg-live" />
            Request access
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-mute transition-colors hover:border-signal-hi hover:text-signal-hi"
          >
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <h2 id="request-dialog-title" className="type-heading text-3xl sm:text-4xl">
            Where are you <span className="text-signal-hi">now?</span>
          </h2>
          <p className="mt-3 text-mute">We review every request and reply with the Lab that fits and what we would do first.</p>
          <RequestForm />
        </div>
      </dialog>
    </>
  );
}
