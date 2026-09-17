"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, sections, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const sectionIds = sections.map((s) => s.id);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("top");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const chapter = sections.find((s) => s.id === current) ?? sections[0];

  // Capsule state: a 24px sentinel at the top of the document leaves the viewport.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
    document.body.appendChild(sentinel);
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Active section: whichever nav target crosses the upper third of the viewport.
  useEffect(() => {
    const targets = sectionIds.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-30% 0px -69% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open && restoreFocus.current) {
      restoreFocus.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  // Mobile menu: scroll lock, Escape, focus containment.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        restoreFocus.current = true;
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menu || !toggle) return;
      const focusables = [toggle, ...menu.querySelectorAll<HTMLElement>("a")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={cn(
          "relative mx-auto overflow-hidden border transition-[max-width,margin,border-radius,background-color,border-color,box-shadow] duration-700 ease-expo",
          scrolled || open
            ? "mt-3 max-w-[74rem] rounded-full border-line-strong bg-[rgb(8_17_30/0.72)] shadow-[0_18px_50px_-24px_rgb(2_6_12/0.9),inset_0_1px_0_rgb(214_228_255/0.06)] backdrop-blur-xl"
            : "mt-0 max-w-[100rem] rounded-none border-transparent",
          open && "rounded-3xl",
        )}
      >
        <span aria-hidden="true" className={cn("scroll-progress absolute inset-x-10 bottom-0 h-px bg-signal-hi/70 transition-opacity", scrolled ? "opacity-100" : "opacity-0")} />
        <Container className={cn("flex items-center justify-between gap-6 transition-[height] duration-500 ease-expo", scrolled ? "h-14 lg:px-6" : "h-[4.75rem]")}>
          <div className="relative z-10 flex items-center gap-5">
            <a href="#top" className="-m-1 rounded-sm p-1" aria-label="NURONE home">
              <Logo />
            </a>
            {/* Where you are in the journey: appears once you leave the hero. */}
            <p aria-hidden="true" className={cn("type-label hidden items-center gap-3 border-l border-line pl-5 transition-opacity duration-500 xl:flex", scrolled && chapter.index !== "01" ? "opacity-100" : "opacity-0")}>
              <span key={chapter.index} className="enter tabular text-signal-hi">{chapter.index}</span>
              <span key={chapter.name} className="enter text-mute" style={{ ["--i" as string]: 1 }}>{chapter.name}</span>
            </p>
          </div>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const on = current === link.href.slice(1) || (link.href === "#work" && (current === "impact" || current === "testimonials"));
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={on ? "location" : undefined}
                      className={cn("group relative block px-3.5 py-2 text-[0.8125rem] transition-colors duration-300", on ? "text-bone" : "text-mute hover:text-bone")}
                    >
                      {link.label}
                      <span aria-hidden="true" className={cn("absolute inset-x-3.5 bottom-0.5 h-px origin-left bg-signal-hi transition-transform duration-500 ease-expo", on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50")} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href={site.contactCta.href} variant="outline" size="sm">
                {site.contactCta.label}
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-bone lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path className={cn("origin-center transition-transform duration-300", open && "translate-y-[3px] rotate-45")} d="M5 9h14" />
                <path className={cn("origin-center transition-transform duration-300", open && "-translate-y-[3px] -rotate-45")} d="M5 15h14" />
              </svg>
            </button>
          </div>
        </Container>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-[var(--page-bg)] transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div aria-hidden="true" className="schematic-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative flex min-h-full flex-col pt-8 pb-10">
          <p className="type-label text-dim">Navigate the system</p>
          <nav aria-label="Mobile" className="mt-6">
            <ul className="border-t border-line">
              {navLinks.map((link, i) => (
                <li key={link.href} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn("flex items-baseline justify-between py-5 transition-[opacity,translate] duration-500 ease-expo", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
                    style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                  >
                    <span className="type-heading text-3xl">{link.label}</span>
                    <span className="type-label tabular text-signal-hi">{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-4 pt-10">
            <Button href={site.primaryCta.href} size="lg" className="w-full" onClick={() => setOpen(false)}>
              {site.primaryCta.label}
            </Button>
            <p className="type-label text-center text-dim">We work where we believe we can win.</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
