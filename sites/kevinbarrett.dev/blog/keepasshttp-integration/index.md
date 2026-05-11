---
title: "Codex Skill: KeePassHTTP Integration"
layout: base
permalink: /blog/keepasshttp-integration/
---

<a href="/blog/">← Back to the blog</a>

# Codex Skill: KeePassHTTP Integration

I released a custom Codex skill for reading credentials from a local [KeePass 2.x](https://keepass.info/) database through [KeePassHTTP](https://github.com/pfn/keepasshttp).

This is a narrow tool with a narrow job: local, read-only secret lookup with guardrails. It is not for dumping secrets into chat or turning your password vault into an API playground.
It's great for browser-use workflows, where your agent needs a safe way to fetch credentials without broad exposure. It can save you the headache of managing environment variables when agents so often look for secrets there.

The skill creates a one-time KeePassHTTP client association for the current machine and user profile, and reuses that association for later lookups. It reads only the password for the desired URL and keeps the scope tight.

Example:
```
Use $my-browser-use-skill to do stuff on example.com. Use $keepasshttp-secrets for login credentials.
```

If you are using Codex and want to keep your secrets safe in [KeePass2](https://keepass.info/), give it a try.

Repo: <a href="https://github.com/kpbarrett/codex-skill-keepasshttp">github.com/kpbarrett/codex-skill-keepasshttp</a>

If this looks useful, I can also turn it into shorter pointer drafts for LinkedIn, X, Facebook, Instagram, and Reddit.
