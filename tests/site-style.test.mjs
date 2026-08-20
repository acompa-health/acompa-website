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

function cssToken(css, name) {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"));
  assert.ok(match, `Expected stylesheet to define a hex value for ${name}`);
  return match[1];
}

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((channel) => Number.parseInt(channel, 16) / 255);
  const [red, green, blue] = channels.map((channel) => (
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

test("defines the restrained Acompa palette and editorial type system", async () => {
  const css = await loadCss();
  for (const token of ["--paper", "--ink", "--deep", "--blue", "--lime", "--serif", "--sans"]) {
    assert.ok(css.includes(token), `Expected stylesheet to define ${token}`);
  }
  assert.ok(css.includes('Iowan Old Style'), "Expected a local editorial serif stack");
  assert.ok(css.includes("ui-sans-serif"), "Expected a precise system sans stack");
});

test("keeps small palette text at WCAG AA contrast on light backgrounds", async () => {
  const css = await loadCss();
  const foregrounds = [cssToken(css, "--blue"), cssToken(css, "--muted")];
  const backgrounds = [cssToken(css, "--paper"), cssToken(css, "--paper-light")];

  for (const foreground of foregrounds) {
    for (const background of backgrounds) {
      const ratio = contrastRatio(foreground, background);
      assert.ok(
        ratio >= 4.5,
        `Expected ${foreground} on ${background} to reach 4.5:1; received ${ratio.toFixed(2)}:1`,
      );
    }
  }
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
