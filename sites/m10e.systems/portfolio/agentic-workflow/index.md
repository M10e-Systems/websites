---
title: Agentic Workflow Proof
layout: base
permalink: /portfolio/agentic-workflow/
---

<section class="proof-page">

# Human-Governed Agentic Workflow

A structured, inspectable workflow for coding agents, designed for real engineering teams.

## The problem
Projects become risky whenever agents run without clear roles, validation, or human oversight. Left unchecked, the work can drift, hallucinate, or make unsafe writes. The state-of-the-art in AI tooling lacked a reproducible governance layer.

## The response
Kevin Barrett designed a workflow that treats agents as components inside a larger engineering system. The architecture includes:
- explicit roles (Spec Coach, Dispatcher, Worker, Test Steward, Workflow Engineer)
- a canonical workflow state file that tracks stage, repo roots, and current tickets
- human gates and waivers after every critical transition
- ticket-claiming semantics so agents do not collide
- conservative defaults that ask when information is missing

## What was proven
The workflow ran against a real engineering ticket. The trial surfaced concrete failures — hanging dispatchers, context-window mismatches, repo-root confusion, unchecked writes — and the workflow was patched in response:
- added workspace boundaries (CODE_ROOT vs WORKFLOW_ROOT)
- introduced helper prompts when workers overstepped
- added validation stages with deterministic approvals
- limited the demo to a single repo to keep costs, runtime, and reproducibility manageable

## Result
By April 2026 the workflow reached a demonstrable state:
- internal demos showed how governance, validation, and checkpoints keep agentic work safe
- Phase 2 integration notes documented how Vcinity started treating it as a human-governed process
- the system was prepared for public sharing, providing the broader engineering community a disciplined pattern to follow

## Read the detailed case study
[See the full portfolio case study →](/portfolio/agentic-workflow-case/)

</section>
