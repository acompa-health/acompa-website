# Acompa Website Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Acompa Health's introductory page around the approved “quiet authority, radical premise” narrative while retaining the current hero image and keeping the site static, dependency-free, responsive, and accessible.

**Architecture:** Keep GitHub Pages and the single-page information architecture. Replace the existing inline document with semantic HTML in `index.html`, move the redesigned visual system into one local stylesheet at `assets/site.css`, and add Node built-in tests that enforce the approved public copy, section order, forbidden internal language, and baseline accessibility/responsive hooks. Do not add JavaScript, external fonts, packages, new photography, or internal platform component names.

**Tech Stack:** HTML5, CSS3, Node.js built-in `node:test`, Python's built-in static server, GitHub Pages.

---

## Scope and file map

- Modify `index.html`: metadata, navigation, all homepage copy, semantic section order, founder evidence, and accessible link labels.
- Create `assets/site.css`: editorial visual system, layout, responsive rules, visible focus, and reduced-motion handling.
- Create `tests/site-content.test.mjs`: durable contract for mission, vision, values, team evidence, narrative order, retained image, and prohibited copy.
- Create `tests/site-style.test.mjs`: durable contract for the local stylesheet and baseline responsive/accessibility rules.
- Modify `README.md`: local preview, tests, architecture, and asset decision.
- Leave `.nojekyll`, `CNAME`, `favicon.ico`, `assets/acompa-icon-transparent.png`, and `assets/cats_cradle_hero.jpg` unchanged.

## Task 1: Lock the approved narrative into a failing content contract

**Files:**
- Create: `tests/site-content.test.mjs`
- Test: `tests/site-content.test.mjs`

- [ ] **Step 1: Add the complete content-contract test**

Create `tests/site-content.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

function assertIncludesAll(values, subject = html) {
  for (const value of values) {
    assert.ok(subject.includes(value), `Expected page to include: ${value}`);
  }
}

function assertExcludesAll(values, subject = html) {
  for (const value of values) {
    assert.ok(!subject.includes(value), `Expected page to exclude: ${value}`);
  }
}

function assertInOrder(values) {
  let previousIndex = -1;

  for (const value of values) {
    const currentIndex = html.indexOf(value);
    assert.ok(currentIndex > previousIndex, `Expected ${value} in the approved page order`);
    previousIndex = currentIndex;
  }
}

test("publishes the authoritative mission and vision", () => {
  assertIncludesAll([
    "We are reimagining healthcare systems to be AI-native to care for the most vulnerable communities.",
    "A world where poverty and geography no longer decide the quality of anyone's care.",
  ]);
});

test("uses the approved narrative and navigation order", () => {
  assertIncludesAll([
    'href="#purpose"',
    'href="#team"',
    'href="#approach"',
    'href="#values"',
  ]);
  assertInOrder([
    '<section class="hero"',
    '<section id="purpose"',
    '<section id="team"',
    '<section id="approach"',
    '<section class="system"',
    '<section id="values"',
    '<section class="close"',
  ]);
});

test("establishes credibility with evidence instead of prestige adjectives", () => {
  assertIncludesAll([
    "Kebba Jobarteh",
    "Partners In Health",
    "Mozambique's national HIV program",
    "Kuang Chen",
    "Captricity",
    "SS&amp;C",
    "Brian DeRenzi",
    "CommCare",
    "Open Chat Studio",
    "Andrea Spillmann-Gajek",
    "venture-backed technology and mission-driven organizations",
  ]);
  assertExcludesAll([
    "world-class",
    "renowned",
    "prestigious",
    "exceptional team",
    "Clinical implementation",
    "Technology and systems",
    "Digital health and AI",
    "Operations and partnerships",
  ]);
});

test("explains the changed premise for primary care", () => {
  assertIncludesAll([
    "Primary care today",
    "Care begins when someone arrives.",
    "Missed care often disappears from view.",
    "Primary care, redesigned",
    "Care begins with everyone the system is responsible for.",
    "The system reaches out, remembers, and follows through.",
    "Every interaction strengthens the next.",
  ]);
});

test("describes an enabling platform without exposing internal architecture", () => {
  assertIncludesAll([
    "Reach people in the language and channel available to them.",
    "Bring the right context and intelligence to every care decision.",
    "Keep responsibility visible until care is complete.",
    "the tools they already use",
    "without creating another competing record",
    "Voice is not a product category.",
  ]);
  assertExcludesAll([
    "Natural Language Services",
    "Care Context Exchange",
    "Care Workflow Orchestration",
    "Care Access Line",
    "CHW Companion",
    "Facility Workspace",
    "County Console",
  ]);
});

test("publishes all eight values in the approved four movements", () => {
  assertIncludesAll([
    "Care in daily life",
    "Health is improved in daily life.",
    "Care is designed with patients at the center.",
    "Care that learns",
    "Every interaction strengthens the next.",
    "Humans anchor learning loops.",
    "Care through relationship",
    "Great healthcare requires accompaniment.",
    "Relationships are the foundation of care and technology amplifies relationships.",
    "Complexity and responsibility",
    "The system carries complexity before the people do.",
    "Humans are accountable for clinical decisions.",
  ]);
});

test("removes the superseded product-led positioning", () => {
  assertExcludesAll([
    "We build technology that helps primary care reach people where they are.",
    "Voice-first, human-centered systems",
    "Excellent care should not depend on getting through the clinic door.",
    "Infrastructure for care that keeps moving after the visit ends.",
    "Digital accompaniment",
    "AI with guardrails",
  ]);
});

test("retains the approved assets and accessible outbound links", () => {
  assertIncludesAll([
    '<link rel="stylesheet" href="assets/site.css">',
    'src="assets/acompa-icon-transparent.png"',
    'src="assets/cats_cradle_hero.jpg"',
    'aria-label="Kebba Jobarteh on LinkedIn (opens in a new tab)"',
    'aria-label="Kuang Chen on LinkedIn (opens in a new tab)"',
    'aria-label="Brian DeRenzi on LinkedIn (opens in a new tab)"',
    'aria-label="Andrea Spillmann-Gajek on LinkedIn (opens in a new tab)"',
    'rel="noopener noreferrer"',
  ]);
  assert.ok(!html.includes("<style>"), "Expected presentation to live in assets/site.css");
});
```

- [ ] **Step 2: Run the contract and confirm it fails for the current site**

Run:

```bash
node --test tests/site-content.test.mjs
```

Expected: a non-zero exit with failures for the authoritative mission, vision, approved section order, premise contrast, values, stylesheet link, and superseded copy. Some founder-name assertions may already pass.

- [ ] **Step 3: Do not weaken assertions to fit the current page**

Review each failure against `docs/superpowers/specs/2026-08-19-acompa-website-positioning-design.md`. Only correct a test if it contradicts that approved design; otherwise leave it red for Task 2.

## Task 2: Replace the page with the approved semantic narrative

**Files:**
- Modify: `index.html:1-688`
- Test: `tests/site-content.test.mjs`

- [ ] **Step 1: Replace `index.html` with the complete semantic page**

Use this complete document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Acompa Health is reimagining healthcare systems to be AI-native to care for the most vulnerable communities.">
  <meta property="og:title" content="Acompa Health">
  <meta property="og:description" content="A world where poverty and geography no longer decide the quality of anyone's care.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/cats_cradle_hero.jpg">
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" href="assets/site.css">
  <title>Acompa Health</title>
</head>
<body>
  <header class="site-header" aria-label="Primary navigation">
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="Acompa Health home">
        <img class="brand-icon" src="assets/acompa-icon-transparent.png" alt="" aria-hidden="true">
        <span>Acompa Health</span>
      </a>
      <nav class="site-nav" aria-label="Page sections">
        <a href="#purpose">Purpose</a>
        <a href="#team">Team</a>
        <a href="#approach">Approach</a>
        <a href="#values">Values</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <img class="hero-image" src="assets/cats_cradle_hero.jpg" alt="" aria-hidden="true">
      <div class="wrap hero-inner">
        <p class="eyebrow hero-signature">Acompa Health</p>
        <h1 id="hero-title">We are reimagining healthcare systems to be AI-native to care for the most vulnerable communities.</h1>
        <p class="hero-support">Primary care should be responsible for everyone—not only available to whoever reaches a clinic.</p>
      </div>
    </section>

    <section id="purpose" class="purpose" aria-labelledby="vision-title">
      <div class="wrap purpose-grid">
        <p class="eyebrow">Our vision</p>
        <div>
          <h2 id="vision-title" class="vision-statement">A world where poverty and geography no longer decide the quality of anyone's care.</h2>
          <p class="purpose-note">That requires changing what primary care is responsible for—not merely making the existing model more efficient.</p>
        </div>
      </div>
    </section>

    <section id="team" class="team" aria-labelledby="team-title">
      <div class="wrap">
        <div class="section-intro team-intro">
          <div>
            <p class="eyebrow">Why this team</p>
            <h2 id="team-title">Four careers converging on one unfinished problem.</h2>
          </div>
          <p>Across four careers, the team has delivered care in rural hospitals, helped lead national health programs, built digital public goods used across countries, applied machine learning to difficult operational problems, and grown care and technology organizations from first principles.</p>
        </div>

        <div class="people">
          <article class="person">
            <p class="person-proof">Partners In Health · CDC · Antara Health</p>
            <h3>Kebba Jobarteh</h3>
            <p>A pediatrician and health-system builder whose work spans Partners In Health in rural Malawi, Mozambique's national HIV program with the CDC, health financing, and Antara's virtual-first primary care in Kenya.</p>
            <a class="profile-link" href="https://www.linkedin.com/in/kebba-jobarteh" target="_blank" rel="noopener noreferrer" aria-label="Kebba Jobarteh on LinkedIn (opens in a new tab)">LinkedIn profile</a>
          </article>

          <article class="person">
            <p class="person-proof">Captricity · SS&amp;C · Antara Health</p>
            <h3>Kuang Chen</h3>
            <p>A computer scientist and entrepreneur who turned field research in East African clinics into Captricity, an applied-AI company acquired by SS&amp;C, then co-founded Antara Health.</p>
            <a class="profile-link" href="https://www.linkedin.com/in/kuangchen" target="_blank" rel="noopener noreferrer" aria-label="Kuang Chen on LinkedIn (opens in a new tab)">LinkedIn profile</a>
          </article>

          <article class="person">
            <p class="person-proof">CommCare · Dimagi · Open Chat Studio</p>
            <h3>Brian DeRenzi</h3>
            <p>A digital-health researcher and builder who helped shape CommCare, led frontline clinical decision-support work, and now develops open AI systems for global health through Dimagi and Open Chat Studio.</p>
            <a class="profile-link" href="https://www.linkedin.com/in/bderenzi" target="_blank" rel="noopener noreferrer" aria-label="Brian DeRenzi on LinkedIn (opens in a new tab)">LinkedIn profile</a>
          </article>

          <article class="person">
            <p class="person-proof">Captricity · Global health · Company building</p>
            <h3>Andrea Spillmann-Gajek</h3>
            <p>A global-health operator who helped build and scale Captricity and has led customer, partnership, and operating teams across venture-backed technology and mission-driven organizations.</p>
            <a class="profile-link" href="https://www.linkedin.com/in/andreaspillmann" target="_blank" rel="noopener noreferrer" aria-label="Andrea Spillmann-Gajek on LinkedIn (opens in a new tab)">LinkedIn profile</a>
          </article>
        </div>
      </div>
    </section>

    <section id="approach" class="premise" aria-labelledby="premise-title">
      <div class="wrap">
        <div class="section-intro premise-intro">
          <div>
            <p class="eyebrow">A different premise</p>
            <h2 id="premise-title">Primary care cannot care for people it only sees episodically.</h2>
          </div>
          <p>The shift is from a service people must find to a system that knows who it serves and remains responsible for what happens next.</p>
        </div>

        <div class="contrast-grid">
          <article class="contrast-column contrast-current">
            <p class="contrast-label">Primary care today</p>
            <ul>
              <li>Care begins when someone arrives.</li>
              <li>Each visit is treated as an episode.</li>
              <li>The patient carries information between services.</li>
              <li>Missed care often disappears from view.</li>
            </ul>
          </article>
          <article class="contrast-column contrast-redesigned">
            <p class="contrast-label">Primary care, redesigned</p>
            <ul>
              <li>Care begins with everyone the system is responsible for.</li>
              <li>The system reaches out, remembers, and follows through.</li>
              <li>Information moves instead of patients whenever possible.</li>
              <li>Every interaction strengthens the next.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="system" aria-labelledby="system-title">
      <div class="wrap">
        <div class="section-intro system-intro">
          <div>
            <p class="eyebrow">The enabling system</p>
            <h2 id="system-title">The best available intelligence, carried into the work of care.</h2>
          </div>
          <p>Acompa is building a platform that helps care organizations apply the best available AI across the tools they already use—without creating another competing record or surrendering clinical accountability.</p>
        </div>

        <div class="promises">
          <article class="promise">
            <p class="promise-number">01</p>
            <h3>Reach people in the language and channel available to them.</h3>
            <p>Patients, caregivers, and health workers can participate through the device, language, and level of connectivity available in the moment.</p>
          </article>
          <article class="promise">
            <p class="promise-number">02</p>
            <h3>Bring the right context and intelligence to every care decision.</h3>
            <p>Relevant history, clinical guidance, and operating reality come together so each person can make the decision in front of them.</p>
          </article>
          <article class="promise">
            <p class="promise-number">03</p>
            <h3>Keep responsibility visible until care is complete.</h3>
            <p>Care stays open across households, facilities, referrals, results, and follow-up until the expected work is done.</p>
          </article>
        </div>

        <div class="voice-note">
          <p class="eyebrow">Voice across the system</p>
          <p><strong>Voice is not a product category.</strong> It is how patients can seek help in their own language from any phone; how community health workers can prepare and document with less typing; and how clinicians can spend less time reconstructing and recording history.</p>
        </div>
      </div>
    </section>

    <section id="values" class="values" aria-labelledby="values-title">
      <div class="wrap">
        <div class="section-intro values-intro">
          <div>
            <p class="eyebrow">What governs the work</p>
            <h2 id="values-title">The system changes. Responsibility does not.</h2>
          </div>
          <p>These are the commitments we use to decide what belongs in the care model—and what does not.</p>
        </div>

        <div class="value-groups">
          <article class="value-group">
            <p class="value-number">01</p>
            <h3>Care in daily life</h3>
            <p>Health is improved in daily life.</p>
            <p>Care is designed with patients at the center.</p>
          </article>
          <article class="value-group">
            <p class="value-number">02</p>
            <h3>Care that learns</h3>
            <p>Every interaction strengthens the next.</p>
            <p>Humans anchor learning loops.</p>
          </article>
          <article class="value-group">
            <p class="value-number">03</p>
            <h3>Care through relationship</h3>
            <p>Great healthcare requires accompaniment.</p>
            <p>Relationships are the foundation of care and technology amplifies relationships.</p>
          </article>
          <article class="value-group">
            <p class="value-number">04</p>
            <h3>Complexity and responsibility</h3>
            <p>The system carries complexity before the people do.</p>
            <p>Humans are accountable for clinical decisions.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="close" aria-labelledby="close-title">
      <div class="wrap close-inner">
        <p class="eyebrow">The destination</p>
        <h2 id="close-title">A world where poverty and geography no longer decide the quality of anyone's care.</h2>
        <p>If you are working toward primary care that is responsible for everyone, we should know one another.</p>
        <a class="quiet-link" href="#team">Meet the people behind Acompa</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-inner">
      <p>&copy; 2026 Acompa Health</p>
      <a href="#top">Back to top</a>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Run the content contract**

Run:

```bash
node --test tests/site-content.test.mjs
```

Expected: `8` tests pass, `0` fail. The page will be temporarily unstyled until Task 3 creates `assets/site.css`; that is expected.

- [ ] **Step 3: Review the claims before committing**

Check each founder sentence against the approved design source notes. The homepage copy should remain concise and evidence-led. Do not add university names, superlatives, a logo wall, or longer resume material.

- [ ] **Step 4: Commit the semantic narrative and contract**

```bash
git add index.html tests/site-content.test.mjs
git commit -m "Reframe Acompa website narrative"
```

Expected: one commit containing only `index.html` and `tests/site-content.test.mjs`.

## Task 3: Build the quietly formidable visual system

**Files:**
- Create: `tests/site-style.test.mjs`
- Create: `assets/site.css`
- Test: `tests/site-style.test.mjs`
- Test: `tests/site-content.test.mjs`

- [ ] **Step 1: Add a failing stylesheet contract**

Create `tests/site-style.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssUrl = new URL("../assets/site.css", import.meta.url);

async function loadCss() {
  try {
    return await readFile(cssUrl, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      assert.fail("Expected assets/site.css to exist");
    }
    throw error;
  }
}

test("defines the restrained Acompa palette and editorial type system", async () => {
  const css = await loadCss();
  for (const token of ["--paper", "--ink", "--deep", "--blue", "--lime", "--serif", "--sans"]) {
    assert.ok(css.includes(token), `Expected stylesheet to define ${token}`);
  }
  assert.ok(css.includes('Iowan Old Style'), "Expected a local editorial serif stack");
  assert.ok(css.includes("ui-sans-serif"), "Expected a precise system sans stack");
});

test("provides editorial layouts instead of a generic card wall", async () => {
  const css = await loadCss();
  for (const selector of [
    ".purpose-grid",
    ".section-intro",
    ".people",
    ".contrast-grid",
    ".promises",
    ".value-groups",
  ]) {
    assert.ok(css.includes(selector), `Expected layout rule for ${selector}`);
  }
  assert.ok(!css.includes("box-shadow"), "Expected the redesign to avoid card shadows");
});

test("keeps focus visible and motion optional", async () => {
  const css = await loadCss();
  assert.ok(css.includes(":focus-visible"), "Expected a visible keyboard focus treatment");
  assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"), "Expected reduced-motion support");
});

test("defines tablet and mobile adaptations", async () => {
  const css = await loadCss();
  assert.ok(css.includes("@media (max-width: 960px)"), "Expected a tablet breakpoint");
  assert.ok(css.includes("@media (max-width: 640px)"), "Expected a mobile breakpoint");
});
```

- [ ] **Step 2: Run the style test and confirm the missing file is reported**

Run:

```bash
node --test tests/site-style.test.mjs
```

Expected: a non-zero exit; each test reports `Expected assets/site.css to exist`.

- [ ] **Step 3: Create the complete stylesheet**

Create `assets/site.css`:

```css
:root {
  --paper: #f3efe5;
  --paper-light: #fbf8f1;
  --ink: #14322d;
  --deep: #0f2d28;
  --blue: #2a93c9;
  --lime: #afd263;
  --white: #fffdf7;
  --muted: #60746f;
  --line: rgba(20, 50, 45, 0.2);
  --line-on-dark: rgba(255, 253, 247, 0.22);
  --page: 1180px;
  --serif: "Iowan Old Style", "Palatino Linotype", Palatino, Baskerville, Georgia, serif;
  --sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--paper-light);
  font-family: var(--sans);
  font-size: 1rem;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

a {
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

img {
  display: block;
  max-width: 100%;
}

p,
h1,
h2,
h3 {
  margin-top: 0;
}

.wrap,
.header-inner {
  width: min(var(--page), calc(100% - 48px));
  margin-inline: auto;
}

.site-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  color: var(--white);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-block: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.94rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: none;
}

.brand-icon {
  width: 2.1rem;
  height: 2.1rem;
  object-fit: contain;
}

.site-nav {
  display: flex;
  gap: 1.75rem;
  font-size: 0.86rem;
  color: rgba(255, 253, 247, 0.78);
}

.site-nav a {
  text-decoration: none;
}

.site-nav a:hover {
  color: var(--white);
}

.hero {
  position: relative;
  display: grid;
  min-height: 92svh;
  align-items: end;
  overflow: hidden;
  padding-block: 9rem 6rem;
  color: var(--white);
  background: var(--deep);
}

.hero::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(90deg, rgba(8, 35, 30, 0.96) 0%, rgba(15, 45, 40, 0.83) 48%, rgba(15, 45, 40, 0.28) 100%);
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% 35%;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin-bottom: 1.25rem;
  color: var(--blue);
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  line-height: 1.3;
  text-transform: uppercase;
}

.hero-signature {
  color: var(--lime);
}

h1,
h2 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

h1 {
  max-width: 1040px;
  margin-bottom: 0;
  font-size: clamp(3.3rem, 6.8vw, 7rem);
  line-height: 0.97;
}

.hero-support {
  max-width: 720px;
  margin: 2.25rem 0 0;
  color: rgba(255, 253, 247, 0.8);
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  line-height: 1.5;
}

section:not(.hero) {
  padding-block: clamp(5rem, 9vw, 8rem);
}

h2 {
  margin-bottom: 0;
  font-size: clamp(2.6rem, 5.2vw, 5.2rem);
  line-height: 1.02;
}

h3 {
  margin-bottom: 0;
  font-size: 1.25rem;
  line-height: 1.25;
}

.purpose {
  background: var(--paper);
}

.purpose-grid {
  display: grid;
  grid-template-columns: minmax(150px, 0.3fr) minmax(0, 1.7fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: start;
}

.purpose-grid > .eyebrow {
  margin-top: 0.75rem;
}

.vision-statement {
  max-width: 980px;
}

.purpose-note {
  max-width: 670px;
  margin: 2.5rem 0 0;
  color: var(--muted);
  font-size: 1.12rem;
}

.team,
.system {
  background: var(--paper-light);
}

.section-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: clamp(3rem, 7vw, 8rem);
  align-items: end;
}

.section-intro > p {
  max-width: 560px;
  margin: 0 0 0.4rem;
  color: var(--muted);
  font-size: 1.05rem;
}

.people {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(3rem, 7vw, 8rem);
  margin-top: clamp(4rem, 7vw, 6rem);
  border-bottom: 1px solid var(--line);
}

.person {
  padding-block: 2rem 2.5rem;
  border-top: 1px solid var(--line);
}

.person-proof,
.promise-number,
.value-number {
  margin-bottom: 1rem;
  color: var(--blue);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.person > p:not(.person-proof) {
  max-width: 600px;
  margin: 1rem 0 0;
  color: var(--muted);
}

.profile-link,
.quiet-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--ink);
  font-size: 0.83rem;
  font-weight: 750;
}

.profile-link:hover,
.quiet-link:hover {
  color: var(--blue);
}

.premise {
  color: var(--white);
  background: var(--deep);
}

.premise .eyebrow {
  color: var(--lime);
}

.premise-intro > p {
  color: rgba(255, 253, 247, 0.7);
}

.contrast-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: clamp(4rem, 7vw, 6rem);
  border-block: 1px solid var(--line-on-dark);
}

.contrast-column {
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.contrast-column + .contrast-column {
  padding-left: clamp(2.5rem, 6vw, 6rem);
  border-left: 1px solid var(--line-on-dark);
}

.contrast-label {
  margin-bottom: 2rem;
  color: rgba(255, 253, 247, 0.62);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contrast-redesigned .contrast-label {
  color: var(--lime);
}

.contrast-column ul {
  display: grid;
  gap: 1.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.contrast-column li {
  position: relative;
  max-width: 510px;
  padding-left: 1.5rem;
  color: rgba(255, 253, 247, 0.88);
  font-family: var(--serif);
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.3;
}

.contrast-column li::before {
  position: absolute;
  top: 0.62em;
  left: 0;
  width: 0.42rem;
  height: 0.42rem;
  content: "";
  background: rgba(255, 253, 247, 0.35);
  border-radius: 50%;
}

.contrast-redesigned li::before {
  background: var(--lime);
}

.system-intro {
  align-items: start;
}

.promises {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(2rem, 4vw, 4rem);
  margin-top: clamp(4rem, 7vw, 6rem);
}

.promise {
  padding-top: 1.5rem;
  border-top: 2px solid var(--ink);
}

.promise h3 {
  font-family: var(--serif);
  font-size: clamp(1.45rem, 2.2vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.015em;
}

.promise > p:last-child {
  margin: 1.25rem 0 0;
  color: var(--muted);
}

.voice-note {
  display: grid;
  grid-template-columns: minmax(150px, 0.3fr) minmax(0, 1.7fr);
  gap: clamp(2rem, 6vw, 7rem);
  margin-top: clamp(4rem, 8vw, 7rem);
  padding-block: 2.5rem;
  border-block: 1px solid var(--line);
}

.voice-note .eyebrow {
  margin: 0.4rem 0 0;
}

.voice-note > p:last-child {
  max-width: 860px;
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  line-height: 1.4;
}

.values {
  background: var(--paper);
}

.value-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(3rem, 7vw, 8rem);
  margin-top: clamp(4rem, 7vw, 6rem);
  border-bottom: 1px solid var(--line);
}

.value-group {
  padding-block: 2rem 2.75rem;
  border-top: 1px solid var(--line);
}

.value-group h3 {
  margin-bottom: 1.25rem;
  font-family: var(--serif);
  font-size: clamp(1.65rem, 2.7vw, 2.5rem);
  font-weight: 400;
}

.value-group > p:not(.value-number) {
  max-width: 540px;
  margin: 0.6rem 0 0;
  color: var(--muted);
  font-size: 1.05rem;
}

.close {
  color: var(--white);
  background: var(--deep);
}

.close .eyebrow {
  color: var(--lime);
}

.close h2 {
  max-width: 1040px;
}

.close-inner > p:not(.eyebrow) {
  max-width: 720px;
  margin: 2.25rem 0 0;
  color: rgba(255, 253, 247, 0.72);
  font-size: 1.12rem;
}

.close .quiet-link {
  color: var(--white);
}

.close .quiet-link:hover {
  color: var(--lime);
}

.site-footer {
  color: rgba(255, 253, 247, 0.62);
  background: #09221e;
  font-size: 0.82rem;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-block: 1.5rem;
}

.footer-inner p {
  margin: 0;
}

.footer-inner a {
  color: rgba(255, 253, 247, 0.82);
}

a:focus-visible {
  outline: 3px solid var(--lime);
  outline-offset: 5px;
}

@media (max-width: 960px) {
  .purpose-grid,
  .section-intro,
  .voice-note {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-intro {
    align-items: start;
  }

  .section-intro > p {
    max-width: 720px;
  }

  .promises {
    grid-template-columns: 1fr;
  }

  .promise {
    display: grid;
    grid-template-columns: 3rem minmax(0, 1fr);
    column-gap: 1.25rem;
  }

  .promise-number {
    grid-row: 1 / 3;
  }

  .promise > p:last-child {
    grid-column: 2;
  }
}

@media (max-width: 640px) {
  .wrap,
  .header-inner {
    width: min(100% - 30px, var(--page));
  }

  .site-nav {
    display: none;
  }

  .hero {
    min-height: 88svh;
    padding-block: 7rem 3.5rem;
  }

  .hero::after {
    background: linear-gradient(90deg, rgba(8, 35, 30, 0.96) 0%, rgba(15, 45, 40, 0.84) 68%, rgba(15, 45, 40, 0.48) 100%);
  }

  .hero-image {
    object-position: 68% 35%;
  }

  h1 {
    font-size: clamp(2.75rem, 13vw, 4.25rem);
  }

  .people,
  .value-groups,
  .contrast-grid {
    grid-template-columns: 1fr;
  }

  .contrast-column + .contrast-column {
    padding-left: 0;
    border-top: 1px solid var(--line-on-dark);
    border-left: 0;
  }

  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 4: Run both static test suites**

Run:

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

Expected: `12` tests pass, `0` fail.

- [ ] **Step 5: Commit the visual system**

```bash
git add assets/site.css tests/site-style.test.mjs
git commit -m "Add editorial visual system"
```

Expected: one commit containing only `assets/site.css` and `tests/site-style.test.mjs`.

## Task 4: Perform visual, responsive, and accessibility review

**Files:**
- Modify if review finds defects: `index.html`
- Modify if review finds defects: `assets/site.css`
- Test: `tests/site-content.test.mjs`
- Test: `tests/site-style.test.mjs`

- [ ] **Step 1: Start a local static server**

Run in a dedicated terminal:

```bash
python3 -m http.server 8000
```

Expected: `Serving HTTP on ... port 8000` and the process remains running for review.

- [ ] **Step 2: Confirm the page and assets resolve**

Run from another terminal:

```bash
curl -I http://127.0.0.1:8000/
curl -I http://127.0.0.1:8000/assets/site.css
curl -I http://127.0.0.1:8000/assets/cats_cradle_hero.jpg
```

Expected: each response begins with `HTTP/1.0 200 OK` or `HTTP/1.1 200 OK`.

- [ ] **Step 3: Review representative viewport sizes**

Open `http://127.0.0.1:8000/` and inspect at:

- `1440 × 900`: mission reads as the hero's dominant object; image remains supporting evidence; team appears before the care-model explanation.
- `1024 × 768`: section intros and the three public promises reflow without cramped columns.
- `768 × 1024`: founder evidence, premise contrast, and value movements retain a clear reading order.
- `390 × 844`: mission and vision have no clipped or orphaned fragments; the cat's-cradle crop still suggests hands, relationship, and coordination; no horizontal overflow appears.

At every size verify:

- The page reads as one editorial argument, not a card catalog.
- Serif thesis language and sans-serif evidence language are visibly distinct.
- Founder evidence is legible but does not resemble a logo wall or degree parade.
- The premise contrast is understandable without relying on color alone.
- The hero image remains `assets/cats_cradle_hero.jpg`; no replacement image or synthetic motif has been introduced.

- [ ] **Step 4: Perform keyboard and reduced-motion checks**

Using only the keyboard, tab through the brand, navigation, all four LinkedIn links, the closing link, and the footer link. Every focused link must have a visible lime outline. Confirm each new-tab profile link has an accessible name announcing the new tab.

Enable reduced motion in the browser or operating system and reload. In-page navigation should jump without smooth scrolling. At 200% browser zoom, text must remain readable and the layout must not scroll horizontally.

- [ ] **Step 5: Correct only evidenced defects and rerun tests**

If review exposes a defect, first describe the failing viewport or interaction in the commit body, then make the smallest change in `index.html` or `assets/site.css`. Do not use this pass to add animation, external fonts, a new image, a line motif, a contact address, or longer biographies.

Run:

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

Expected: `12` tests pass, `0` fail after any correction.

- [ ] **Step 6: Commit review corrections if any were necessary**

```bash
git add index.html assets/site.css
git commit -m "Polish responsive Acompa presentation"
```

Expected: create this commit only if visual or accessibility review produced changes. Otherwise skip it.

## Task 5: Document the new maintenance workflow

**Files:**
- Modify: `README.md:1-24`

- [ ] **Step 1: Replace `README.md` with the current architecture and commands**

Use this complete content:

````markdown
# Acompa Website

Static public website for Acompa Health.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/`.

## Tests

The tests use Node's built-in test runner and require no installed packages:

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

The content contract protects the approved mission, vision, values, section order, founder evidence, current hero image, and private architecture boundaries. The style contract protects the local editorial type system and baseline responsive and accessibility rules.

## Structure

- `index.html` contains the page's semantic structure and public copy.
- `assets/site.css` contains the visual system and responsive behavior.
- `assets/cats_cradle_hero.jpg` is the approved hero image for this iteration.
- `assets/acompa-icon-transparent.png` and `favicon.ico` are Acompa brand assets.
- `.nojekyll` and `CNAME` support GitHub Pages deployment.

The site is intentionally dependency-free. Do not add a build step, external font request, JavaScript framework, or image replacement without a separate design decision.

## GitHub Pages

The custom domain is configured by `CNAME`. In GitHub repository settings, Pages should deploy from the `main` branch and the repository root.
````

- [ ] **Step 2: Run the full test suite after the documentation edit**

Run:

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

Expected: `12` tests pass, `0` fail.

- [ ] **Step 3: Commit the documentation**

```bash
git add README.md
git commit -m "Document Acompa site verification"
```

Expected: one commit containing only `README.md`.

## Task 6: Final verification and scope audit

**Files:**
- Verify: `index.html`
- Verify: `assets/site.css`
- Verify: `tests/site-content.test.mjs`
- Verify: `tests/site-style.test.mjs`
- Verify: `README.md`

- [ ] **Step 1: Run the complete automated verification**

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

Expected: `12` tests pass, `0` fail.

- [ ] **Step 2: Confirm retained brand assets are byte-for-byte unchanged**

```bash
shasum -a 256 assets/acompa-icon-transparent.png assets/cats_cradle_hero.jpg favicon.ico
```

Expected:

```text
f2a517c5f580d1f2a49256f264291bceabca74c7b78552fc8944a9570c499864  assets/acompa-icon-transparent.png
cf430124fa74ab299ba065f1547633261d51734e96014f07be237e97560d3550  assets/cats_cradle_hero.jpg
b1dcf41080385a68cf1eea7509b79253d413534317d808316a499ff267e34810  favicon.ico
```

- [ ] **Step 3: Audit the final diff and repository status**

```bash
git diff HEAD~3 -- index.html assets/site.css tests/site-content.test.mjs tests/site-style.test.mjs README.md
git status --short
```

Expected: the implementation diff is limited to the five planned files. The pre-existing untracked `.DS_Store` may still appear and must remain unmodified and uncommitted. `.nojekyll`, `CNAME`, and all retained image assets must not appear in the diff.

- [ ] **Step 4: Re-read the page as a first-time visitor**

Confirm the argument lands in this order without relying on internal knowledge:

1. Acompa states a consequential mission.
2. The exact vision defines the destination.
3. Four evidence-led biographies establish why the undertaking is credible.
4. The premise shift explains responsibility for everyone, beyond episodic visits.
5. Three promises explain the enabling platform; voice appears across the system.
6. Four value movements preserve all eight commitments.
7. The exact vision returns as the closing destination with a restrained invitation.

Reject the implementation if it reads like a conventional global-health NGO, an overhyped AI startup, or a founder resume page, even if the static tests pass.
