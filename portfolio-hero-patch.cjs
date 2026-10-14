const fs = require("node:fs");
const file = "src/pages/index.astro";
let s = fs.readFileSync(file, "utf8");

if (s.includes('class="engineering-console"')) {
  console.log("Engineering console already exists; no homepage changes made.");
} else {
  const heroPattern = /<div class="hero-visual"[^>]*>[\s\S]*?<\/section>/;
  if (!heroPattern.test(s)) {
    console.error("Hero visual not found. Homepage left unchanged.");
    process.exit(1);
  }

  const consoleMarkup = `
      <div class="hero-visual engineering-console" data-reveal aria-label="Engineering system profile">
        <div class="console-topline">
          <span><i class="console-dot"></i> ENGINEERING / SYSTEM PROFILE</span>
          <span>BG.SYS_01</span>
        </div>
        <div class="console-title">
          <span class="console-kicker">FLAGSHIP BUILD</span>
          <h2>Money<span class="console-accent">Calculator</span></h2>
          <p>Personal finance workflows built around connected ledger records.</p>
        </div>
        <div class="console-divider"></div>
        <div class="console-row">
          <span class="console-index">01</span>
          <span class="console-label">FINANCIAL LEDGER</span>
          <span class="console-state">IMPLEMENTED</span>
        </div>
        <div class="console-row">
          <span class="console-index">02</span>
          <span class="console-label">LOAN LIFECYCLE</span>
          <span class="console-state">IMPLEMENTED</span>
        </div>
        <div class="console-row">
          <span class="console-index">03</span>
          <span class="console-label">REVERSIBLE HISTORY</span>
          <span class="console-state">IMPLEMENTED</span>
        </div>
        <div class="console-test">
          <div><span class="console-kicker">RECORDED TEST BASELINE</span><strong>11 / 11</strong></div>
          <span class="console-state">PASSING*</span>
        </div>
        <p class="console-footnote">*Previously recorded unit and integration test baseline; not a live CI status.</p>
        <div class="console-bottomline"><span>FINANCIAL SYSTEMS</span><span>BUILD / WITH PURPOSE ↗</span></div>
      </div>
    </section>`;

  s = s.replace(heroPattern, consoleMarkup);

  const oldFacts = /<div class="hero-facts" aria-label="Background">[\s\S]*?<\/div>\s*<\/div>/;
  const replacement = `<div class="hero-facts" aria-label="Engineering focus">
          <div class="hero-fact">
            <span class="fact-value">LEDGER</span>
            <span class="fact-label">Connected transactions</span>
          </div>
          <div class="hero-fact">
            <span class="fact-value">LIFECYCLE</span>
            <span class="fact-label">Loans and repayments</span>
          </div>
          <div class="hero-fact">
            <span class="fact-value">AUDIT</span>
            <span class="fact-label">Reversible changes</span>
          </div>
        </div>
      </div>`;

  if (!oldFacts.test(s)) {
    console.error("Hero facts block not found. Homepage patch incomplete; stopping.");
    process.exit(1);
  }

  s = s.replace(oldFacts, replacement);
  fs.writeFileSync(file, s, "utf8");
  console.log("Updated hero with engineering-first content.");
}

const cssFile = "src/styles/system-ui.css";
let css = fs.readFileSync(cssFile, "utf8");
if (!css.includes(".engineering-console")) {
  css += `

/* Engineering-first hero console */
.engineering-console {
  align-self: center;
  padding: clamp(1.1rem, 3vw, 1.8rem);
  border: 1px solid var(--line, #292929);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent, #c6ff4d) 5%, transparent), transparent 48%),
    var(--surface, #101010);
  font-family: "JetBrains Mono", monospace;
}
.console-topline, .console-bottomline {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.7rem;
  color: var(--ink-2, #929292);
  font-size: 0.58rem;
  letter-spacing: 0.07em;
}
.console-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 0.45rem;
  border-radius: 50%;
  background: var(--accent, #c6ff4d);
}
.console-title { padding: 2.2rem 0 1.5rem; }
.console-kicker { display: block; color: var(--ink-2, #929292); font-size: 0.6rem; letter-spacing: 0.1em; }
.console-title h2 { margin: 0.6rem 0; font-size: clamp(1.6rem, 4vw, 2.5rem); letter-spacing: -0.07em; }
.console-accent { display: block; color: var(--accent, #c6ff4d); }
.console-title p { max-width: 34ch; color: var(--ink-2, #929292); font: 0.78rem/1.7 Inter, sans-serif; }
.console-divider { height: 1px; margin-bottom: 0.4rem; background: var(--line, #292929); }
.console-row { display: grid; grid-template-columns: 1.7rem 1fr auto; align-items: center; gap: 0.5rem; padding: 0.85rem 0; border-bottom: 1px solid var(--line, #292929); font-size: 0.6rem; }
.console-index { color: var(--ink-2, #929292); }
.console-label { color: var(--ink, #ededdf); }
.console-state { color: var(--accent, #c6ff4d); font-size: 0.53rem; }
.console-test { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; padding: 1.3rem 0; }
.console-test strong { display: block; margin-top: 0.35rem; font-size: 1.7rem; letter-spacing: -0.06em; }
.console-footnote { margin: 0 0 1.2rem; color: var(--ink-2, #929292); font: 0.65rem/1.6 Inter, sans-serif; }
.console-bottomline { padding-top: 0.9rem; border-top: 1px solid var(--line, #292929); }
@media (max-width: 600px) {
  .engineering-console { padding: 1rem; }
  .console-row { grid-template-columns: 1.4rem 1fr; }
  .console-state { grid-column: 2; }
}
`;
  fs.writeFileSync(cssFile, css, "utf8");
  console.log("Added engineering console styles.");
}
