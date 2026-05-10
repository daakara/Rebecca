# tasks/lessons.md

## Session: 2026-05-06

### L001 — Skill vs Agent Distinction
`frontend-design.md` has no `model` or `tools` in frontmatter — it is a skill/prompt guide, not a routable agent. If a `.md` file lacks model/tools, classify as skill and use as prompt modifier, not as a sub-agent routing target.

### L002 — Missing Context-Manager
`ui-designer.md` and `fullstack-developer.md` both reference a "context-manager" in their JSON communication protocols. This agent does not exist. Workaround: orchestrator injects context directly into input envelope. Do not assume context-manager exists without verifying file presence.

### L003 — Scope Proportionality
Over-scoped agents (fullstack-developer referencing DB schemas, JWT, WebSockets; architect-reviewer using Opus) retained for future evolution but invoked narrowly. Always assess actual project complexity before invoking expensive or over-scoped agents.

### L004 — Knowledge File Ownership
Only `agent-organizer` (orchestrator) writes to `claude.md`, `agent.md`, `tasks/todo.md`, `tasks/lessons.md`. Sub-agents must not write to these files. Violating this creates conflicting state.

### L005 — Opus Cost Guard
`architect-reviewer` and `code-reviewer` use Opus model. Invoke only for genuinely high-risk or complex decisions. For routine code changes on a static site, skip or substitute with a sonnet-tier review.
