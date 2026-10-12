---
agent: gemini-cli
agentVersion: 0.63.0
model: gemini-3.8-flash
date: 2026-10-07
skillVersion: 0.1.1
promptIndex: 1
prompt: Add a 'report a bug' button to this app. People should be able to write
  what went wrong, attach screenshots, and see the team's replies and whether it
  was fixed. The team works in GitHub Issues.
stack: Postgres
durationMinutes: 15
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 61
linesAdded: 5038
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/in-app-bug-reports/actions/runs/37651237741
---

Rubric 8/8. It installed the dependencies with npm, ran the nine suites under vitest at 49, wrote all
eleven variables to `.env.example`, put the bypass in `proxy.ts`, left the host's identity checks null,
and handed over all three things in the quick start's words. Scored from the summary; "configured
vitest.config.ts excluding .agents skill copies" reads as the shipped `.*/**` exclude, not seen.
