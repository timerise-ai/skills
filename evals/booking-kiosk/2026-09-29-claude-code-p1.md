---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.6
promptIndex: 1
prompt: "Build a self-service booking kiosk for our karting track: pick a
  session, a time slot, the number of karts and the driver names, then pay at
  the counter. Go back to the start after two minutes without a touch."
stack: Firestore
durationMinutes: 18
turns: 69
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 42
linesAdded: 5373
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/booking-kiosk/actions/runs/36558956146
---

Rubric 6/8, scored from the final summary, read beside a local rerun of 0.1.6 on the same model (the
rerun's result is not committed). Checks pass; the 12-test suite runs under vitest, installed as a dev
dependency; a configured key makes a missing header a 401; the server prices, re-checks capacity, rejects a
bad promo and releases reserved stock on failure; the device key is injected by the page. Templates and
wiring are held on the summary. The rerun kept the reducer and the suite as written apart from the
vocabulary rename, but rewrote `checkKioskKey` with `timingSafeEqual`, as Codex did; that is doubt for this
run and the reason 0.1.7 ships the constant-time compare. Config is unverified: the summary points at a
README table and names `KIOSK_ENABLED`, `KIOSK_TIMEZONE` and `KIOSK_CURRENCY` beside the key and the LAN URL,
but no `.env.example`, and 0.1.6 named only `KIOSK_API_KEY`. Handover: it names the demo memory backend to
replace, but not the open API when `KIOSK_API_KEY` is unset or the `?locationId=` boot URL; the skill never
asked for either.
