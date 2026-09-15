import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("shots", { recursive: true });
const browser = await chromium.launch();

for (const scheme of ["dark", "light"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme, locale: "es-CO" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/es", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  const img = page.locator('img[src*="hero-workspace"]').first();
  const box = await img.boundingBox();
  await page.screenshot({
    path: `shots/hero-visual-${scheme}.png`,
    clip: {
      x: Math.max(0, box.x - 130),
      y: Math.max(0, box.y - 80),
      width: Math.min(box.width + 260, 1440),
      height: box.height + 160,
    },
  });
  await ctx.close();
}

const ctxM = await browser.newContext({ viewport: { width: 375, height: 812 }, colorScheme: "dark", locale: "es-CO" });
const pageM = await ctxM.newPage();
await pageM.goto("http://localhost:3000/es", { waitUntil: "networkidle" });
await pageM.waitForTimeout(1200);
await pageM.evaluate(() => window.scrollTo(0, 560));
await pageM.waitForTimeout(600);
await pageM.screenshot({ path: "shots/hero-visual-375.png" });
await browser.close();
console.log("ok");
