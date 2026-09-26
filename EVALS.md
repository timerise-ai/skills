# Agent evals

The newest agent eval of every skill that builds code, one row per skill and agent. A run installs the skill
into an empty Next.js App Router app, gives the agent the first prompt in the skill's `evals/prompts.md` and
no further help, then type-checks, builds and tests what the agent left. [STANDARD.md](STANDARD.md), section
10, says how a run is made; each skill's `evals/` folder holds every run with the notes of the person who ran
it.

Checks are typecheck, build and tests: `pass`, `fail`, or `none` when the agent left no tests.

| Skill | Agent | Result | Checks | Skill version | Date |
|---|---|---|---|---|---|

No runs yet. Prompts are written for `blog-markdown`, `bookable-events`, `booking-kiosk`,
`browser-extension-connector`, `digital-signage`, `ecommerce-process-mining`, `help-center-markdown`,
`island-mode-server`, `ksef`, `ledger-wallet`, `site-pin-gate`, `slack-ai-bot`, `stripe-connect-subscriptions`
and `visit-logger`.
