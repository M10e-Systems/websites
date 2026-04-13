---
title: "Portfolio Piece #2: AI Agentic Workflows"
layout: base
permalink: /portfolio/agentic-workflow/
---

<a href="/">← Back to the homepage</a>

# Case Study: Engineering a human-governed agentic workflow

## Overview

When AI agents started solving small engineering tasks, I didn’t celebrate autonomy; I treated the work as a workflow engineering problem. The goal was to make agentic work inspectable, accountable, and dependable, not just fast. Starting with real Vcinity tickets, the project progressed from exploration to demo prep to Phase 2 integration.

## The problem we were solving

Teams were tempted to believe modern agents could replace the rigor engineers bring to systems. Instead, I built a process that keeps human judgment in the loop:

- agents wear defined roles (Spec Coach, Dispatcher, Worker, Test Steward, Workflow Engineer)
- canonical workflow state records stage, repo, artifacts, blockers, and evidence
- every transition requires a human gate, waiver, or confirmation before moving forward
- pitfalls like missing CODE_ROOT vs WORKFLOW_ROOT, wandering prompts, or agent hangs are surfaced immediately and fixed at the workflow level

Validation is the first line of defense, not an afterthought. “Validation is SUPER-CRITICAL with AI,” and the work intentionally slows things down so every release candidate is inspected.

## Proof in a real trial

The first proving ground was messy, which made it valuable:

- a multi-repo Jira ticket exposed prompt drift, hung dispatchers, and insufficient test plans
- worker prompts were too specific; Codex ignored roles and tried to do everything, so I introduced a "workflow helper"
- the discovery that requests were defaulting to the wrong roots led to tighter repo boundaries and stricter stage semantics
- I explicitly banned agents from dumping code into the `agentic-dev` repo—it had to stay within defined scope
- cost and runtimes were real constraints (the live demo felt too long), so I deliberately shifted to a smaller, single-repo run with Codex to prove viability while keeping budgets sane

Those failures built clarity. The workflow was not theoretical—it was shaped by real friction.

## Workflow architecture and controls

1. **Human orchestrator & canonical state** – The orchestrator decides what to run, applies waivers, and keeps the workflow state (current stage, evidence artifacts, owner) as the source of truth.
2. **Autonomy controls** – Worker autonomy modes, explicit stop conditions, and a helper role keep agents from freelancing.
3. **Ticket claiming** – Agents claim tickets so collaborators do not duplicate work; the system acts like a distributed coordinator.
4. **Conservative defaults** – When information is missing, agents ask instead of guessing.
5. **Sightlines into behavior** – Artifact catalogs, validation reports, and ticket notes make intent and status auditable.

It’s engineering discipline wrapped around coding agents: “This code is solid. It’s tested. This is high quality, low risk. It’s what engineers do.”

## Outcome & momentum

By April 2026 the workflow was no longer a personal experiment. It was a live demo topic, an integration candidate for Vcinity, and a proof of how to bridge AI capability with engineering scrutiny.

- The project demonstrates systems thinking, process design, and prompt discipline that teams can adopt without rebranding themselves as “AI companies.”
- It turned ambiguous AI hype into something measurable, repeatable, and auditable.
- The workflow remains intentionally slow because safety and human ownership are the win.

If your team needs a disciplined way to let agents help without ceding control, let’s talk.

<a class="button" href="mailto:kevin@m10e.systems">Talk about your team’s systems</a>
