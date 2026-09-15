import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "dark",
  locale: "es-CO",
});
const page = await ctx.newPage();
await page.goto(base + "/es", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

// catch the rotating word mid-roll (rotation happens every ~3s)
await page.waitForTimeout(2850);
for (let i = 0; i < 4; i++) {
  await page.locator("h1").screenshot({ path: `shots/rotor_${i}.png` });
  await page.waitForTimeout(140);
}

// scroll-text states at different scroll positions (airlines paragraphs)
for (const frac of [0.14, 0.2, 0.26]) {
  await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), frac);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `shots/scrolltext_${Math.round(frac * 100)}.png` });
}

await browser.close();
console.log("ok");
