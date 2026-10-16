import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { ai } = getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "58px 72px", background: "#080808",
          color: "#ffffff", fontFamily: "sans-serif", position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -200, top: -300, width: 750, height: 950, borderRadius: 400, background: "#f66e4c", opacity: 0.1 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 14, height: 14, background: "#f66e4c", borderRadius: 14 }} />
            <span style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>KIVIO</span>
          </div>
          <span style={{ color: "#ff9a76", fontSize: 20 }}>{lang === "en" ? "AI & AUTOMATION" : "IA Y AUTOMATIZACIÓN"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#ff9a76", fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>{ai.kicker}</div>
          <div style={{ marginTop: 20, fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{ai.seoTitle}</div>
          <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.4, color: "#cccccc", maxWidth: 1000 }}>{ai.seoDescription}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#aaaaaa", fontSize: 20 }}>
          <span>kivio.com.co</span>
          <span>{lang === "en" ? "Process assessment · Team training" : "Diagnóstico de procesos · Formación de equipos"}</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, background: "linear-gradient(90deg, #f66e4c, #ff5722, #ff9a76)" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
