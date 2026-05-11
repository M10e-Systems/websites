---
title: "Agentic Workflow for Software Engineering"
layout: base
permalink: /blog/agentic-workflow/
---

<a href="/blog/">← Back to the blog</a>

# Agentic Workflow for Software Engineering

This is the public release announcement for an agentic workflow built around real engineering constraints. It is not a toy, and it is not vibe coding. It is for the kinds of systems where quality matters and “let the agent try it” is not a plan.

That matters because a lot of AI-assisted development still feels like a conversation wearing a hard hat. Useful, sometimes. Engineered, not yet.

## The constraints

I built this workflow for teams working under constraints that are pretty ordinary in serious software shops:

- Large legacy codebases
- Air-gapped deployments for some systems
- Cross-repository feature coordination
- No commitment to a single model or harness
- A system-test-centric culture where unit testing is not the default
- GitFlow not assumed
- Early AI uptake: a few power users, some skeptics, no settled policy yet

I also had a few rules of my own:

- No storage of agent prompts and instructions in application repositories
- No storage of workflow artifacts in application repositories
- Dry-run first for external writes
- Human approval at the important gates
- Unit-level evidence only when making validation claims
- Escalate when uncertainty affects correctness or authority

The point is simple: the workflow says what it will do, pauses for review, and only then moves forward. That keeps the process inspectable instead of magical.

## Why this exists

Chat is fluid. Engineering work needs authority boundaries, durable state, and evidence you can stand behind.

If the only memory is the conversation, the process is already drifting. If the agent gets to act before anything is explicit, you are not really reviewing work. You are interpreting it after the fact.

The correction is boring on purpose:

- Humans approve requirements, tickets, and merges
- Agents propose and prepare, but do not decide
- Validation claims stop at the evidence actually produced
- Uncertainty triggers escalation instead of improvisation
- Artifacts, not chat history, are the system of record

That makes the workflow slower than the demo version. It also makes it legible, reviewable, and resumable.

## What this release is for

This is a Phase 1 release for people who want AI assistance without surrendering engineering discipline.

If you need:

- legacy-code safety
- constrained or air-gapped deployment support
- tool-agnostic workflow design
- artifact-first coordination
- explicit human gates

then give this workflow a try.

## Harness Note

To make the workflow runnable as it is, I used <a href="https://docs.continue.dev/guides/cli">Continue CLI</a>, an open-source harness, and the repository is in the format it expects. I've been running it in Codex with minor tweaks, and it should be easily adaptable to other harnesses. 

## Next step

The repository is public here: <a href="https://github.com/M10e-Systems/agentic-workflow">github.com/M10e-Systems/agentic-workflow</a>
