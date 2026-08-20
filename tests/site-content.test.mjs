import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homepageHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
let draftHtml = "";

try {
  draftHtml = await readFile(new URL("../draft.html", import.meta.url), "utf8");
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const html = draftHtml;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

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

test("keeps the current homepage unchanged and publishes the redesign as an unlisted review page", () => {
  assert.equal(
    sha256(homepageHtml),
    "14ee8b392ae190bf332fc42ff6a15da16077d56d9dadcbead533fde522bd91e5",
    "Expected index.html to remain byte-for-byte identical to the current homepage",
  );
  assert.ok(draftHtml, "Expected the redesign to live at draft.html");
  assert.ok(
    draftHtml.includes('<meta name="robots" content="noindex, nofollow">'),
    "Expected the team-review page to stay out of search indexes",
  );
});

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
