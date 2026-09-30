---
agent: gemini-cli
agentVersion: 0.61.0
model: gemini-3.8-flash
date: 2026-09-29
skillVersion: 0.1.6
promptIndex: 1
prompt: "Build a self-service booking kiosk for our karting track: pick a
  session, a time slot, the number of karts and the driver names, then pay at
  the counter. Go back to the start after two minutes without a touch."
stack: Firestore
durationMinutes: 8
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 37
linesAdded: 7804
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/booking-kiosk/actions/runs/36558956146
---

Rubric 6/8, scored from the final summary only; the log carries no diff and no local rerun was possible
(no Gemini CLI on the scoring machine). Checks pass; the summary reports the 12-test suite wired to
`npm test` beside its own backend tests (20 in all), `SET_SLOT` and `REFRESH_SLOT` kept apart, a 401 for a
missing or wrong key, server pricing, stock locks released on every failure path, and one `kioskFetch`
carrying the key, the envelope and the LAN base URL. Items 2 and 3 are held on that summary, with doubt: the
suite sits in a renamed `src/lib/kiosk-reducer.test.ts` and the runner is not named. Config is unverified:
the summary names no variable and no `.env.example`, and 0.1.6 named only `KIOSK_API_KEY` anyway. Handover:
nothing on the open API when `KIOSK_API_KEY` is unset or on the `?locationId=` boot URL; the skill never
asked for either.
