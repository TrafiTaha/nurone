import { ImageResponse } from "next/og";

export const alt = "NURONE | You bring the ambition. We build the system to scale it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f6f5f1",
          color: "#0e1116",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#0e1116", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff5a1f" }} />
          </div>
          NURONE
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>You bring the ambition.</span>
          <span style={{ color: "#555b65" }}>We build the system to scale it.</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 26, color: "#555b65" }}>
          <span style={{ color: "#b3390a" }}>72h prototype sprint</span>
          <span>100% tracked execution</span>
          <span>Code you own</span>
        </div>
      </div>
    ),
    size,
  );
}
