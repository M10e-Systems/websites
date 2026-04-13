---
title: "Portfolio Piece #1: DBus To gRPC"
layout: base
permalink: /portfolio/dbus-to-grpc/
---

<a href="/">← Back to the homepage</a>

# Case Study: Replacing a Legacy DBus Architecture with gRPC in a Distributed Control Plane

## Overview

As the platform moved from a single-node appliance toward a containerized, multi-namespace architecture, the legacy message bus that held the control plane together had become a liability. It serialized everything through a single broker, expected small messages, and assumed local co-location. That model did not fit where the product was going.

The CLI felt the pressure first. A simple command had to move through the shell, the client, the gateway service, and the DBus broker before it reached the control plane. Even on a quiet system, that was enough to make the CLI feel sluggish. In a distributed deployment, it would not hold up.

So I spent ten weeks proving that gRPC could replace DBus as the IPC backbone for the CLI stack and, eventually, the broader control plane.

## Why gRPC, and why start with the CLI?

DBus was a poor fit for the future we were trying to build. It was local, brokered, and awkward with the kinds of payloads we were already moving. At the same time, the CLI was the best proving ground because it exercised request/response, session handling, and asynchronous notifications in one place.

If the CLI could work over gRPC with feature parity and cross-container operation, the broader platform had a believable migration path.

## Step 1: Embedding gRPC into the CLI gateway service

I started by putting a gRPC server inside the CLI Gateway Service alongside the existing DBus code. That let me evolve the new interface without disturbing the old one. The first RPC was deliberately simple: `NewSession`.

That early work proved a few important things:

- the server could run inside the gateway service
- multiple logical services could share one TCP port
- iteration could stay fast without breaking the legacy path

Once the foundation was stable, I moved on to the harder parts.

## Step 2: Recreating DBus-style signals with streaming RPCs

DBus had built-in signals and properties, and the CLI depended on them heavily. Rather than pretending those semantics did not matter, I designed a gRPC model that could preserve them.

The answer was server-side streaming RPCs used as notification channels. The client subscribed once, the server streamed asynchronous events back, and the code generation layer handled the plumbing that made the pattern repeatable.

That work mattered because it solved the semantic gap instead of ignoring it.

## Step 3: Building reusable infrastructure

I did not want a one-off demo. I wanted infrastructure the rest of the team could use.

That led to a unified IPC library and code-generation tooling that:

- read the `.proto` definitions
- generated C++ server scaffolding
- generated Python client libraries
- packaged the result for both C++ and Python consumers
- fit into CI and publishing workflows

Along the way I solved the predictable packaging problems that show up when software has to move across tooling boundaries. The result was a real library, not a proof-of-concept that only worked on the author’s machine.

## Step 4: Running the CLI across containers

The cleanest proof came when I split the CLI Gateway Service and CLI Client Shell into separate containers and let them talk over gRPC.

That was the first time the CLI stack had ever run as a distributed system.

Basic command RPCs worked. Prompt responses worked. Streaming notifications worked. The important thing was not just that the pieces ran; it was that the old same-machine assumption was no longer a hard requirement.

## What the PoC actually demonstrated

The PoC did not magically replace DBus everywhere. What it did prove was that a once-local control-plane interaction could become location-agnostic.

That changed the architecture in a real way:

- the CLI could be built and tested independently
- IPC could cross host boundaries
- deployments could move toward pods, namespaces, and HA patterns
- the monolith stopped being the center of gravity

That is the real win. Not a transport swap, but a believable path out of the monolith.

## Coda

The CLI is still in use, mostly by techs and devs and as an API back end, and going strong with only one bug report since it was handed off over five years ago — which I wholeheartedly credit to its test-driven development; I had it at greater than 70% coverage. The CLI has been extended, by others, numerous times over those years, via plugins and model changes. I’m most proud of that aspect: that it is still faithfully performing its work all these years on.

If your team is trying to unwind a legacy IPC layer without losing the behavior people depend on, let’s talk.

<a class="button" href="mailto:kevin@m10e.systems">Talk about your team’s systems</a>
