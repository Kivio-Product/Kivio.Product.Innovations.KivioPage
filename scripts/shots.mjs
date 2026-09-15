// Visual QA: captura screenshots y detecta scroll horizontal por viewport.
// Playwright no es dependencia del proyecto (para no frenar el deploy en Vercel).
// Para usarlo: npm i -D playwright && npx playwright install chromium && npm run build && npm start
// Luego, en otra terminal: npm run shots
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = "shots";
mkdirSync(outDir, { recursive: true });

const routes = [
  "/es",
  "/es/ia",
  "/es/servicios",
  "/es/contacto",
  "/es/productos/kivio-ecommerce",
  "/es/portafolio/merkko",
];

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

async function settle(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.85;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight + window.innerHeight) setTimeout(step, 80);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 450);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(350);
}

async function overflowReport(page) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const style = getComputedStyle(el);
      if (style.position === "fixed" || style.overflow === "hidden") return;
      if (String(el.className).includes("marquee")) return;
      if (r.right > docWidth + 2 || r.left < -2) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    });
    return {
      docWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasHScroll: document.documentElement.scrollWidth > docWidth + 2,
      offenders: offenders.slice(0, 6),
    };
  });
}

const browser = await chromium.launch();
const report = [];

for (const scheme of ["light", "dark"]) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      locale: "es-CO",
      colorScheme: scheme,
    });
    const page = await ctx.newPage();

    for (const route of routes) {
      const darkOnly = scheme === "dark" && !["/es", "/es/ia"].includes(route);
      if (darkOnly) continue;

      await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
      await settle(page);
      const key = `${scheme}_${vp.name}_${route.replaceAll("/", "-")}`;
      const overflow = await overflowReport(page);
      await page.screenshot({ path: `${outDir}/${key}.png` });
      report.push({ scheme, vp: vp.width, route, ...overflow });

      if (route === "/es" && ["375", "1440"].includes(vp.name)) {
        for (const frac of [0.3, 0.6, 0.92]) {
          await page.evaluate((f) => {
            window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f);
          }, frac);
          await page.waitForTimeout(600);
          await page.screenshot({ path: `${outDir}/${key}_s${Math.round(frac * 100)}.png` });
        }
      }
    }
    await ctx.close();
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
