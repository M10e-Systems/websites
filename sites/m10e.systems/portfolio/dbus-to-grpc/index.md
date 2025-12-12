---
title: "Portfolio Piece #1: DBus To gRPC"
---
# **Case Study: Replacing a Legacy DBus Architecture with gRPC in a Distributed Control Plane**

## **Overview**
As my team sought to evolve our platform from a single-node appliance toward a containerized, multi-namespace architecture, one thing became increasingly clear: the legacy **message bus** binding our control-plane services together had become a liability. It was single-threaded, opaque, prone to congestion when asked to carry large textual payloads, and fundamentally incompatible with the loosely-coupled, API-driven model we needed.

The CLI, in particular, suffered the most. A simple command often required:
- The user’s shell invoking the CLI client,
- The CLI client invoking the CLI service,
- The CLI service relaying requests to the control plane,
- Everything funneling through the same DBus broker.

Even on a lightly loaded system, this introduced enough serialization to look like “CLI slowness.” In a distributed deployment—or in a Kubernetes cluster—this model simply wouldn’t survive.

So I spent ten weeks developing a **proof of concept**, demonstrating that gRPC could replace DBus as the IPC backbone for the CLI stack and eventually the broader control plane.

What follows is that journey.
***
# **Why gRPC, and Why Start with the CLI?**
Two observations pushed me toward this experiment.
### **1. DBus was never meant for our use case.**
- All traffic is serialized through a single broker.
- Messages are expected to be small; we routinely shipped multi-kilobyte payloads (event/alarm dumps being the worst offenders).
- DBus assumes a shared local process space. Containers, namespaces, and pods break that assumption.
### **2. The CLI is the perfect test lab.**
The CLI Gateway Service and the CLI Client Shell already exchange structured commands, session management, and asynchronous event notifications. If I could migrate that relationship to gRPC—with feature parity and cross-container operation—it would demonstrate a viable path for the entire platform.
***
# **Step 1: Embedding gRPC Into the CLI Gateway Service**
I began by integrating a **gRPC server inside the CLI Gateway Service**, alongside its DBus code. This let me evolve the new interface without disrupting the existing system.

A few early discoveries mattered:
### **gRPC isn’t DBus**
- It uses dedicated thread pools rather than a shared main loop.
- All message shapes must be explicitly defined in `.proto` files.
- You get real multiplexing, real concurrency, and real type safety.
### **The first gRPC RPC**
My first RPC was deliberately simple—`NewSession`—served from the Gateway Service and invoked from a Python REPL:

`resp = stub.NewSession(NewSessionRequest(userId="itsme"))`

This validated:
- The server could run inside the Gateway Service,
- Multiple logical services could share one TCP port,
- I could iterate quickly without disturbing the legacy DBus path.

Once that foundation was stable, the fun began.
***
# **Step 2: Designing a Modern “Signal” System**
DBus has built-in concepts of **signals** and **properties**—asynchronous events the CLI relies on heavily. We needed the same capability on gRPC, but without reinventing DBus’s quirks.

After exploring multiple patterns, I settled on a model that was simple, scalable, and friendly to code generation:
### **Use server-side streaming RPCs as “signal channels.”**
- The client calls a single `SubscribeNotifications()` RPC,
- The server streams asynchronous notification messages back,
- Each message contains a type identifier and optional payload.

To support this, I extended our code generation tooling so that:
- Any RPC returning a stream is automatically recognized as a notification channel,
- Generated classes maintain observer lists,
- A helper function (e.g., `EventTrap_send()`) pushes notifications to all subscribers.

I validated this with a unit test that:
- Spawned a test server as a subprocess,
- Connected a client over gRPC,
- Verified request/response RPCs,
- Verified receipt of emitted notifications.

This confirmed that the gRPC-based signal model could fully replace DBus’s event semantics.
***
# **Step 3: Building a Unified IPC Library**
To avoid one-off code scattered across the system, I formalized the work into two reusable components:
### **1. Code Generation Tooling**
This tool:
- Reads the platform’s `.proto` definitions,
- Generates C++ server scaffolding,
- Generates Python client libraries,
- Adds helpers for streaming (“signal”) RPCs,
- Avoids any need for legacy XML or DBus metadata.
### **2. Unified IPC Library**
This library:
- Contains the protobuf definitions,
- Contains the generated C++ and Python code,
- Packages itself via:
    - **Conan** (for C++),
    - Python **wheel** packages (for client-side scripting and automation).
### **Packaging Challenges (and Solutions)**
Along the way, I had to solve predictable ecosystem headaches:
- **Debian Python packaging** rewrote shebangs in ways that broke container environments.  
    → Solved by using wheels and `pip3 install` instead of system packaging.
- **Conan avoids touching runtime library paths** (by design).  
    → Used the `[imports]` mechanism to place `.so` files into `/usr/local/lib` for runtime testing.
- **Keeping C++ and Python package versions in sync**.  
    → Introduced a top-level `VERSION` file that both Conan and CMake consume.

All of this was wired into **Gitlab CI**, including publishing C++ Conan packages and Python wheels to Gitlab’s package registry.

This turned the IPC layer into a real library—not an experiment.
***
# **Step 4: Running the CLI Over gRPC Across Containers**
Here’s where the PoC got exciting.

I separated the components into two Docker containers:
- **CLI Gateway Service container**  
    Runs the gRPC server, exposing the control-plane interface.
- **CLI Client Shell container**  
    Connects via TCP to the Gateway Service, invokes RPCs, receives streaming notifications.

From inside the CLI Client Shell container:

`ch = grpc.insecure_channel(f"gateway-host:{port}") resp = stub.NewSession(NewSessionRequest(userId="demo"))`

Then:
- `GetPrompt` worked,
- Basic command RPCs worked,
- Streaming notifications worked,
- And I watched prompt responses and async events flow cleanly across container boundaries.

This was the first time the CLI stack had ever run **as a distributed system**.

Some legacy features (like named pipes for on-box file transfer) obviously needed rethinking, but that was the point: gRPC let us shed old implementation assumptions.
***
# **Result: A Path to Scalability**
By the end of the ten-week PoC, the real achievement wasn’t that DBus had been “replaced.” It was that a door opened—one many of us were quietly convinced didn’t even have hinges. The CLI Gateway Service and CLI Client Shell, long assumed to be inseparable from the monolith, successfully operated as independent services, talking over gRPC across container boundaries. That single shift reframed what the entire platform could become.
### **1. Behavioral Parity Without the Bus**
The full CLI workflow—sessions, prompts, commands, and async notifications—ran cleanly over gRPC. Functional parity meant the legacy message bus was no longer a structural constraint. It was now a choice, not a fate.
### **2. The First Distributed Control-Plane Interaction**
For the first time, a control-plane-facing service and its client lived in different namespaces and behaved exactly the same as if they were co-located. That demonstrated something profound: **IPC no longer required the monolith.** Communication became location-agnostic.
### **3. Reusable Infrastructure for the Next Generation**
The Unified IPC Library, code-generation tooling, Conan packaging, Docker development environments, and Gitlab pipelines formed a repeatable pattern. Any service—current or future—could adopt gRPC without reinventing the glue. New components could be developed independently, with clear interfaces and predictable packaging.
### **4. The Monolith Stops Being the Center of Gravity**
Once the CLI broke free, it became obvious the rest of the system could follow:
- Each service could be built, packaged, and tested independently.
- IPC could cross host boundaries.
- Deployments could move toward pods, namespaces, and HA patterns.
- “One box with everything inside it” was no longer the assumption.

This wasn’t hypothetical. It was running code.
***
## **What the PoC Actually Demonstrated**
The PoC didn’t magically scale the platform overnight, but it **proved scalability was now architecturally possible.** The clean separation of services, the network-ready IPC layer, and the containerized development model together formed a clear migration path—one that simply hadn’t existed before.

In practical terms:

> **The PoC transformed scalability from an abstract wish into a concrete direction. It showed how the system could evolve, one service at a time, out of the monolith and into a distributed, future-proof architecture.**

That’s the real outcome: not just replacing DBus, but creating a way forward.
