import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
mkdirSync("shots", { recursive: true });

const routes = [
  "/es/servicios",
  "/es/sobre-nosotros",
  "/es/carreras",
  "/es/soporte-a-aerolineas",
  "/es/productos/kivio-cms",
  "/es/portafolio/nutrir",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "dark",
  locale: "es-CO",
});
const page = await ctx.newPage();

for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.85;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight + window.innerHeight) setTimeout(step, 80);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(300);
  for (const frac of [0.25, 0.55]) {
    await page.evaluate((f) => {
      window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f);
    }, frac);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `shots/darkcheck_${route.replaceAll("/", "-")}_${Math.round(frac * 100)}.png`,
    });
  }
}

await browser.close();
console.log("ok");
