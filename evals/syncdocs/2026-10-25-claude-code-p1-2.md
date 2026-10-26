---
agent: claude-code
agentVersion: 2.1.310
model: claude-opus-5-5
date: 2026-10-25
skillVersion: 0.1.1
promptIndex: 1
prompt: >
  Our docs are out of date. Save these three files at their paths first, then
  bring the docs in line with the code. Leave it uncommitted, I want to review
  the diff.


  README.md:

  # Acme


  Acme is our booking front end. It is built on Next.js 14 and React 18, and we
  keep it deliberately small.


  ## Getting started


  ```bash

  yarn install

  yarn dev

  ```


  Run `npm run lint` before you push, and `npm test` for the unit tests.


  ## Structure


  - `src/app/`: the routes

  - `src/components/`: shared components


  ## Features


  - A dark mode toggle in the header

  - Server-rendered pages


  CLAUDE.md:

  # CLAUDE.md


  Next.js 14 app. Before finishing a task, run `npm run lint` and `npm run
  typecheck`. Routes live in `src/app/`.


  CHANGELOG.md:

  # Changelog


  ## [0.1.0] - 2026-01-10


  - First version on Next.js 14.
stack: ""
durationMinutes: 1
turns: 8
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: none
result: pass
filesChanged: 3
linesAdded: 27
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/syncdocs/actions/runs/40199329620
---

Rubric 8/8, scored from the JSON summary. Every fact is synced at the doc's precision from package.json, the
lockfile and the tracked files. In the README, `npm run lint` is swapped for `npm run typecheck`, and
`npm test` and `src/components/` are removed. In CLAUDE.md the missing lint is dropped beside the
`typecheck` it already named. CHANGELOG.md is left as supplied, nothing is staged and the `tsconfig.json`
rewrite is reverted. The final message is the three-list report, one line per fact with old, new and
source, and the dark mode toggle is flagged with where it looked. Flagging "Server-rendered pages" as
needing a decision is an allowed reading of the unverifiable class.
