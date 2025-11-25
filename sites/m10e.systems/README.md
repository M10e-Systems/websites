# m10e.systems – Eleventy Notes

Styling: the site uses [Simple.css](https://simplecss.org) plus a local `m10e.css` (already seeded with root variables). Keep `m10e.css` as the place for overrides so Markdown stays clean in Obsidian.

Minimal Eleventy setup:
- In `.eleventy.js`, passthrough-copy the stylesheet: `eleventyConfig.addPassthroughCopy("sites/m10e.systems/m10e.css");`
- Point the input/output to this site: `dir: { input: "sites/m10e.systems", output: "_site/m10e.systems" }`
- Use a shared layout (e.g., `shared/templates/base.njk`) or create one under `sites/m10e.systems/_includes/` with the following `<head>` links:

```njk
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title or "M10e Systems" }}</title>
  <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
  <link rel="stylesheet" href="/m10e.css">
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

Authoring: edit `index.md` (and future pages) in Obsidian; avoid HTML-fragment styling in Markdown so the layout stays reusable. If you add front matter, set `layout: base` (or your chosen layout name) and optionally `title: M10e Systems`.
