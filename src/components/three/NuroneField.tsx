"use client";

import { useRef } from "react";
import { sections } from "@/content/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { threeCanvasClass, useThree } from "@/lib/useThree";
import { cn } from "@/lib/cn";

/*
 * The NURONE field: one persistent system of signal points that stays with the visitor
 * for the whole page and reorganises itself as each chapter's idea arrives.
 *
 *   01 Ambition     → a whole sphere (the core)
 *   02 The System   → the sphere fractures
 *   03 Difference   → a coordinated lattice (systems over services)
 *   04 Engine       → three stacked layers
 *   05 Labs         → five clusters on one ring
 *   06 Method       → a pipeline
 *   07 Proof        → rising columns
 *   08 Stack        → an infrastructure surface
 *   09 Decision     → a dome over the horizon
 *
 * Positions morph on the CPU only while a transition runs (per-point stagger), then the
 * buffer stays untouched. Rendering pauses in hidden tabs; reduced motion jumps to each
 * shape without animating.
 */

type Shape = (n: number, rand: () => number) => Float32Array;

const TAU = Math.PI * 2;

const sphere: Shape = (n) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    a.set([2.05 * Math.sin(phi) * Math.cos(theta), 2.05 * Math.cos(phi), 2.05 * Math.sin(phi) * Math.sin(theta)], i * 3);
  }
  return a;
};

const fracture: Shape = (n, rand) => {
  const base = sphere(n, rand);
  for (let i = 0; i < n; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    // Shards: points in the same angular cell travel together.
    const cell = Math.floor((Math.atan2(z, x) + Math.PI) / (TAU / 9)) + Math.floor((y + 2.1) / 0.9) * 9;
    const push = 0.25 + ((Math.sin(cell * 12.9898) * 43758.5453) % 1 + 1) % 1 * 1.35;
    const d = 1 + push / 2.05;
    base.set([x * d, y * d - push * 0.35, z * d], i * 3);
  }
  return base;
};

const lattice: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  const s = Math.max(4, Math.round(Math.cbrt(n / 1.6)));
  for (let i = 0; i < n; i++) {
    // Points sit on the edges of a regular grid: a coordinated structure, not a cloud.
    const gx = Math.floor(rand() * s);
    const gy = Math.floor(rand() * s);
    const gz = Math.floor(rand() * s);
    const t = rand();
    const axis = Math.floor(rand() * 3);
    const p = [gx, gy, gz];
    p[axis] += t;
    a.set([(p[0] / (s - 1) - 0.5) * 4.2, (p[1] / (s - 1) - 0.5) * 3.0, (p[2] / (s - 1) - 0.5) * 3.0], i * 3);
  }
  return a;
};

const layers: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const layer = i % 3;
    const x = (rand() - 0.5) * 4.4;
    const z = (rand() - 0.5) * 3.2;
    // Denser grid lines on each plane.
    const snap = rand() < 0.55;
    a.set([snap ? Math.round(x * 2.2) / 2.2 : x, (layer - 1) * 1.25, snap ? z : Math.round(z * 2.2) / 2.2], i * 3);
  }
  return a;
};

const five: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    if (i % 7 === 0) {
      const ang = rand() * TAU;
      a.set([Math.cos(ang) * 2.1, Math.sin(ang) * 2.1, (rand() - 0.5) * 0.08], i * 3);
      continue;
    }
    const k = i % 5;
    const ang = -Math.PI / 2 + (k / 5) * TAU;
    const u = rand() * TAU;
    const v = Math.acos(2 * rand() - 1);
    const r = 0.5 * Math.cbrt(rand());
    a.set([Math.cos(ang) * 2.1 + r * Math.sin(v) * Math.cos(u), Math.sin(ang) * 2.1 + r * Math.cos(v), r * Math.sin(v) * Math.sin(u)], i * 3);
  }
  return a;
};

const pipeline: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = rand();
    const x = (t - 0.5) * 7.2;
    const stage = Math.round(t * 4) / 4;
    const nearStage = Math.abs(t - stage) < 0.035;
    const radius = nearStage ? 0.55 : 0.18;
    const ang = rand() * TAU;
    a.set([x, Math.sin(t * TAU) * 0.35 + Math.cos(ang) * radius * rand(), Math.sin(ang) * radius * rand()], i * 3);
  }
  return a;
};

const growth: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  const cols = 7;
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const h = 0.6 + (c / (cols - 1)) * 3.4;
    a.set([(c - (cols - 1) / 2) * 0.72 + (rand() - 0.5) * 0.36, -1.9 + rand() * h, (rand() - 0.5) * 0.36], i * 3);
  }
  return a;
};

const surface: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const x = (rand() - 0.5) * 7;
    const z = (rand() - 0.5) * 4;
    a.set([x, Math.sin(x * 0.9 + z * 0.6) * 0.45 + Math.cos(z * 1.3) * 0.25 - 0.4, z], i * 3);
  }
  return a;
};

const dome: Shape = (n, rand) => {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = rand() * TAU;
    const phi = Math.acos(rand() * 0.85 + 0.15);
    a.set([3.4 * Math.sin(phi) * Math.cos(theta), 3.4 * Math.cos(phi) - 3.1, 3.4 * Math.sin(phi) * Math.sin(theta)], i * 3);
  }
  return a;
};

const shapes = [sphere, fracture, lattice, layers, five, pipeline, growth, surface, dome];

/** Where the field sits for each chapter (desktop): x as a fraction of view width, and how present it is. */
const staging = [
  { x: 0.25, y: -0.02, scale: 1.05, opacity: 0.85, tilt: 0.25 },
  { x: 0.24, y: -0.04, scale: 1.25, opacity: 0.9, tilt: 0.25 },
  { x: 0.25, y: 0, scale: 1, opacity: 0.5, tilt: 0.45 },
  { x: 0.3, y: 0.02, scale: 1, opacity: 0.32, tilt: 0.55 },
  { x: -0.27, y: -0.06, scale: 0.9, opacity: 0.6, tilt: 0.05 },
  { x: 0.04, y: -0.34, scale: 0.95, opacity: 0.55, tilt: 0.2 },
  { x: 0.26, y: 0, scale: 0.95, opacity: 0.6, tilt: 0.15 },
  { x: 0.2, y: -0.22, scale: 1.1, opacity: 0.55, tilt: 0.35 },
  { x: 0, y: -0.05, scale: 1.3, opacity: 1, tilt: 0.1 },
];

export function NuroneField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useThree(ref, (THREE, canvas, { reduced, mobile }) => {
    const n = mobile ? 2600 : 5200;
    let seed = 11;
    const rand = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 0xffffffff);
    const targets = shapes.map((s) => s(n, rand));
    const delays = new Float32Array(n).map(() => rand());

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 8.5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const positions = new Float32Array(targets[0]);
    const from = new Float32Array(positions);
    const glow = new Float32Array(n).map(() => (rand() < 0.08 ? 1 : 0.25 + rand() * 0.5));
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(positions, 3);
    position.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", position);
    geometry.setAttribute("aGlow", new THREE.BufferAttribute(glow, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uOpacity: { value: 0 }, uPixel: { value: renderer.getPixelRatio() }, uTime: { value: 0 } },
      vertexShader: `
        attribute float aGlow;
        uniform float uPixel;
        uniform float uTime;
        varying float vGlow;
        void main() {
          vGlow = aGlow;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float twinkle = aGlow > 0.9 ? 0.75 + 0.25 * sin(uTime * 1.6 + position.x * 7.0) : 1.0;
          gl_PointSize = (aGlow > 0.9 ? 4.6 : 2.7) * twinkle * uPixel * (8.5 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform float uOpacity;
        varying float vGlow;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.05, d);
          vec3 col = mix(vec3(0.23, 0.55, 1.0), vec3(0.87, 0.95, 1.0), vGlow > 0.9 ? 0.85 : vGlow * 0.4);
          gl_FragColor = vec4(col, a * uOpacity * (0.5 + 0.5 * vGlow));
        }`,
    });

    const group = new THREE.Group();
    group.add(new THREE.Points(geometry, material));
    scene.add(group);

    let width = 1;
    let chapter = -1;
    let morph = 1;
    const morphState = { k: 1 };
    const stage = { x: 0, y: 0, scale: 1, opacity: 0, tilt: 0.25 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const viewWidth = () => 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
    const viewHeight = () => 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;

    const applyMorph = () => {
      const to = targets[chapter];
      for (let i = 0; i < n; i++) {
        // Each point leaves on its own beat, so the shape dissolves and re-forms rather than sliding.
        const local = Math.min(1, Math.max(0, morph * 1.45 - delays[i] * 0.45));
        const e = local < 0.5 ? 4 * local ** 3 : 1 - (-2 * local + 2) ** 3 / 2;
        const j = i * 3;
        positions[j] = from[j] + (to[j] - from[j]) * e;
        positions[j + 1] = from[j + 1] + (to[j + 1] - from[j + 1]) * e;
        positions[j + 2] = from[j + 2] + (to[j + 2] - from[j + 2]) * e;
      }
      position.needsUpdate = true;
    };

    const goTo = (index: number) => {
      if (index === chapter || index < 0) return;
      from.set(positions);
      chapter = index;
      const s = staging[index];
      const target = { x: mobile ? 0 : s.x, y: mobile ? s.y - 0.12 : s.y, scale: mobile ? s.scale * 0.72 : s.scale, opacity: mobile ? s.opacity * 0.55 : s.opacity, tilt: s.tilt };
      if (reduced) {
        morph = 1;
        applyMorph();
        Object.assign(stage, target);
        material.uniforms.uOpacity.value = target.opacity;
        requestAnimationFrame(() => draw(0, 0));
        return;
      }
      gsap.killTweensOf(morphState);
      morphState.k = 0;
      gsap.to(morphState, {
        k: 1,
        duration: 2.1,
        ease: "none",
        onUpdate: () => {
          morph = morphState.k;
          applyMorph();
        },
      });
      gsap.to(stage, { ...target, duration: 1.8, ease: "expo.inOut", overwrite: true });
    };

    // Which chapter is on screen: the section crossing the middle of the viewport.
    // The FAQ keeps the stack's quiet surface; the dome is saved for the final decision.
    const chapterOf = new Map<string, number>(sections.map((s) => [s.id, s.id === "faq" ? 7 : Number(s.index) - 1]));
    const triggers = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
      .map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && goTo(chapterOf.get(el.id) ?? 0),
        }),
      );
    goTo(0);
    ScrollTrigger.refresh();

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let spin = 0;
    function draw(time: number, dt: number) {
      const step = dt / 16.67;
      spin += 0.0011 * step;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      group.position.set(stage.x * viewWidth(), stage.y * viewHeight(), 0);
      group.scale.setScalar(stage.scale * Math.min(1.15, Math.max(0.7, width / 1440 + 0.25)));
      group.rotation.set(stage.tilt + pointer.y * 0.18, spin + pointer.x * 0.3, 0);
      if (!reduced) material.uniforms.uOpacity.value += (stage.opacity - material.uniforms.uOpacity.value) * 0.05;
      material.uniforms.uTime.value = time / 1000;
      renderer.render(scene, camera);
    }
    return {
      resize(w, h) {
        width = w;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      },
      render: draw,
      dispose() {
        triggers.forEach((t) => t.kill());
        gsap.killTweensOf(morphState);
        gsap.killTweensOf(stage);
        window.removeEventListener("pointermove", onPointer);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      },
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={cn(threeCanvasClass, "pointer-events-none fixed inset-0 z-0 size-full", className)} />;
}
