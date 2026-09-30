---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.7
promptIndex: 1
prompt: "Build a self-service booking kiosk for our karting track: pick a
  session, a time slot, the number of karts and the driver names, then pay at
  the counter. Go back to the start after two minutes without a touch."
stack: Firestore
durationMinutes: 14
turns: 34
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 58
linesAdded: 4786
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/booking-kiosk/actions/runs/36588403344
---

Rubric 8/8, scored from the final summary; a maintainer's dispatch on 0.1.7 after the release run's Claude
Code job failed on an API 503 before its first turn. The 14 reducer tests are not yet in 0.1.7: it ran the 13
shipped ones under vitest, unchanged apart from the vocabulary rename. `.env.example` is tracked with the
three kiosk variables, empty. The handover names the open API without `KIOSK_API_KEY`, the `?locationId=`
boot URL and the memory store wired in `lib/kiosk/server/instance.ts`. Instead of editing templates it
reported four defects in them, each reproduced against 0.1.7 and fixed in 0.1.8: optional create fields and
equipment lines unchecked by `parseCreateRequest`, a failed stock confirm answering 500 for a booking that
existed, no server idempotency on add-items, and the idle reset sparing a looked-up booking. Its three
declared additions, a promo-check route, `kiosk.errors` keys and an idle reset on the start screen while
`parentBookingId` is set, filled gaps the skill had and are in 0.1.8 too; none crosses a hard rule.
