import { ImageResponse } from "next/og";
import { profile } from "./data";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 26,
            color: "#9a9a9a",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#f2c230",
            }}
          />
          <span>{profile.city}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#d4d4d4",
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #262626",
            paddingTop: "28px",
            fontSize: 24,
            color: "#9a9a9a",
          }}
        >
          <span>{profile.availability}</span>
          <span
            style={{
              color: "#f2c230",
              fontWeight: 600,
            }}
          >
            Portfolio
          </span>
        </div>
      </div>
    ),
    size
  );
}
