import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

// Default share thumbnail (KakaoTalk, SMS, Facebook). Product pages with photos override it.
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex versions of the --background, --primary and --cta tokens in globals.css.
const BACKGROUND = "#f9f6f1";
const PRIMARY = "#1e2a4a";
const CTA = "#c4602f";

const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
          padding: 96,
          background: BACKGROUND,
          color: PRIMARY,
        }}
      >
        <img src={logoSrc} alt="" width={618} height={168} />
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>
          Used washers, fridges & dryers
        </div>
        <div style={{ display: "flex", fontSize: 36, color: CTA }}>
          Tested, cleaned & ready · {siteConfig.serviceArea}
        </div>
      </div>
    ),
    size,
  );
}
