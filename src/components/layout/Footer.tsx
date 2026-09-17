import type { ReactNode } from "react";
import { footerPages, footerResources, site, socialNetworks } from "@/content/site";
import { DotWordmark } from "@/components/scenes/DotWordmark";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";

const socialIcons: Record<(typeof socialNetworks)[number], ReactNode> = {
  LinkedIn: <path d="M6.5 10v8M6.5 6.3v.1M10.5 18v-8M10.5 13.4c0-2.2 1.3-3.6 3.1-3.6s2.9 1.2 2.9 3.6V18" />,
  "X (Twitter)": <path d="m5 5 14 14M19 5 5 19" />,
  Instagram: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M16.6 7.4v.1" />
    </>
  ),
};

type LinkItem = { label: string; href: string };

export function Footer() {
  return (
    <footer className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="grid content-start gap-7 lg:col-span-5">
            <div className="grid gap-3">
              <Logo />
              <p className="max-w-xs text-sm leading-relaxed text-mute">AI-augmented operating team. Real business impact.</p>
            </div>
            {/* The original site lists these networks without published URLs, so they are shown, not linked. */}
            <ul className="flex items-center gap-2" aria-label="Social networks">
              {socialNetworks.map((name) => (
                <li key={name} title={`${name}: profile link coming soon`} className="grid size-9 place-items-center rounded-full border border-line-strong text-mute">
                  <svg role="img" aria-label={name} viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {socialIcons[name]}
                  </svg>
                </li>
              ))}
            </ul>
            <Newsletter />
          </div>

          {/* Desktop columns */}
          <div className="hidden grid-cols-3 gap-8 md:grid lg:col-span-6 lg:col-start-7">
            <LinkColumn title="Pages" links={footerPages} />
            <LinkColumn title="Resources" links={footerResources} />
            <div>
              <h2 className="type-label text-dim">Social</h2>
              <ul className="mt-4 grid gap-1">
                {socialNetworks.map((name) => (
                  <li key={name} className="py-1.5 text-sm text-mute">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="border-t border-line md:hidden">
            <FooterAccordion title="Pages">
              <LinkList links={footerPages} />
            </FooterAccordion>
            <FooterAccordion title="Resources">
              <LinkList links={footerResources} />
            </FooterAccordion>
            <FooterAccordion title="Social">
              <ul className="grid gap-1 pb-4">
                {socialNetworks.map((name) => (
                  <li key={name} className="py-2 text-sm text-mute">
                    {name}
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>
        </div>

        <DotWordmark className="block aspect-[5.2/1] w-full sm:aspect-[6.4/1]" />

        <div className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label text-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="type-label text-dim">We work where we believe we can win.</p>
        </div>
      </Container>
    </footer>
  );
}

function LinkColumn({ title, links }: { title: string; links: readonly LinkItem[] }) {
  return (
    <nav aria-label={`Footer ${title.toLowerCase()}`}>
      <h2 className="type-label text-dim">{title}</h2>
      <div className="mt-4">
        <LinkList links={links} />
      </div>
    </nav>
  );
}

function LinkList({ links }: { links: readonly LinkItem[] }) {
  return (
    <ul className="grid gap-1 pb-4 md:pb-0">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="group inline-flex min-h-10 items-center text-sm text-bone/85 transition-colors hover:text-signal-hi md:min-h-0 md:py-1.5">
            <span aria-hidden="true" className="h-px w-0 bg-signal-hi transition-[width,margin] duration-300 group-hover:mr-2 group-hover:w-3" />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group/fa border-b border-line">
      <summary className="flex min-h-12 cursor-pointer items-center justify-between text-sm text-bone">
        {title}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 text-mute transition-transform duration-300 group-open/fa:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </summary>
      {children}
    </details>
  );
}
