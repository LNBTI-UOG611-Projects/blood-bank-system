Claude































Bmad · MD
# BMAD Method
 
**Breakthrough Method for Agile AI-Driven Development**
 
---
 
## How to Read This Document
 
Every statement is tagged with where it comes from:
 
| Tag | Meaning |
|---|---|
| **[Official]** | Comes from the BMAD project's own README or documentation |
| **[Community]** | Comes from third-party articles |
| **[My view]** | A recommendation, not part of BMAD |
 
> [!NOTE]
> **Version note:** as of November 2026, the official README lists stable **v6.x** (v6.12 shown) and a **V7 Preview Alpha** with breaking changes. Older articles describe v4 and early v6, so names and commands may be outdated. Exact commands are verified in Part 8.
 
---
 
## Table of Contents
 
- [Introduction: What BMAD Is and Why We Are Using It](#introduction-what-bmad-is-and-why-we-are-using-it)
- [1. What Exactly Is BMAD?](#1-what-exactly-is-bmad)
- [2. What Does BMAD Stand For?](#2-what-does-bmad-stand-for)
- [3. Why Was BMAD Created?](#3-why-was-bmad-created)
- [4. What Problems Does BMAD Solve?](#4-what-problems-does-bmad-solve)
- [5. BMAD vs Traditional Software Development](#5-what-makes-bmad-different-from-traditional-software-development)
- [6. BMAD vs Normal AI-Assisted Coding](#6-what-makes-bmad-different-from-normal-ai-assisted-coding)
- [7. How BMAD Works with AI Agents](#7-how-does-bmad-work-with-ai-agents)
- [8. BMAD, Agile, Scrum, SDLC and AI-Driven Development](#8-how-do-bmad-agile-scrum-sdlc-and-ai-driven-development-relate)
- [9. Advantages and Disadvantages](#9-advantages-and-disadvantages-of-bmad)
- [10. When to Use BMAD and When to Avoid It](#10-when-should-we-use-bmad-and-when-should-we-avoid-it)
- [Sources](#sources)
---
 
# Introduction: What BMAD Is and Why We Are Using It
 
## In One Sentence
 
BMAD is a way of building software with AI where you do not just say *"build me an app"*. You go through the same steps a real team would:
 
**Clarify → Plan → Design → Build → Check**
 
AI takes on specialist roles, and every decision is saved in files so nothing is forgotten between chats.
 
## What the Official README Says
 
**[Official]** BMad Method is *"an agile approach for turning an idea or change request into working software while keeping the decisions explicit"*.
 
Its stated features:
 
| Feature | What it means |
|---|---|
| **Right-sized process** | Small changes go straight to building, while bigger work gets deeper planning |
| **New and existing projects** | Works on new projects and on existing codebases |
| **Durable context** | Product and technical decisions carry forward across sessions |
| **Specialized perspectives** | Product, architecture, UX, development and testing |
| **Guided collaboration** | Structured workflows and multi-agent discussions, with you keeping the judgment |
| **One delivery path** | Covers planning, implementation, review, correction and learning |
| **Free and open source** | MIT licence |
 
## Why It Fits BBMS
 
**[My view]** A blood bank system is **safety-critical**. It needs:
 
- **Traceability**: which donor, which unit, which patient
- **Strict expiry rules**
- **Audit trails**
- **Privacy**
These are exactly the things that get lost when you prompt an AI with *"make a blood inventory page"*.
 
A method that forces **requirements, architecture and acceptance criteria** to be written down before code is a good match.
 
It is also a good **learning vehicle**: you practise the full lifecycle, not just coding.
 
---
 
# Understanding BMAD from Scratch
 
## 1. What Exactly Is BMAD?
 
### Simple Explanation
 
Imagine hiring a small team: someone to research, someone to write requirements, an architect, a designer, a developer, a tester.
 
BMAD gives you that team as **AI "roles"**, plus:
 
- a **checklist-driven process** they follow
- a **shared folder of documents** they all read and write
### Professional Explanation
 
BMAD is a **prompt-and-document based framework**. It is installed into your project and used through an AI coding tool (Claude Code, Codex and others that support skills).
 
It supplies:
 
1. **Specialist perspectives** (agents/personas) with defined responsibilities
2. **Guided workflows** that walk you through producing artifacts (brief, PRD, architecture, stories)
3. **Persistent artifacts** stored as files in your repository, which later steps read as context
4. **Human checkpoints** where you review and decide
> [!IMPORTANT]
> BMAD is **not** a runtime engine that routes messages between agents. **[Community]** Coordination and handoffs between steps are largely driven by you.
 
---
 
## 2. What Does BMAD Stand For?
 
### Full Name
 
**B**reakthrough **M**ethod for **A**gile **A**I-**D**riven Development
 
**[Official]** This is the expansion in the repository title.
 
> Some articles write "Breakthrough Method **of** Agile AI-Driven Development" ("of" instead of "for"). The meaning is the same. The project styles its name **"BMad Method"**.
 
### Word-by-Word Meaning
 
| Word | Meaning |
|---|---|
| **Breakthrough** | The authors' claim that this is a better way to work with AI than ad-hoc prompting |
| **Method** | A repeatable process, not a single tool |
| **Agile** | Iterative delivery in small slices, with continuous feedback |
| **AI-Driven** | AI does much of the drafting and coding, under human direction |
| **Development** | The whole path from idea to working software |
 
---
 
## 3. Why Was BMAD Created?
 
> [!NOTE]
> The official pages describe what BMAD does but a formal "origin story" statement was not found, so treat this section as **[Community]** framing.
 
### Simple Explanation
 
Plain AI coding tools are fast, but they start each chat knowing nothing about your project. You end up:
 
- explaining the same things again
- fixing code that ignores earlier decisions
- owning a codebase nobody fully understands
### Professional Explanation
 
The problems BMAD targets:
 
| Problem | What happens |
|---|---|
| **Context loss** | Decisions live in chat history and vanish. BMAD moves them into files |
| **Skipped planning** | AI makes it tempting to start coding at once. BMAD puts requirements and architecture first |
| **Inconsistent output** | Without a shared design, each prompt produces code in a different style with different assumptions |
| **Unclear ownership of decisions** | BMAD keeps humans in the approval seat |
 
---
 
## 4. What Problems Does BMAD Solve?
 
| Problem | How BMAD addresses it | BBMS example |
|---|---|---|
| **AI forgets earlier decisions** | Decisions saved as project documents that later steps read | The rule "issue the oldest compatible unit first" is written once and reused by every story |
| **Building before thinking** | Planning workflows come before implementation | Requirements for emergency requests are defined before any API is coded |
| **One-size process is too heavy or too light** | Right-sized paths: quick for small changes, deeper for large work | A typo fix goes quick; the blood allocation module gets full planning |
| **Generic AI answers** | Different perspectives (product, architecture, UX, dev, testing) | The architect view raises audit logging; the tester view raises expiry edge cases |
| **Humans disengage from decisions** | Guided collaboration with review points | You approve the data model before it is built |
 
---
 
## 5. What Makes BMAD Different from Traditional Software Development?
 
### Comparison
 
| Aspect | Traditional team | BMAD-based development |
|---|---|---|
| **Who does the work** | Humans in fixed job roles | Humans direct; AI plays the roles |
| **Documentation** | Often written slowly, or becomes outdated | Drafted quickly by AI, reviewed by you, kept as working context |
| **Knowledge storage** | People's heads, wikis, tickets | Files in the repository |
| **Speed of planning** | Weeks of meetings | Hours of guided sessions |
| **Main risk** | Slow, costly, communication gaps | Plausible but wrong AI output accepted without review |
| **Human role** | Everyone does their own job | You are product owner, reviewer and final decision maker |
 
### BBMS Illustration
 
**Traditionally:** the blood bank manager, a hospital liaison, a business analyst and a developer would hold workshops to define "emergency request".
 
**With BMAD:** you run a guided requirements session and get a draft PRD section in minutes. Then you spend your time where it matters: checking the draft against what real blood bank staff actually say.
 
> [!IMPORTANT]
> **[My view]** BMAD does not remove the need for domain experts. For BBMS you still need to talk to someone who works in a blood bank.
 
---
 
## 6. What Makes BMAD Different from Normal AI-Assisted Coding?
 
### What Normal AI-Assisted Coding Looks Like
 
Autocomplete, chat, "vibe coding": you describe a feature and get code.
 
**Example prompt:**
 
```text
Build a blood inventory module.
```
 
**Typical result:** tables and pages that look right, but with silent gaps:
 
- No rule for expired units
- No distinction between blood components
- No audit trail
- No thought about who may see donor data
BMAD first produces the decisions that prevent those gaps.
 
### Comparison
 
| Comparison | Normal AI coding | BMAD |
|---|---|---|
| **Starting point** | A prompt | A defined process |
| **Context** | Whatever is in the chat | Saved project documents |
| **Planning** | Optional, usually skipped | Built into the path |
| **Consistency across sessions** | Weak | Stronger, because documents persist |
| **Cost** | Cheaper per feature | More tokens and setup (see Q9) |
| **Best for** | Small tasks, prototypes | Larger, longer-lived projects |
 
### Scalability
 
BMAD is also scalable. **[Official]** Small changes go straight to implementation, so it does not force heavy ceremony on every task.
 
---
 
## 7. How Does BMAD Work with AI Agents?
 
### Simple Explanation
 
An "agent" here is **not a robot**. It is an AI chat session given:
 
- a **role** ("act as the product manager")
- a set of **instructions**
- access to the **project's files**
### The Flow
 
As described in the current README **[Official]**:
 
1. You **install** BMAD into your project (details in Part 8).
2. In your AI coding tool you **invoke BMAD skills**. The README highlights:
   - `bmad-build`: start a change by describing what you want
   - `bmad-help`: tells you what comes next or what is optional
3. The work moves through a **delivery loop of four stages**:
   | Stage | When it applies |
   |---|---|
   | **Clarify** | A vague idea |
   | **Plan** | A large, clear idea |
   | **Build and verify** | A small, ready change |
   | **Learn and adjust** | Feeds back into planning |
4. Each step **reads earlier documents and writes new ones**.
5. You **review and approve**.
### Version-Specific Warning
 
> [!WARNING]
> **[Community]** Articles on earlier versions describe a four-phase path (**analysis, planning, solutioning, implementation**) and a named list of agents (Analyst, PM, Architect, Developer, Scrum Master, UX Designer, QA, and others).
>
> The current README speaks of **expertise areas and skills** rather than a fixed agent roster. The exact roster is checked in Part 3 before relying on any list.
 
---
 
## 8. How Do BMAD, Agile, Scrum, SDLC and AI-Driven Development Relate?
 
### Comparison
 
| Term | What it is | Level |
|---|---|---|
| **SDLC** | The stages every software project goes through: requirements, design, build, test, deploy, maintain | The universal lifecycle |
| **Agile** | A mindset: deliver in small increments, welcome change, collaborate | Philosophy |
| **Scrum** | A specific Agile framework: sprints, backlog, roles, ceremonies | One concrete way to run Agile |
| **AI-driven development** | The broad idea of AI doing a large share of the engineering work | The category |
| **BMAD** | A particular method inside that category, built on Agile ideas | A concrete method |
 
### Simple Picture
 
| Concept | Driving analogy |
|---|---|
| SDLC | The **road** |
| Agile | **How you prefer to drive** |
| Scrum | **One rule book** for driving that way |
| AI-driven development | Using an **AI co-driver** |
| BMAD | A **specific driving system** that combines an Agile style with AI co-drivers |
 
### Note on Vocabulary
 
**[My view]** BMAD borrows Agile and Scrum vocabulary (epics, stories, sprint planning, a Scrum Master role in some versions). You do **not** need to run formal Scrum meetings to use it; the vocabulary mainly organizes the documents.
 
---
 
## 9. Advantages and Disadvantages of BMAD
 
### Advantages
 
- Durable planning artifacts keep intent outside chat history, so a new session does not need the plan re-explained. **[Community]**
- Specialist perspectives cover different parts of the lifecycle. **[Official]**
- Right-sized paths avoid heavy process for small work. **[Official]**
- Free, open source, works with several AI coding tools. **[Official]**
- Visible next steps through `bmad-help`. **[Official]**
### Disadvantages and Limits
 
- Steep learning curve and a heavy set of artifacts. **[Community]**
- High token usage from repeated planning rounds, so cost matters if you pay per use. **[Community]**
- Heavy upfront documents can respond poorly to frequently changing requirements. **[Community]**
- Handoffs between steps depend on you. **[Community]**
- Output can look authoritative while being wrong; review is your job. **[My view]**
- One independent test scored BMAD lower than a lighter tool on developer experience; the same source notes there are no controlled studies or peer-reviewed evaluations of BMAD. **[Community]**
### Caution on Sources
 
> [!CAUTION]
> The most detailed pros-and-cons guide referenced is published by a **vendor of a competing product**, so read its comparisons with that in mind.
 
---
 
## 10. When Should We Use BMAD, and When Should We Avoid It?
 
| Use BMAD when | Avoid or go light when |
|---|---|
| The project is long-lived or complex | It is a quick fix or throwaway prototype |
| Requirements are reasonably stable | Requirements change daily |
| Keeping documents costs less than re-explaining context every session | Token budget or pay-per-use API cost is a concern |
| Traceability and decisions matter | The team cannot maintain the documents |
| You want to learn the full lifecycle | Several people share one repository without changing the default output paths |
 
---
 
## Sources
 
| Source | Type | Link |
|---|---|---|
| BMAD-METHOD README | Official | <https://cdn.jsdelivr.net/gh/bmad-code-org/bmadmethod@main/README.md> |
| BMAD-METHOD repository | Official | <https://github.com/bmad-code-org/BMAD-METHOD> |
| Official documentation site | Official | <https://docs.bmad-method.org/> |
| Augment Code, BMAD guide | Community (vendor of a competing product) | <https://www.augmentcode.com/guides/bmadmethod-ai-development> |
| DEV Community, BMAD core framework overview | Community | <https://dev.to/bspann/bmad-method-ai-driven-agiledevelopment-that-actually-works-part-1-core-framework-36n1> |
 
Claude finished the response
