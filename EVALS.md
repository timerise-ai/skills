# Agent evals

Each skill is run through coding agents on a fresh Next.js App Router app with only that skill
installed: the agent gets one of the prompts in the skill's `evals/prompts.md`, works unattended,
and the app is then type-checked, built and tested. Nothing is fixed by hand before the checks.
The harness is [`eval/`](eval) and [`agent-eval.yml`](.github/workflows/agent-eval.yml); each skill
runs it on every release. This file is regenerated from the skill repositories by
[`collect-evals.yml`](.github/workflows/collect-evals.yml); the copies are in [`evals/`](evals).

Checks: typecheck / build / tests. ✓ passed, ✗ failed, – the agent left no tests.

| Skill | Agent | Model | Result | Checks | Skill version | Prompt | Run |
|---|---|---|---|---|---|---|---|
| [`site-pin-gate`](https://github.com/timerise-ai/site-pin-gate) | Gemini CLI | `gemini-3.8-flash` | Built, checks pass | ✓ / ✓ / ✓ | 0.3.7 | 1 | [2026-09-27](https://github.com/timerise-ai/site-pin-gate/blob/main/evals/2026-09-27-gemini-cli-p1-7.md) |
| [`site-pin-gate`](https://github.com/timerise-ai/site-pin-gate) | Codex CLI | `gpt-6-astra`, high | Built, checks pass | ✓ / ✓ / ✓ | 0.3.7 | 1 | [2026-09-27](https://github.com/timerise-ai/site-pin-gate/blob/main/evals/2026-09-27-codex-p1-7.md) |
| [`site-pin-gate`](https://github.com/timerise-ai/site-pin-gate) | Claude Code | `claude-opus-5-5` | Built, checks pass | ✓ / ✓ / ✓ | 0.3.7 | 1 | [2026-09-27](https://github.com/timerise-ai/site-pin-gate/blob/main/evals/2026-09-27-claude-code-p1-7.md) |
| [`visit-logger`](https://github.com/timerise-ai/visit-logger) | Gemini CLI | `gemini-3.8-flash` | Built, checks pass | ✓ / ✓ / ✓ | 0.1.2 | 1 | [2026-09-28](https://github.com/timerise-ai/visit-logger/blob/main/evals/2026-09-28-gemini-cli-p1.md) |
| [`visit-logger`](https://github.com/timerise-ai/visit-logger) | Codex CLI | `gpt-6-astra`, high | Built, checks pass | ✓ / ✓ / ✓ | 0.1.2 | 1 | [2026-09-28](https://github.com/timerise-ai/visit-logger/blob/main/evals/2026-09-28-codex-p1.md) |
| [`visit-logger`](https://github.com/timerise-ai/visit-logger) | Claude Code | `claude-opus-5-5` | Built, checks pass | ✓ / ✓ / ✓ | 0.1.2 | 1 | [2026-09-28](https://github.com/timerise-ai/visit-logger/blob/main/evals/2026-09-28-claude-code-p1.md) |
