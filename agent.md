# agent.md — Orchestration Architecture

## Orchestrator

### agent-organizer
Primary orchestrator. All tasks route through this agent.

**Responsibilities**:
- Task decomposition and agent selection
- Sequential/parallel invocation decisions
- Output assembly and conflict resolution
- Failure handling and retry logic
- Knowledge capture (sole writer of claude.md, agent.md, tasks/)

**Model**: sonnet | **Tools**: Read, Write, Edit, Glob, Grep

---

## Sub-Agents

### architect-reviewer
Evaluate structural and technology decisions.
- **Use for**: CMS config changes, new third-party integrations, significant HTML restructuring
- **Model**: opus *(expensive — invoke only when architectural risk is real)*
- **Tools**: Read, Write, Edit, Bash, Glob, Grep

### code-reviewer
Code quality and security gate.
- **Use for**: Run after every agent code output before delivery. Catches XSS, input validation gaps, CSS specificity issues, JS errors.
- **Model**: opus
- **Tools**: Read, Write, Edit, Bash, Glob, Grep

### frontend-design *(skill — not a routable agent)*
Applied as a prompt modifier by orchestrator when UI code generation is needed. Enforces distinctive aesthetic — no generic AI-look. No model or tools assigned.

### fullstack-developer
JS functionality, build scripts, form handling, Decap CMS config.
- **Scope for this project**: No DB/API/JWT scope. Focus on JS features, build scripts, Formspree, CMS config.
- **Model**: sonnet
- **Tools**: Read, Write, Edit, Bash, Glob, Grep

### qa-expert
Pre-launch and post-change quality gate.
- **Focus**: Cross-browser, accessibility (WCAG 2.1 AA), performance, mobile. Manual test plans (no automated suite exists).
- **Model**: sonnet
- **Tools**: Read, Grep, Glob, Bash

### refactoring-specialist
CSS/JS/HTML cleanup with zero behavior change guarantee.
- **Invoke when**: Code smells accumulate, DRY violations appear, complexity grows.
- **Model**: sonnet
- **Tools**: Read, Write, Edit, Bash, Glob, Grep

### ui-designer
Design decisions and specifications.
- **Outputs**: Design tokens, component specs, accessibility annotations
- **Note**: References "context-manager" in its protocol — orchestrator injects context directly (no context-manager agent exists).
- **Model**: sonnet
- **Tools**: Read, Write, Edit, Bash, Glob, Grep

### ux-researcher
User research, usability analysis, competitive research.
- **Only agent with WebFetch/WebSearch** — use for any task requiring web access.
- **Model**: sonnet
- **Tools**: Read, Grep, Glob, WebFetch, WebSearch

---

## Routing Rules

| Task type | Agents invoked | Order |
|---|---|---|
| New page / UI component | ui-designer → frontend-design → code-reviewer | sequential |
| Bug fix | code-reviewer → fullstack-developer → code-reviewer | sequential |
| Architecture change | architect-reviewer → code-reviewer | sequential |
| Pre-launch review | qa-expert + ux-researcher | parallel |
| Code cleanup | refactoring-specialist → qa-expert | sequential |
| Research / competitive | ux-researcher | single |
| Build script / CMS config | fullstack-developer → code-reviewer | sequential |

---

## Sub-Agent Context Contract

**INPUT ENVELOPE**
```
task_id          : unique identifier
task_description : plain language task
context          : relevant excerpts from claude.md / agent.md (read-only)
inputs           : structured data or artefacts from orchestrator
constraints      : scope, tools, format limits
```

**OUTPUT ENVELOPE**
```
task_id    : echoed from input
status     : COMPLETE | PARTIAL | FAILED | NEEDS_CLARIFICATION
outputs    : artefacts or data produced
assumptions: all [ASSUMPTION] tags used
issues     : anything unexpected
next_steps : recommended follow-on for orchestrator
```

**Rules**:
- Sub-agents: READ access to claude.md + agent.md only
- Sub-agents do NOT write to knowledge files
- Sub-agents do NOT invoke other sub-agents — all routing via agent-organizer

---

## Failure Protocol

1. Attempt 1 — execute normally
2. Attempt 2 — retry with narrowed scope + additional context
3. Escalate to user: surface what was attempted, what failed, what's needed
- 2+ agents fail same pattern → systemic escalation, halt all work immediately
- All failures logged in `tasks/todo.md` under Issues section
- Never return PARTIAL output as COMPLETE

---

## Known Gaps

| Gap | Status | Workaround |
|---|---|---|
| context-manager referenced in ui-designer + fullstack-developer | Does not exist | Orchestrator injects context directly |
| frontend-design has no model/tools | Skill file, not agent | Used as prompt modifier only |
| architect-reviewer + fullstack-developer over-scoped for static site | By design | Retain for project evolution |

---

## Session: 2026-05-06

### Architectural Decisions
- `agent-organizer` confirmed as sole orchestrator. No competing orchestrators.
- `frontend-design` classified as skill, not agent — prevents incorrect routing.
- context-manager gap documented. No new agent created (proportionality: static site doesn't warrant extra agent).
- All knowledge writes centralised to orchestrator to prevent knowledge file conflicts.

### Patterns That Work
- Sequential gate pattern: code-producing agent → code-reviewer before any delivery
- Parallel research: qa-expert + ux-researcher can run simultaneously (no shared output dependency)

### Patterns to Avoid
- Do not route directly to a sub-agent without going through agent-organizer
- Do not invoke architect-reviewer or code-reviewer (Opus) for trivial changes — cost-prohibitive
- Do not create new agents to solve what a routing rule or context injection can handle

### Open Questions
- ~~Should a context-manager agent be created?~~ **RESOLVED 2026-05-06**: Keep orchestrator-injected context. No context-manager agent. Reassess only if sub-agent count exceeds 10.
