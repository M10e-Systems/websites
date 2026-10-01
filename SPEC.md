# Website Specification

## Blog post sidebar

Blog posts may opt into a page-specific sidebar through front matter. The
sidebar must:

- render beside the article on wider screens;
- move below the article on narrow screens;
- use semantic `aside` markup with an accessible heading;
- preserve the article's Markdown as the primary reading path; and
- support a concise, copyable one-prompt setup without requiring JavaScript.

The custom site styles must respect the site's `prefers-color-scheme` behavior,
including the dark theme provided by Simple.css.

Existing pages must retain the deployed Simple.css baseline. Blog-post layout
styles are scoped to blog-post pages so the sidebar does not alter the global
header, typography, spacing, or highlight colors.

The durable-chatbot-memory post uses the sidebar to present a one-prompt
bootstrap for locating, reading, and updating an external runbook. The prompt
must distinguish current-task instructions from durable defaults and must not
encourage speculative runbook edits.

Validation requires building both configured Eleventy sites successfully with
`make test`.
