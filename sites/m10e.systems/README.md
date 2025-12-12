# m10e.systems – Eleventy Notes

Styling: the site uses a local `m10e.css` (typography, layout, and components). Keep `m10e.css` as the place for styling so Markdown stays clean in Obsidian.

Minimal Eleventy setup:
- In `.eleventy.js`, passthrough-copy static assets: `m10e.css`, `m10e.png`
- Point the input/output to this site: `dir: { input: "sites/m10e.systems", output: "_site/m10e.systems" }`
- Use a layout under `sites/m10e.systems/_includes/` and include the site stylesheet:

```njk
{% raw %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{% if title %}{{ title }} | {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>
  <link rel="stylesheet" href="/m10e.css">
</head>
<body>
  {{ content | safe }}
</body>
</html>
{% endraw %}
```

Authoring: edit `index.md` (and future pages) in Obsidian; avoid HTML-fragment styling in Markdown so the layout stays reusable. If you add front matter, set `layout: base` (or your chosen layout name) and optionally `title: ...`. Site-level defaults live in `sites/m10e.systems/_data/site.json`.
