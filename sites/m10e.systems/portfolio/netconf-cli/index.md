---
title: "Portfolio Piece #3: NETCONF CLI"
layout: base
permalink: /portfolio/netconf-cli/
---

<a href="/">← Back to the homepage</a>

# Case Study: Building a Cisco-like NETCONF CLI around a dynamic configuration model

## Overview

This project started with a practical problem. We were moving away from Tail-f ConfD and its surrounding ecosystem, and while there were promising open standards and server-side components available, there was no client experience that matched what our product needed. At the time, the CLI was still the main interface into the system, and it could not be reduced to a static command shell.

The existing experience was dynamic. As configuration changed, the CLI changed with it. If an interface became Ethernet, the relevant Ethernet configuration hooks appeared. If it became optical or ATM, a different set of options became available. That behavior was central to how operators understood and configured the system, and we needed to preserve it.

I designed and built a new CLI in C++ around that requirement. It became not just a replacement interface, but a durable operational tool with a strong testing story, an extensible plugin model, and a design that others have been able to extend for years.

## The need

We knew open standards were available. The NETCONF and YANG RFCs were established, and there were open-source projects that could help on the server side. We evaluated Netopeer as a possible NETCONF server foundation, but there was no client available that matched the behavior our product depended on.

That meant the CLI had to be built.

More importantly, it had to be built in a way that respected the configuration model rather than flattening it. This was not a matter of providing a few commands to edit text. The CLI had to reflect the live structure of the system as it changed.

## The key design challenge

The essential challenge was dynamism.

The CLI had to respond to model state. Setting an interface type to Ethernet needed to expose Ethernet-specific configuration such as MTU and duplex settings. Switching that type to optical or ATM needed to surface a different set of commands. The command space was tied directly to the configuration model and the operational model behind it.

We had already spent substantial effort expressing that model in Tail-f. Recreating that behavior in a new CLI meant the design could not be shallow. The interface had to understand the schema deeply enough to make the right things available at the right time.

## Early proof and team adoption

I was able to mock up the basic idea relatively quickly and demonstrate it to the team within a few weeks. That first demo mattered because it turned the concept from an architectural hope into something concrete. The team could see that the dynamic model could be expressed in a new CLI and that we had a practical path forward.

That early response gave the project momentum. It also made clear that the CLI would not just be tolerated; it would be genuinely useful.

## Architecture and implementation

I built the CLI entirely in C++. Internally, it was organized around simple directed graphs: a schema graph and a config graph. A tool compiled the underlying model into XML, which the CLI then loaded and used to drive behavior.

That structure made it possible for the CLI to reason about both available configuration and current system state. It also gave the implementation a clean conceptual center. Rather than scattering behavior across ad hoc commands, the CLI could derive its shape from the model it was built to serve.

Along the way, I also built supporting tools within the codebase, including utilities for path manipulation and other internal operations that made the whole environment more capable and easier to extend.

## Extensibility by design

One of the parts of the project I liked most was its extensibility model.

I added a Python plugin framework so that others could extend the CLI without rewriting its core. Those plugins could perform transforms, add new commands in the form of wizards, and support other forms of customization that made the CLI more than a fixed shell.

That extensibility mattered because it changed the CLI from a one-off interface into a platform component. It allowed other engineers to keep building on top of it as the surrounding product evolved.

## Test-informed design

This was also one of the first times I made testing a central part of a project from the beginning.

Our team had system-level testing, but we were not doing much in the way of software unit testing. I had recently helped introduce some unit test support into CI, and this project gave me a chance to use that well. I would not describe the approach as strict test-driven development in the formal sense, but it was very much test-informed design. Knowing I would need to write a test changed how I wrote the code.

That influence showed up in structure, boundaries, and clarity. It pushed the implementation toward something that could be reasoned about rather than merely made to work.

## Ownership and stewardship

As the project developed, I also became the owner of the configuration model for a time. I did not consider that ideal. I tried to draw others into ownership because I did not want a single-person dependency around something so central. That effort took time, and adoption was uneven for a while, but eventually the model did become something others were willing to work in and extend.

That transition matters in retrospect. A useful system is not only one that works when its author is nearby; it is one that other people can understand, maintain, and carry forward.

## Long-term outcome

The most meaningful result is not that the CLI worked well when I handed it off. It is that it kept working.

The CLI is still in use, mostly by techs and devs and as an API back end, and going strong with only one bug report since it was handed off over five years ago — which I wholeheartedly credit to its test-driven development; I had it at greater than 70% coverage. The CLI has been extended, by others, numerous times over those years, via plugins and model changes. I’m most proud of that aspect: that it is still faithfully performing its work all these years on.

That is the real story here. The CLI was not just delivered; it endured.

## Why this case matters

This project is a good example of the kind of work I care about most: taking a real operational need, respecting the underlying model, and building something that remains understandable and useful after the initial excitement is gone.

It combined interface design, systems thinking, implementation discipline, testing, and long-term stewardship. More than that, it produced a tool that other people could continue to use and extend without having to start over.

If your team has an operational interface, workflow, or internal tool that needs to be both powerful and durable, let’s talk.

<a class="button" href="mailto:kevin@m10e.systems">Talk about your team’s systems</a>
