import Link from "next/link";
import { site } from "@/content/site";
import { MountainScene } from "@/components/scenes/MountainScene";
import { ArrowGlyph } from "@/components/ui/Button";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export const metadata = { title: `Page not found | ${site.name}` };

/** Branded 404: a signal that lost its route, with clear ways back into the system. */
export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <MountainScene className="absolute inset-0 -z-10 opacity-70" beam={0.5} id="nf-scene" />
      <Container className="flex w-full flex-1 flex-col py-8">
        <Link href="/" aria-label="NURONE home" className="self-start">
          <Logo />
        </Link>
        <div className="my-auto max-w-2xl py-20">
          <ChapterMark index="404" name="Signal lost" />
          <h1 className="type-display mt-8 text-[clamp(3rem,1.5rem+6vw,7rem)] leading-[0.95]">
            This route isn&apos;t <span className="text-signal-hi">part of the system.</span>
          </h1>
          <p className="mt-6 max-w-md text-mute">The page you asked for doesn&apos;t exist or has moved. Everything NURONE does starts from the homepage.</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["Back to home", "/"],
              ["Explore the Labs", "/#labs"],
              ["Request access", "/#request-access"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="group inline-flex items-center gap-2 py-2 text-bone transition-colors hover:text-signal-hi">
                {label}
                <ArrowGlyph className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
