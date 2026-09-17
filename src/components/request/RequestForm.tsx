"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { labs } from "@/content/labs";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<"name" | "email" | "stage", string>>;

const inputClass =
  "mt-2 block w-full rounded-sm border border-line-strong bg-ink-950 px-4 py-3 text-bone placeholder:text-dim transition-colors focus:border-signal-hi focus:outline-none aria-[invalid=true]:border-[#ff8a8a]";

/**
 * Front-end only: validates and confirms. `onSubmit` is the single place to
 * connect a CRM, form service or API route.
 */
export function RequestForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) statusRef.current?.focus();
  }, [submitted]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "We need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    if (!data.get("stage")) next.stage = "Pick the stage closest to yours.";

    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (sending) return;
    // Connect a CRM or API route here; the pending state mirrors that round trip.
    setSending(true);
    const lab = labs.find((l) => l.id === data.get("stage"))?.name ?? "";
    timer.current = setTimeout(() => setSubmitted(lab), 900);
  };

  if (submitted !== null) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="mt-8 rounded-sm border border-line bg-ink-950 p-6 font-mono text-sm leading-8 focus:outline-none">
        <p>
          <span className="text-live">✓</span> Request received
        </p>
        <p>
          <span className="text-live">✓</span> Routed to fit check · <span className="text-signal-hi">{submitted}</span>
        </p>
        <p className="text-mute">→ A person reviews it and replies with the Lab that fits and what we&apos;d do first.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      // Clear a field's error as soon as the person corrects it.
      onChange={(e) => {
        const name = (e.target as EventTarget as HTMLInputElement).name as keyof Errors;
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
      }}
      className="mt-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field label="Work email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
      </div>

      <fieldset className="mt-6" aria-describedby={errors.stage ? "stage-error" : undefined}>
        <legend className="text-sm text-bone">Where are you now?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {labs.map((lab) => (
            <label
              key={lab.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-sm border bg-ink-950 px-4 py-3 text-sm transition-colors has-[:checked]:border-signal-hi has-[:checked]:bg-signal/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal-hi",
                errors.stage ? "border-[#ff8a8a]/60" : "border-line-strong hover:border-mute",
              )}
            >
              <input type="radio" name="stage" value={lab.id} className="mt-0.5 size-4 shrink-0 accent-[var(--color-signal)] focus:outline-none" />
              <span>
                <span className="block text-bone">{lab.stage}</span>
                <span className="type-label mt-1 block text-dim">{lab.name}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.stage && <FieldError id="stage-error">{errors.stage}</FieldError>}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="details" className="text-sm text-bone">
          What are you building? <span className="text-dim">(optional)</span>
        </label>
        <textarea id="details" name="details" rows={3} placeholder="A link, a sentence, or where it's breaking." className={cn(inputClass, "resize-y")} />
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full" loading={sending} arrow={!sending}>
        {sending ? "Sending request" : "Request access"}
      </Button>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm text-bone">
        {label}
      </label>
      {children}
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-[#ff9b9b]">
      {children}
    </p>
  );
}
