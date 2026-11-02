#!/usr/bin/env node
/* ============================================================
   Social preview image generator
   ------------------------------------------------------------
   Reads config.js and writes assets/og-image.jpg (1200x630) for
   the og:image / twitter:image tags in index.html.

   Run from anywhere:
       node tools/generate-og-image.mjs

   No npm dependencies. It launches the system Chromium/Chrome
   headlessly and drives it over the DevTools Protocol using
   Node's built-in WebSocket. Set CHROME_PATH if your browser is
   not in one of the usual places.
   ============================================================ */

import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const require = createRequire(import.meta.url);
const cfg = require(join(root, "config.js"));

const outPath = join(root, "assets", "og-image.jpg");

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Imperial+Script&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --cream: #f7f1e3; --paper: #fdfaf2; --cream-band: #f2e9d6;
    --rose: #b06a5b; --rose-deep: #8d4c3e;
    --gold: #b3893d; --gold-soft: #d9c084; --sage: #5f6849;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    position: relative; display: flex; align-items: center; justify-content: center;
    overflow: hidden; font-family: "Playfair Display", Georgia, serif; color: var(--rose-deep);
    background:
      radial-gradient(120% 100% at 50% 0%, rgba(179, 137, 61, 0.15), transparent 58%),
      linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
  }
  .pattern {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cg fill='none' stroke='%23b3893d' stroke-opacity='0.16'%3E%3Crect x='23' y='23' width='26' height='26'/%3E%3Crect x='23' y='23' width='26' height='26' transform='rotate(45 36 36)'/%3E%3Ccircle cx='36' cy='36' r='2.4'/%3E%3Cpath d='M0 36 h12 M60 36 h12 M36 0 v12 M36 60 v12'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 108px 108px;
    -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.28));
    mask-image: linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.28));
  }
  .arch { position: absolute; inset: 36px 210px 30px; border: 1.5px solid rgba(179, 137, 61, 0.55);
    border-radius: 50% 50% 0 0 / 58% 58% 0 0; box-shadow: inset 0 0 0 10px rgba(179, 137, 61, 0.06); }
  .sprig { position: absolute; bottom: 30px; width: 220px; height: 250px; fill: none; stroke: var(--sage); stroke-width: 3; opacity: .65; }
  .sprig--left { left: 35px; transform: rotate(-8deg); }
  .sprig--right { right: 35px; transform: scaleX(-1) rotate(-8deg); }
  .content { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 60px; }
  .seal { width: 76px; height: 76px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;
    border: 1.5px solid var(--gold); border-radius: 50%; box-shadow: inset 0 0 0 6px rgba(179, 137, 61, 0.12);
    font-size: 28px; font-weight: 500; color: var(--sage); }
  .eyebrow { font-family: "Jost", sans-serif; font-size: 15px; font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold); }
  .names { display: flex; flex-direction: column; align-items: center; margin-top: 8px; }
  .name { font-family: "Imperial Script", cursive; font-size: 84px; line-height: .88; color: var(--rose-deep); }
  .amp { font-family: "Playfair Display", serif; font-style: italic; font-size: 34px; line-height: 1; margin: 2px 0; color: var(--gold); }
  .date { margin-top: 16px; font-family: "Playfair Display", serif; font-size: 25px; font-weight: 400;
    color: var(--rose-deep); }
  .city { margin-top: 8px; font-family: "Jost", sans-serif; font-size: 14px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--sage); }
</style>
</head>
<body>
  <div class="pattern"></div>
  <div class="arch"></div>
  <svg class="sprig sprig--left" viewBox="0 0 220 250" aria-hidden="true"><path d="M18 240 C62 176 118 101 202 20 M55 183 C24 170 17 147 20 125 C48 137 60 154 55 183 Z M100 128 C92 98 106 75 126 61 C137 91 127 113 100 128 Z M149 77 C171 52 195 51 215 60 C195 82 174 88 149 77 Z"/></svg>
  <svg class="sprig sprig--right" viewBox="0 0 220 250" aria-hidden="true"><path d="M18 240 C62 176 118 101 202 20 M55 183 C24 170 17 147 20 125 C48 137 60 154 55 183 Z M100 128 C92 98 106 75 126 61 C137 91 127 113 100 128 Z M149 77 C171 52 195 51 215 60 C195 82 174 88 149 77 Z"/></svg>
  <div class="content">
    <div class="seal">${esc(cfg.couple.initials)}</div>
    <p class="eyebrow">The Wedding Of</p>
    <div class="names">
      <span class="name">${esc(cfg.couple.name1)}</span>
      <span class="amp">&amp;</span>
      <span class="name">${esc(cfg.couple.name2)}</span>
    </div>
    <p class="date">${esc(cfg.dateDisplay)}</p>
    <p class="city">${esc(cfg.city)}</p>
  </div>
</body>
</html>`;

function findChrome() {
  const candidates = process.platform === "darwin"
    ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium"]
    : [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium",
       "/usr/bin/chromium-browser", "/snap/bin/chromium"].filter(Boolean);
  return candidates.find(existsSync);
}

const chrome = findChrome();
if (!chrome) {
  console.error("✗ No Chromium/Chrome found. Set CHROME_PATH to its executable.");
  process.exit(1);
}

// Snap-confined Chromium cannot read/write arbitrary hidden dirs, so keep the
// work files inside its writable area.
const isSnap = chrome.startsWith("/snap/");
const base = isSnap ? join(homedir(), "snap", "chromium", "common") : tmpdir();
const work = mkdtempSync(join(base, "og-render-"));

const proc = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check",
  "--remote-debugging-port=0", `--user-data-dir=${join(work, "profile")}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

function cleanup(code) {
  try { proc.kill("SIGTERM"); } catch {}
  try { rmSync(work, { recursive: true, force: true }); } catch {}
  process.exit(code);
}

const port = await new Promise((resolve, reject) => {
  let buf = "";
  const timer = setTimeout(() => reject(new Error("Chromium did not report a debug port")), 20000);
  proc.stderr.on("data", (d) => {
    buf += d.toString();
    const m = buf.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
    if (m) { clearTimeout(timer); resolve(m[1]); }
  });
  proc.on("exit", (c) => { clearTimeout(timer); reject(new Error("Chromium exited early (code " + c + ")")); });
}).catch((e) => { console.error("✗ " + e.message); cleanup(1); });

async function pageSocket(port) {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("no page target found");
}

let wsUrl;
try { wsUrl = await pageSocket(port); }
catch (e) { console.error("✗ " + e.message); cleanup(1); }

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", () => rej(new Error("could not connect to Chromium")), { once: true });
}).catch((e) => { console.error("✗ " + e.message); cleanup(1); });

let msgId = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  let msg; try { msg = JSON.parse(ev.data); } catch { return; }
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++msgId;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  // Inject the markup directly — avoids file:// access issues in sandboxed builds.
  const { frameTree } = await send("Page.getFrameTree");
  await send("Page.setDocumentContent", { frameId: frameTree.frame.id, html });
  await send("Runtime.evaluate", {
    expression: `new Promise(resolve => {
      const deadline = Date.now() + 15000;
      (function tick() {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const cssReady = links.length > 0 && links.every(l => l.sheet);
        const fontsReady = document.fonts.status === 'loaded' && document.fonts.check("84px 'Imperial Script'");
        if (cssReady && fontsReady) resolve(true);
        else if (Date.now() > deadline) resolve(false);
        else setTimeout(tick, 150);
      })();
    })`,
    awaitPromise: true,
    returnByValue: true,
  });
  const shot = await send("Page.captureScreenshot", {
    format: "jpeg", quality: 88,
    clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
  });
  writeFileSync(outPath, Buffer.from(shot.data, "base64"));
} catch (e) {
  console.error("✗ render failed: " + e.message);
  cleanup(1);
}

console.log("✓ wrote " + outPath);
cleanup(0);
