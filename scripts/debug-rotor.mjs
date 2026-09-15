import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "es-CO" }).then((c) => c.newPage());
await page.goto("http://localhost:3000/es", { waitUntil: "networkidle" });

const snap = async (label) => {
  const info = await page.evaluate(() => {
    const win = document.querySelector("h1 span.block span.inline-block");
    const col = win?.querySelector("span.block");
    const rows = col ? Array.from(col.children) : [];
    const r = (el) => {
      const b = el.getBoundingClientRect();
      return { top: Math.round(b.top), h: Math.round(b.height) };
    };
    return {
      window: r(win),
      transform: getComputedStyle(col).transform,
      inlineStyle: col.getAttribute("style"),
      rows: rows.map((x) => ({ t: x.textContent, ...r(x) })),
    };
  });
  console.log(label, JSON.stringify(info));
};

await page.waitForTimeout(300);
await snap("t=0.3s");
await page.waitForTimeout(2900);
await snap("t=3.2s (post-rotacion)");
await page.locator("h1 span.block span.inline-block").screenshot({ path: "shots/debug_window.png", animations: "allow" });
await page.waitForTimeout(1500);
await snap("t=4.7s");
await browser.close();
