# NURONE — Homepage Evolution

An evolution of the [dev.nurone.io](https://dev.nurone.io) homepage, built as a production-quality Next.js app.

**Idea:** NURONE is not another agency. It's an execution system, so the page doesn't list services. You scroll through the system: the ambition, where it breaks, the philosophy, the engine, the Labs, the method, the proof, the stack and the decision.

- **Content source of truth:** the live site (home, `/the-system`, `/labs/foundation`). All copy, figures, Labs, case studies, testimonials, process steps, technologies and FAQs come from it.
- **Identity:** navy foundation, electric-blue signal, the orbital core, the isometric layer architecture and the mountain horizon from the NURONE concept board are all kept. This is the same NURONE, built with more craft.

## Technologies

| | |
|---|---|
| Framework | Next.js 16 (App Router, fully static prerender) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 (`@theme` design tokens, container queries) |
| Fonts | Geist + Geist Mono via `next/font` (self-hosted, no layout shift) |
| Motion | **GSAP + ScrollTrigger** for pinned scenes, scroll progress and scrubbed exits. CSS for everything scroll progress can drive (`--p`, `--fp`, `--t` custom properties), plus CSS keyframes and SVG `animateMotion` for ambient motion. |
| 3D / WebGL | **Three.js** for five selective scenes (orbital sphere, horizon glow, node topology, silk lines, structure dome), code-split and loaded only near the viewport |
| Imagery | Hand-built SVG scenes, coded product fragments, canvas effects. No stock photography. |

```bash
npm install
npm run dev      # http://localhost:3000  (or: npm run dev -- -p 4321)
npm run build && npm start
npm run lint
```

## The journey: nine chapters

Every section carries the same grammar, `05 ── NURONE / THE LABS`, and the header shows which chapter you're in once you leave the hero. Intensity builds on purpose: a calm hero, then editorial statements, then interactive systems and proof, and a quiet, resolved ending.

| # | Chapter | What happens as you scroll |
|---|---|---|
| 01 | **Ambition** (hero) | "You bring the ambition. We build the system to scale it." next to the interactive NURONE core. As you scroll away, the copy lifts and the core recedes (GSAP scrub), handing off to the manifesto. |
| 02 | **The System** (pinned) | The manifesto in four fragments. *Ambition rarely dies in the idea* lights word by word, then *It breaks in the system behind it.*, then the three fractures one at a time, then *It rewards what your system can carry.* The horizon beam brightens as the argument resolves. |
| 03 | **The Difference** (pinned) | Systems > Services, Leverage > Headcount, Foundations > Firefighting, Outcomes > Activity. The lesser word is struck through while a drawing moves from the old model to NURONE's: scattered tasks join a system, a crowd of seats becomes operators plus AI, fires settle into foundation layers, noisy activity straightens into one forward line. |
| 04 | **The Engine** (pinned on desktop) | Technical Backbone → Agentic Operations → Growth Infrastructure light up layer by layer on the isometric architecture, then all three light together as *one connected execution system*. |
| 05 | **The Labs** (pinned on desktop) | Foundation, Scale, Operations, Talent and Growth take the stage one at a time. Each shows its stage, its transformation (e.g. Idea → Prototype → Architecture → Product → Foundation), what it builds and its entry point. A map connects each Lab to the NURONE core as you go and closes the ring at the end. |
| 06 | **The Method** (pinned on desktop) | The five real steps as one unfolding situation: diagnosed (scan and verdicts), routed to a Lab, built in the open (weekly log), owned (code, assets, systems, progress are *yours*), then resolved (continue, grow, scale or leave with everything). |
| 07 | **Proof** (pinned) | 72h, 100% and €10M+ each take the whole stage, drawn as what they measure. Then, on desktop, every case study plays as a story: challenge → build → outcome while its product view assembles and the real figures land, before the next case enters. Testimonials follow. |
| 08 | **The Stack** | Frontend & Product, Backend & Data and AI & Agents with the exact tools from `/the-system`, on a spine that draws as you scroll and resolves into the execution system. |
| 09 | **The Decision** | The 12 real FAQs, then "Bring the ambition. We'll build the system behind it." with the request-access dialog. |

## Motion system

- **`ScrollScene`** (`components/motion`) is the one primitive behind every pinned chapter. The section is `frames × length` tall, and its stage is `position: sticky` (CSS, so no pin-spacer reflow). A single ScrollTrigger per scene maps progress to:
  - `--p` on the section (whole-scene progress, used for rails and the manifesto beam)
  - `data-state="past|current|future"` and `--fp` on each `[data-frame]`
  - a React context (`step`, `pinned`, `goTo`) for the few components that need state (layer architecture, Labs map, indexes)
- Transformations are plain CSS reading those variables (`--t` is an eased version of `--fp`), so scrubbing costs no React renders and no per-frame JS beyond ScrollTrigger's own update.
- **`ScrollDrift`** handles scrubbed exits, and **`SceneIndex` / `SceneCounter` / `ProgressRail`** handle navigation and progress inside scenes.
- Every GSAP setup runs inside `gsap.matchMedia()`, which reverts triggers and tweens on unmount or when the media conditions change.
- **Pinning rules:** a scene pins only when motion is allowed and the viewport is at least 600px tall. Short editorial scenes (manifesto, principles, figures) also pin on phones. Dense scenes (engine, Labs, method, cases) pin from 1024px up. Otherwise frames flow as a normal document with every state fully resolved.

### Deliberate choices

- **Selective Three.js.** 3D is used only as atmosphere behind key moments, never for content: an orbital point sphere behind the hero core, a horizon glow in the manifesto that brightens with scene progress (`--p`), a pulsing node topology behind Testimonials, flowing silk lines under The Stack and a structure dome rising over the final CTA. All five go through one `useThree` hook (`src/lib/useThree.ts`): Three.js is a separate chunk fetched only when a scene is within 600px of the viewport, after the browser is idle. It renders only while on screen and the tab is visible, caps DPR at 1.5, lowers point counts on phones, draws a single still frame under reduced motion, falls back silently without WebGL and disposes geometry, materials and renderer on unmount.
- **No Lenis.** Native scrolling keeps keyboard, find-in-page, anchor links and assistive tech behaving normally, and sticky stages with ScrollTrigger stay smooth without scroll hijacking.

## Accessibility & performance

- One `h1` and a labelled `h2` per chapter, landmarks, a skip link, no duplicate ids, named controls (checked automatically).
- **Pinned content stays reachable.** Frames that aren't on stage stay in the DOM and the tab order. Focusing something in another frame scrolls the scene to that frame, and every scene has index buttons that jump to a frame.
- **Reduced motion** switches off pinning entirely. Each chapter becomes a normal, fully visible layout (verified: no low-opacity text).
- Keyboard support for capability nodes, layers, Labs map, scene indexes, carousels (arrow keys), accordions, the focus-trapped mobile menu and the native modal dialog.
- Contrast: primary text 17:1, secondary 7.6:1, accent 10:1. Mobile has no text under 11px.
- Local production measurement at 1440px: **LCP ≈ 0.3s, CLS 0, ~444 KB total transfer over 12 requests** (GSAP + ScrollTrigger ≈ 45 KB; the Three.js chunk loads lazily after first paint), with zero console errors.
- Automated checks: headless Edge at 1440×900, 1280×720, 1024×768 and 390×844 (no horizontal overflow), plus interaction tests for scene frames, index jumps, focus-into-frame, case selection, carousels, forms and the dialog.

## Architecture

```
src/
  app/            layout (fonts, metadata, skip link) · page (chapter order) · globals.css (tokens, scene CSS, motion utilities)
  content/        typed copy: site, system, philosophy (principles + stack), labs, cases, process, faq
  components/
    motion/       ScrollScene (+ ProgressRail, useScene), SceneCounter/SceneIndex, ScrollDrift, BlurWords
    three/        OrbitalSphere, HorizonGlow, NexusTopology, SilkLines, StructureDome (all via lib/useThree)
    sections/     Hero, Manifesto, Principles, SystemSection, Labs, Process, Impact, CaseStudies, Testimonials, Stack, Faq, FinalCta
    philosophy/   PrincipleVisual (four scrubbed transformations)
    labs/         LabsMap
    process/      MethodVisual, StepIcon
    cases/        CaseScene (desktop stories), CaseCarousel + CaseCard (touch / reduced motion)
    system/       OrbitalSystem + geometry, LayerArchitecture (free or scene-driven)
    scenes/       MountainScene, Constellation, WarpStreaks, StreamWaves, ConvergenceFlow
    fragments/    illustrative product UI per case study
    ui/           Button, ChapterMark + LitWords, Eyebrow, DecodeText, FitScale, …
    layout/       Header (chapter readout, active section, mobile menu), Footer, Newsletter
    request/      RequestDialog, RequestForm
  lib/            gsap (plugin registration + pin queries), motion helpers, hooks, cn
```

## Effects adapted from ThreeUI Community

Some effects come from the MIT-licensed [ThreeUI Community](https://github.com/MengTo/threeui) library. Its components ship as iframe documents that pull Tailwind CDN, GSAP, Three.js and Iconify at runtime, so none are embedded. Each one was rewritten natively in NURONE's palette, runs on the shared `useCanvasLoop` (DPR ≤ 2, paused off screen and in hidden tabs, still under reduced motion), and was only used where it doesn't compete with the pinned scenes:

| Effect | Where | Adapted from |
|---|---|---|
| 3D orbital point sphere with orbits and nodes | Behind the hero core | Orbital Sphere (Three.js) |
| Horizon glow shader driven by scene progress | Manifesto | Emerald Horizon (Three.js) |
| Data pixel arc | Under the Proof figures | Data Pixel Arc |
| Pulsing node topology | Behind Testimonials | Nexus Topology (Three.js) |
| Flowing silk lines | Under The Stack | Vertex 9 (Three.js) |
| Structure dome of signal points | Over the final CTA horizon | Structure Flow (Three.js) |
| Particle wordmark: NURONE drawn in signal dots, with slow bands of light | Footer (the page ends on the system itself) | Epilude Footer |
| Data-point field where two slow waves surface | Behind The Difference | Signal Particles |
| Word-by-word blur reveal | Intro lines in The Stack, Testimonials, FAQ, final CTA (non-pinned sections only) | Logic Core |
| Border beam, drifting dots, rising glow | Final **Get in touch** CTA | Gradient Beam CTA |
| Comet tracing the button while a request is sent | Request-access submit | Thinking Button |
| Warp streaks, spinning border beam, decode-in labels, border sheen | Hero core, outline buttons, labels, cards | Particle Network, Spinning Border Button, Article Headings, Gateway Flow card |

Not used on purpose: the neon, glassmorphism, plasma, fluid and landscape pieces don't fit NURONE's restrained identity. Attribution and license text are in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md). GSAP is used under its standard no-charge license.

## Assumptions & honesty notes

- **No invented content.** Principles, the stack, the Talent Model wording and the "software without growth…" line come from `/the-system`. Foundation copy comes from `/labs/foundation`. Figures are only the live ones (72h, 100%, €10M+, 80%, 48h, 300+).
- **Labs:** the live site has a page only for *Foundation Lab*. *Scale*, *Operations* and the *Growth Layer* are named in its FAQ ("Where should we start?"), and talent appears as the *talent layer* (FAQ) and *Talent Model*. Their Lab copy is assembled from those passages. The Talent stage line ("I need senior execution capacity") paraphrases the FAQ on plugging into an existing team.
- **Transformation chips** in the Labs and the principle drawings visualise the live copy (e.g. "fragmented work → systemized") and don't make new claims.
- **Case visuals** are coded, illustrative product views with sample data (labelled as such), not client screenshots.
- **Navigation** mirrors the live site (Home, The System, Labs, How It Works) plus Case Studies, as in-page anchors. *The System*, *Foundation Lab* and *Blog* in the footer link to the live pages.
- **Forms** (request access, newsletter) are front-end only: validation plus confirmation. Their submit handlers are the single place to connect a CRM or API route.
