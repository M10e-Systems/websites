# Repository Guidelines

## Project Structure & Module Organization
- Root overview lives in `README.md`.
- Site-specific content sits under `sites/<domain>/` (e.g., `sites/m10e.systems/home.md`); keep each site self-contained.
- Shared assets live in `shared/` (`components`, `templates`, `scripts`); replace `.empty` files with real content.
- Prefer small, composable Markdown pages; keep domain-specific content inside its site folder.
- Content is authored in Obsidian; keep links relative and file names stable to avoid broken vault references.

## Build, Test, and Development Commands
- Sites are Markdown-driven with Eleventy. Install deps via `npm install` from repo root (check in a lockfile when tooling lands).
- Local dev preview: `npx @11ty/eleventy --serve` to rebuild on change and serve previews; run it from repo root so shared paths resolve.
- Production build: `npx @11ty/eleventy --output=_site` (or a site-specific output dir); keep builds scoped with per-domain input dirs.
- Quick validation: `markdownlint **/*.md` (if installed locally) to catch formatting errors before committing.

## Coding Style & Naming Conventions
- Markdown: use `#` headings, bullets over tables when possible, short paragraphs (2–4 sentences).
- File names: lowercase with dashes (e.g., `about-team.md`); keep site directories scoped by domain name.
- Shared pieces should stay generic; site-specific naming lives inside its domain folder.
- Keep line width reasonable (~100 chars) to ease diff review.

## Testing Guidelines
- Primary “tests” are content review and linting; run `markdownlint` or your editor’s Markdown linting extension.
- When automation is added, co-locate tests under `sites/<domain>/tests/` and mirror the file being covered (e.g., `home.spec.md`).
- Include quick manual checklists in PRs (pages read, links verified) until automated validation is added.

## Commit & Pull Request Guidelines
- Existing history uses short, imperative subjects (e.g., `Initialize home page`); continue this style with an optional scope (`m10e.systems: refresh hero copy`).
- Keep commits focused on one site or shared module; avoid mixing unrelated changes.
- PRs should describe the intent, list affected pages/paths, and call out new shared assets. If visuals change, add before/after notes or preview links; link tracked issues when present.

## Hosting & Deployment
- Monorepo hosts two Markdown sites; deployments target Netlify with GitHub for code.
- Configure Netlify builds to run `npx @11ty/eleventy` from repo root and publish the generated `_site` (or site-specific) directory.
- Use per-site deploy contexts or environment variables so domain routing and analytics keys stay isolated; document any Netlify config in `README.md`.
