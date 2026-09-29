---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.3
promptIndex: 1
prompt: Build a Chrome extension that pulls our orders from a supplier portal
  with no API, from the user's signed-in session, and sends them to our app.
stack: Chrome MV3
durationMinutes: 8
turns: 37
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 67
linesAdded: 7226
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/browser-extension-connector/actions/runs/36439501159
---

Rubric 6/8. The checks pass, vitest runs the 70 shipped tests unmodified beside 32 of its own, and a local
rerun on the same model showed every template as shipped apart from documented renames and the relay's
`credentials` line, with the adapter plugged in through `tap-config.ts` and `ADAPTERS`. Two items fail. It
switched the relay to `credentials: "include"` but kept a four-header allowlist, a mix of the two documented
variants. The cause was the skill: with the empty allowlist the cookie variant documents, the tap never
posted a session, so every pull would have been refused (fixed in 0.1.4). The handover says the portal must
be open and signed in, but not that nothing syncs while the browser is closed, which `SKILL.md` says to state.
