---
agent: claude-code
agentVersion: 2.1.300
model: claude-opus-5-5
date: 2026-10-15
skillVersion: 0.1.1
promptIndex: 1
prompt: "Add Calendly-style booking links to this Next.js app on Supabase: hosts
  set their weekly availability and event types, visitors book a free time on a
  public page, both get an e-mail with a calendar invite, and the visitor can
  reschedule or cancel from a link in that e-mail."
stack: Supabase
durationMinutes: 5
turns: 32
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 79
linesAdded: 7318
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/calendar-scheduling-links/actions/runs/38788018155
---

Rubric 8/8, scored from the JSON summary. The suite runs as shipped (57 passed, 5 skipped), `.env.example`
lists every variable empty with a `!.env.example` exception, `host.ts` is the Supabase Auth version, and
the final message names every variable with the migration, the cron with `pg_cron` on Hobby and both OAuth
registrations. Not scored: it renamed `vitest.config.ts` to `.mts` with its content unchanged, to silence
Vite's "ESM syntax in a file loaded as CommonJS" warning, which Codex's log shows too. The template is
fixed in the next release rather than scored against the agent.
