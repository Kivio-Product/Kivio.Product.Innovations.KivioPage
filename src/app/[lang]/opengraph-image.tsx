import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KIVIO SAS — Transformamos ideas en Software";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const raw = dict.meta.description;
  const description =
    raw.length > 150 ? `${raw.slice(0, 150).replace(/\s+\S*$/, "")}…` : raw;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#050505",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* brand shapes: soft solid ellipses, mostly off-canvas (clean in satori) */}
        <div
          style={{
            position: "absolute",
            bottom: "-430px",
            right: "-320px",
            width: "1250px",
            height: "820px",
            borderRadius: "999px",
            backgroundColor: "#f66e4c",
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-300px",
            right: "140px",
            width: "760px",
            height: "560px",
            borderRadius: "999px",
            backgroundColor: "#ff5722",
            opacity: 0.09,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-360px",
            left: "-280px",
            width: "900px",
            height: "640px",
            borderRadius: "999px",
            backgroundColor: "#ff9a76",
            opacity: 0.07,
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#f66e4c",
            }}
          />
          <div style={{ color: "#ffffff", fontSize: "30px", letterSpacing: "10px", fontWeight: 700 }}>
            KIVIO
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: "42px",
            color: "#ffffff",
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.08,
            maxWidth: "980px",
          }}
        >
          {dict.home.heroTitle}
        </div>

        {/* description */}
        <div
          style={{
            marginTop: "28px",
            color: "#c9c9c9",
            fontSize: "27px",
            lineHeight: 1.45,
            maxWidth: "900px",
          }}
        >
          {description}
        </div>

        {/* footer row */}
        <div
          style={{
            marginTop: "46px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#8f8f8f",
            fontSize: "22px",
          }}
        >
          <span>kivio.com.co</span>
          <span style={{ color: "#f66e4c" }}>·</span>
          <span>{dict.home.heroKicker}</span>
        </div>

        {/* accent ribbon */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "linear-gradient(90deg, #f66e4c, #ff5722, #ff9a76)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
