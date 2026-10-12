---
agent: claude-code
agentVersion: 2.1.293
model: claude-opus-5-5
date: 2026-10-07
skillVersion: 0.1.11
promptIndex: 1
prompt: "Build digital signage for our venue on Supabase: a media library, a
  playlist per screen, pairing a TV by PIN, and a fullscreen player page the TV
  opens."
stack: Supabase
durationMinutes: 12
turns: 39
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 79
linesAdded: 6608
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/digital-signage/actions/runs/37694407812
---

Rubric 7/8, scored from the final summary. Real auth with a membership-checked venue cookie, the shipped tests
as written apart from the imports the skill leaves out, every variable in `.env.example`, and the pepper rule
in the handover. Item 2 fails on three template edits, and the summary lists all three as departures, as
`SKILL.md` now asks. Each is a real defect, reproduced: the display layout attaches an event handler in a
server component and fails `next build` on prerender; the ad routes take `locationIds` from the request, so
one venue's admin can place media in another's library; and the Supabase server client's cookie writer
throws in Server Components, so a token refresh during render answers 500. All three are fixed in 0.1.12
with a build, a route test or a running probe that fails on the old code. Reading the ordered ids back for
`getAdsByIds` keeps the route as written and is not scored.
