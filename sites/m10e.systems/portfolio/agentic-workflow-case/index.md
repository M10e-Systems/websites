---
title: AI Agentic Workflow Case Study
layout: base
permalink: /portfolio/agentic-workflow-case/
---

# AI Agentic Workflows — Case Study

Maintainable, human-governed design for AI-assisted engineering.

## Context
The goal was to move beyond ad hoc prompting and treat agentic work like any other engineering system: define roles, enforce workflow state, capture artifacts, and keep humans in control.

## Problem
Unbounded agents hallucinate, change the wrong files, and create fragile outputs. Engineering teams need traceability, accountability, and predictable behavior, not magic.

## Design
Details from the portfolio brief:
- multi-agent role structure with workflow state and human gates
- ticket-claiming to prevent collisions
- explicit workspace boundaries and conservative defaults
- structured evidence, validation, and waivers before every critical write

## Trials
Iterated through multiple runs against real engineering tickets:
- dispatcher hangs revealed context-window mismatch risks
- multi-repo demos proved too costly and were replaced with a single repo proof-of-concept
- prompts were adjusted to enforce role adherence and evidence capture
- autonomous decisions were constrained via helper prompts and human escalation cues

## Iterations
Every observed failure led to a workflow change:
- added human-orchestrator procedure
- clarified CODE_ROOT vs WORKFLOW_ROOT semantics
- introduced worker helper roles and ticket claiming
- bias toward asking questions when data was missing

## Outcome
The workflow stopped pretending to be fast. It slowed things down intentionally, letting humans validate each stage. It became a reusable pattern that could be presented internally, integrated into corporate processes, and published for the broader software community.

## Next steps
The workflow is being prepared for a public GitHub release, offering engineering teams a sane starting point for human-governed agentic development.

For the full portfolio narrative, refer to `projects/m10e-systems/portfolio-agentic-workflow.md` in the workspace.
