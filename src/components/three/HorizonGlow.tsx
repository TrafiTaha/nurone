"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { threeCanvasClass, useThree } from "@/lib/useThree";

/**
 * A living band of light along the horizon whose strength follows the enclosing
 * scroll scene (--p): the horizon brightens as the manifesto resolves.
 * Adapted from ThreeUI Community "Emerald Horizon" shader (MIT, © 2026 Meng To),
 * recoloured to NURONE's blue and composited with `screen` so black is transparent.
 */
export function HorizonGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useThree(ref, (THREE, canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(1);
    const scope = canvas.closest<HTMLElement>(".scene");

    const uniforms = { uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uLevel: { value: 1 } };
    const material = new THREE.ShaderMaterial({
      uniforms,
      depthTest: false,
      depthWrite: false,
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uRes;
        uniform float uLevel;
        float hash(float n) { return fract(sin(n) * 1e4); }
        float noise(float x) { float i = floor(x); float f = fract(x); float u = f * f * (3.0 - 2.0 * f); return mix(hash(i), hash(i + 1.0), u); }
        void main() {
          vec2 st = gl_FragCoord.xy / uRes;
          float wave = sin(st.x * 3.0 + uTime * 0.5) * 0.1 + sin(st.x * 5.0 - uTime * 0.3) * 0.05;
          float intensity = smoothstep(0.42, -0.1, st.y + wave);
          intensity *= (noise(st.x * 2.0 + uTime * 0.1) * 0.5 + 0.5) * 1.5;
          vec3 a = vec3(0.07, 0.3, 0.85);
          vec3 b = vec3(0.3, 0.75, 1.0);
          vec3 glow = mix(a, b, clamp(st.x + sin(uTime * 0.2) * 0.5, 0.0, 1.0));
          vec3 color = glow * pow(intensity, 1.5) * (0.35 + 0.75 * uLevel);
          color *= smoothstep(1.2, 0.4, length(st - vec2(0.62, 0.0)));
          gl_FragColor = vec4(color, 1.0);
        }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    return {
      resize(w, h) {
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w, h);
      },
      render(time) {
        uniforms.uTime.value = time / 1000;
        const p = Number.parseFloat(scope?.style.getPropertyValue("--p") || "1");
        uniforms.uLevel.value += ((Number.isFinite(p) ? p : 1) - uniforms.uLevel.value) * 0.08;
        renderer.render(scene, camera);
      },
      dispose() {
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      },
    };
  });

  return <canvas ref={ref} aria-hidden="true" className={cn(threeCanvasClass, "mix-blend-screen", className)} />;
}
