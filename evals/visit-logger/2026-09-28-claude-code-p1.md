---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.2
promptIndex: 1
prompt: "Log who opens our shared demo links: time, city, country, device and
  browser, stored in Supabase, with a Slack message the first time a customer
  opens one."
stack: Supabase
durationMinutes: 5
turns: 29
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 33
linesAdded: 3642
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/visit-logger/actions/runs/36410558921
---

Rubric 8/8, scored from the final summary (Claude Code's log carries no diff). It reports the skill's 54 tests
plus 9 of its own, keeps the canonical column names, marks staff previews `internal` from an admin cookie,
narrows the announcement to the first open inside the `announce` callback, and hands over the migration, the
pg_cron purge, the privacy-policy wording and the Vercel assumption. Two things the summary does not settle:
the edge adapter is picked by a `VISIT_EDGE` variable rather than once in code, and the `.env.example`
contents are not listed, so items 4 and 6 are held on its word.
