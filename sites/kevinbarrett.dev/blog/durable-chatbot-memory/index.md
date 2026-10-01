---
title: "Give Your ChatGPT Project a Runbook It Can Update"
layout: blog-post.njk
sidebar_title: "One-prompt setup"
sidebar_intro: "Paste this into a chat in your Project when you are ready to set this up. Specify the Google Drive plugin (or your preferred cloud account) with the prompt. Replace the existing Project instructions with the updated instructions requested by the prompt."
one_prompt: |
  Start maintaining durable Project instructions in Google Drive, so they can be modified on the fly. Output current Project instructions in a format you can easily understand and update. Write the file to `/Agents/<Project Name>/`, then produce new instructions that will tell future agents and chatbots to search there for their source of truth.
---

# ChatGPT Projects As Learning Agents

I use ChatGPT’s memory, but I don’t entirely trust it to remember the same things I think are important. A conversation may contain twenty facts, three decisions, two mistakes, and one operational lesson that I absolutely do not want to rediscover next Tuesday.

How many times have you told a chatbot, "This is important. Remember this for later," and gotten some cheerful variation of "Done!" -- only to discover later that, for all practical purposes, nothing was done? The model may remember it. It may not. More importantly, I don’t have a good way to inspect what it decided was worth keeping.

So I’ve started giving some of my longer-running ChatGPT Projects an explicit place to remember things. More importantly, I let the chatbot update it as we learn.

## Who this is for

This pattern is probably overkill if you use a Project for occasional questions or if its instructions fit comfortably on an index card. Put the instructions in the Project and get on with your life.

It starts becoming useful when you return to the same Project repeatedly and the workflow begins accumulating knowledge. Maybe you discover that one field means something different than you thought, that a particular error requires preserving some artifacts before retrying, or that one source should always override another. Before long, you find yourself saying, "Remember that next time."

That is the point where I want something stronger than "hopefully memory remembers this."

## The pattern

The basic arrangement is simple. I keep a small bootstrap instruction in the ChatGPT Project, while the real operating instructions live in a document the chatbot can both read and update.

Mine currently live in Google Drive, in a hierarchy resembling:

`/Agents/Research/Research  --  Agent Operating Instructions`

The Project itself contains an instruction roughly like this:

> At the beginning of a new conversation, locate the operating-instructions document for this Project and read it before doing any work. Treat it as the durable source of truth for the workflow. When we learn something that should affect future work, update the document.

There are three layers. The **bootstrap** tells ChatGPT where the instructions live, when to load them, and which source has authority. It changes rarely.

The **runbook** contains workflow rules, preferences, known failure modes, decision criteria, useful links, and lessons learned. It changes as the workflow changes.

Finally, the **current conversation** contains whatever I am trying to accomplish today. Those instructions can override the normal procedure when appropriate.

I also make the precedence explicit: current task instructions beat durable defaults; the runbook contains the durable procedure; the Project instructions bootstrap access to the runbook; old chats and ChatGPT memory are supporting context rather than the canonical copy. Otherwise, eventually there are several versions of "the rule" floating around and the model gets to conduct a small archaeological expedition before doing anything useful.

## The important part: the chatbot updates it

Putting instructions in Google Drive is convenient. Letting the chatbot maintain them is the interesting part.

Suppose a workflow begins with a rule based on an assumption that later turns out to be wrong. Once we figure out the real behavior, I can tell the chatbot that this is a durable lesson and have it update the runbook. The next conversation starts with the corrected procedure instead of the original assumption.

In one recurring workflow, for example, I work with tasks supplied by an external system. The system shows a timer while a task is open, and I originally treated that timer as something like a soft completion deadline.

Eventually I learned that it was closer to a reservation timer. I could continue working after it expired, but the task could also return to a shared pool and disappear before I came back. Well, that changes things.

So the runbook acquired a rule along these lines:

> Treat the task timer as the remaining period of guaranteed access. If it will expire before the next planned work session, warn that the task may no longer be available when work resumes.

That is exactly the kind of fact I do not want buried in one old conversation. It is also not really a fact *about me*, which makes personal memory an odd place for it. It is institutional knowledge about how the workflow operates, so it belongs in the workflow’s runbook.

The same applies to failure recovery. If we discover that a particular failure should always cause us to preserve two files before retrying, that belongs there. If I learn that one workflow works much better when the chatbot gives me one subtask at a time, that can go there too.

Over time, the document becomes institutional memory for the human-and-chatbot system.

## Telling ChatGPT what to remember

This has changed how I think about chatbot memory. ChatGPT’s normal memory is useful precisely because I do not have to curate every useful detail myself.

But some information is too operationally important for me to delegate the decision about whether it matters. If we spend forty minutes discovering that a particular recovery sequence prevents lost work, I want to be able to say, in effect, "This one. Keep *this*." If I decide that one document is authoritative and another is merely background, that distinction should not depend on whether the memory system happens to elevate it later.

The runbook lets me choose what deserves to become durable. Memory helps ChatGPT remember what has happened; the runbook records what we have decided matters for how we work.

There is another useful difference: I can inspect it. I can open the document and see what the chatbot thinks the rules are, correct something that is wrong, reorganize it when it becomes messy, or delete a rule that has outlived its usefulness.

That visibility matters to me almost as much as the memory itself.

## A useful middle ground in ChatGPT Projects

This works particularly well with ChatGPT Projects because I do not need to build a custom agent system to get much of the benefit. A Project already gives me a persistent place for project-specific instructions and context, and with Google Drive connected I can have a new conversation retrieve the current runbook before beginning.

The result feels noticeably more agent-like. It is still a chatbot: it does not suddenly gain permission to operate arbitrary software, run indefinitely, or do everything that Work or Codex can do. But quite a few workflows do not actually require any of that.

Sometimes I just need a capable chatbot that knows the procedure, remembers mistakes we have already made, and starts the next conversation knowing what we learned last time. A maintained external runbook gets surprisingly close.

There is a practical benefit as well. Regular Chat usage is separate from the heavier Work/Codex agentic allowance, so I can reserve those tools for jobs that actually require their additional capabilities instead of consuming that budget simply to get continuity and operating discipline.

For me, this has become a useful middle tier: more structured and persistent than an ordinary chat, without reaching for a full agent every time.

## Don’t let it rewrite its constitution after every clever thought

There is an obvious catch. If the chatbot can update its own operating instructions, it can also confidently write down something stupid.

So I do not treat every observation as a new durable rule. A runbook change should represent something we actually learned: a documented policy, a repeated preference, a diagnosed failure, or an explicit decision.

It also helps if a rule preserves enough context to explain why it exists. Google Docs gives me revision history; for more consequential workflows, I could imagine putting the same pattern in a repository with normal version control and review.

The point is not to let the model rewrite its personality every time it has an idea. The point is to give the human-and-chatbot team a maintainable body of institutional knowledge.

## A runbook, not a bigger prompt

I originally approached durable Project behavior mostly as a prompt-writing problem: keep adding instructions until the chatbot behaves correctly. That works for a while, but it turns the Project instructions into an accumulating pile of rules, exceptions, and historical debris.

I like this model better. The Project contains a small bootstrap, the runbook contains what we have learned, and the current conversation contains what we are doing now. As the workflow changes, the runbook changes with it.

That means I am no longer asking ChatGPT’s memory to guess which operational details I care about most. I can tell it what matters -- and when the chatbot learns something useful, it has somewhere to write it down.
