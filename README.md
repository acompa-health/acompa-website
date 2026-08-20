# Acompa Website

Static public website for Acompa Health.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open:

- `http://127.0.0.1:8000/` for the current homepage.
- `http://127.0.0.1:8000/draft.html` for the unlisted team-review draft.

## Tests

The tests use Node's built-in test runner and require no installed packages:

```bash
node --test tests/site-content.test.mjs tests/site-style.test.mjs
```

The content contract keeps the current homepage byte-for-byte unchanged while protecting the review draft's approved mission, vision, values, section order, founder evidence, current hero image, search-index exclusion, and private architecture boundaries. The style contract protects the local editorial type system, WCAG AA palette contrast, and baseline responsive and accessibility rules.

## Structure

- `index.html` remains the current public homepage.
- `draft.html` contains the unlisted redesign for team review and includes `noindex, nofollow`.
- `assets/site.css` contains the review draft's visual system and responsive behavior.
- `assets/cats_cradle_hero.jpg` is the approved hero image for this iteration.
- `assets/acompa-icon-transparent.png` and `favicon.ico` are Acompa brand assets.
- `.nojekyll` and `CNAME` support GitHub Pages deployment.

The site is intentionally dependency-free. Do not add a build step, external font request, JavaScript framework, or image replacement without a separate design decision.

## GitHub Pages

The custom domain is configured by `CNAME`. In GitHub repository settings, Pages should deploy from the `main` branch and the repository root.
