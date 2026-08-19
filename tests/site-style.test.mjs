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
