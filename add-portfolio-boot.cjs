const fs = require("node:fs");
const file = "src/pages/index.astro";
let source = fs.readFileSync(file, "utf8");

if (source.includes('id="systemBoot"')) {
  console.log("Boot sequence already exists; no changes made.");
  process.exit(0);
}

const marker = '<main class="portfolio-shell">';
if (!source.includes(marker)) {
  console.error("Could not find homepage main element; file unchanged.");
  process.exit(1);
}

const bootMarkup = `
<div id="systemBoot" class="system-boot" role="status" aria-live="polite">
  <div class="boot-panel">
    <div class="boot-brand"><span>BG</span> / SYSTEM INITIALIZER</div>
    <div class="boot-rule"></div>
    <p class="boot-kicker">INITIALIZING SYSTEM — B.G / 2026</p>
    <h2>Building systems<span class="boot-cursor">_</span></h2>
    <div class="boot-log" aria-hidden="true">
      <p><span>[ OK ]</span> INTERFACE KERNEL</p>
      <p><span>[ OK ]</span> FINANCIAL SYSTEMS</p>
      <p><span>[ OK ]</span> ENGINEERING PORTFOLIO</p>
    </div>
    <div class="boot-progress"><span></span></div>
    <div class="boot-bottom"><span>STARTUP SEQUENCE</span><span>2026 / READY</span></div>
    <button class="boot-skip" id="skipBoot" type="button">SKIP INTRO ↗</button>
  </div>
</div>
`;

const bootStyles = `
<style>
.system-boot {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  color: #ededdf;
  background: #090a09;
  font-family: "JetBrains Mono", monospace;
  animation: boot-screen-out 0.45s ease 1.65s forwards;
}
.boot-panel { width: min(100%, 540px); }
.boot-brand, .boot-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #888b80;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}
.boot-brand span { color: #c6ff4d; font-weight: 700; }
.boot-rule { height: 1px; margin: 1.3rem 0 2.3rem; background: #30332b; }
.boot-kicker { color: #c6ff4d; font-size: 0.7rem; letter-spacing: 0.08em; }
.boot-panel h2 {
  margin: 0.8rem 0 1.7rem;
  font-size: clamp(1.8rem, 6vw, 3.2rem);
  letter-spacing: -0.07em;
  line-height: 1.1;
}
.boot-cursor { color: #c6ff4d; animation: boot-blink 0.7s steps(2) infinite; }
.boot-log { margin: 0 0 1.8rem; }
.boot-log p { margin: 0.65rem 0; color: #92958b; font-size: 0.72rem; }
.boot-log p span { margin-right: 0.6rem; color: #c6ff4d; }
.boot-progress { height: 2px; overflow: hidden; background: #30332b; }
.boot-progress span {
  display: block;
  width: 100%;
  height: 100%;
  background: #c6ff4d;
  transform: scaleX(0);
  transform-origin: left;
  animation: boot-progress 1.35s ease forwards;
}
.boot-bottom { margin-top: 0.8rem; font-size: 0.58rem; }
.boot-skip {
  display: block;
  margin: 2rem 0 0 auto;
  padding: 0.6rem 0;
  border: 0;
  color: #a4a79d;
  background: transparent;
  font: inherit;
  font-size: 0.65rem;
  cursor: pointer;
}
.boot-skip:hover { color: #c6ff4d; }
@keyframes boot-progress { to { transform: scaleX(1); } }
@keyframes boot-blink { 50% { opacity: 0; } }
@keyframes boot-screen-out {
  to { opacity: 0; visibility: hidden; pointer-events: none; }
}
@media (prefers-reduced-motion: reduce) {
  .system-boot { animation: none; }
  .boot-progress span, .boot-cursor { animation: none; }
}
</style>
`;

const bootScript = `
<script>
  const bootScreen = document.getElementById("systemBoot");
  const skipBoot = document.getElementById("skipBoot");
  const reduceBootMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finishBoot() {
    if (!bootScreen) return;
    bootScreen.classList.add("boot-finished");
    bootScreen.style.animation = "none";
    bootScreen.remove();
  }

  if (bootScreen) {
    if (reduceBootMotion) {
      finishBoot();
    } else {
      const bootTimer = window.setTimeout(finishBoot, 2200);
      skipBoot?.addEventListener("click", () => {
        window.clearTimeout(bootTimer);
        finishBoot();
      });
    }
  }
</script>
`;

source = source.replace(marker, bootMarkup + "\n" + marker);
const layoutClose = "</Layout>";
if (!source.includes(layoutClose)) {
  console.error("Could not find Layout closing tag; file unchanged.");
  process.exit(1);
}
source = source.replace(layoutClose, bootStyles + "\n" + bootScript + "\n" + layoutClose);
fs.writeFileSync(file, source, "utf8");
console.log("Added boot sequence to " + file);
