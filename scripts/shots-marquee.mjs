import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("shots", { recursive: true });
const browser = await chromium.launch();

for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 700 }, colorScheme: scheme, locale: "es-CO" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/es", { waitUntil: "networkidle" });
  const el = page.locator(".marquee-mask").first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  for (const t of [0, 18, 36]) {
    if (t > 0) await page.waitForTimeout(18000 - 700);
    const box = await el.boundingBox();
    await page.screenshot({
      path: `shots/marquee-${scheme}-t${t}.png`,
      clip: { x: 0, y: Math.max(0, box.y - 30), width: 1920, height: Math.min(box.height + 60, 260) },
    });
  }
  await ctx.close();
}

await browser.close();
console.log("ok");
