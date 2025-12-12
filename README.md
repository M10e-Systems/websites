# M10e Systems – Websites

This repository hosts the content and build configuration for the
public-facing websites associated with the M10e Systems brand.

Sites included:
- kevinbarrett.dev
- m10e.systems

Each site has its own build settings and deployment pipeline.

## Netlify configuration

This repo is intended to back two separate Netlify sites (two Netlify projects)
pointing at the same GitHub repository.

### m10e.systems

Netlify UI → Site configuration → Build & deploy:
- Base directory: (empty)
- Build command: `npx @11ty/eleventy --config=.eleventy.js`
- Publish directory: `_site/m10e.systems`

### kevinbarrett.dev

Netlify UI → Site configuration → Build & deploy:
- Base directory: (empty)
- Build command: `npx @11ty/eleventy --config=.eleventy.kevinbarrett.dev.js`
- Publish directory: `_site/kevinbarrett.dev`
