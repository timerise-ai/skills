# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2026-09-02

The origin rules tighten, in the index and across every skill. The repository
history starts at this release.

### Changed

- `STANDARD.md` section 2: a skill is the engineer's know-how written down, not
  a copy of any one system. Two new rules: never identify a system (no
  customer, project, brand, domain, industry detail or combination of figures
  that points at a deployment) and a list of banned words for the origin
  statement, which applies to the `SKILL.md` frontmatter description too.
  Section 1, the README footer wording in section 6 and the release checklist
  in section 8 follow.
- `README.md`: the intro, the provenance row of the layout table, the "Earned,
  not invented" property and the Contributing section state the origin in the
  same words: the modules our engineers have shipped many times, written down,
  with the defects they learned to design out.
- The skills table: every skill is re-released with its origin wording under
  the new rules. blog-markdown 0.1.3, booking-kiosk 0.1.3, digital-signage
  0.1.5, help-center-markdown 0.2.4, island-mode-server 0.1.2, ksef 1.2.3,
  stripe-connect-subscriptions 0.1.5.

## [0.5.0] - 2026-09-02

The index gains `STANDARD.md`, the specification every skill follows and the
guide for building a new one to match.

### Added

- `STANDARD.md`: what a skill is and is not; the origin and honesty rules,
  including how to name the earlier implementation and why never to write a
  denial; the repository layout; the `SKILL.md` frontmatter and body order; the
  `references/` conventions and what `adaptation.md` and `provenance.md` carry;
  the fixed README section order; the writing rules, plain punctuation and a
  110-column wrap among them; the shape of `CLAUDE.md`; the per-skill release
  standard of changelog section, release commit, `v` tag and GitHub Release;
  the steps to publish a new skill and list it here; and a pre-release
  checklist.

### Changed

- The *Contributing* section links `STANDARD.md` as the way to build a skill
  that meets the index.

## [0.4.2] - 2026-09-02

Every skill now follows one release standard, and the index records the
releases cut under it.

### Changed

- The **Version** column carries each skill's new documentation release:
  `blog-markdown` 0.1.2, `booking-kiosk` 0.1.2, `digital-signage` 0.1.4,
  `help-center-markdown` 0.2.3, `island-mode-server` 0.1.1, `ksef` 1.2.2,
  `stripe-connect-subscriptions` 0.1.4.
- The note under the table states the release standard every skill follows on
  its own version line: a `vX.Y.Z` tag, a `chore(release): X.Y.Z` commit, a Keep
  a Changelog entry in `CHANGELOG.md`, and a GitHub Release per tag carrying
  that entry. The index itself is versioned separately under the same standard.

## [0.4.1] - 2026-09-02

A documentation release: the README leads with the agent-agnostic install,
states plainly who writes the skills, and drops the typographic tells.

### Changed

- The install section opens with `npx skills add`, which installs a skill into
  every skills-compatible agent it detects; the Claude Code clone paths move
  under a *Manual install* heading, and activation gets its own heading with
  the two cross-host caveats: invoke a skill explicitly on a first run, and
  confirm its non-negotiables survived the build.
- Each skills-table row is a one-line summary, with the full feature list
  deferred to the skill's own repository. The version column is described as
  the latest release recorded in each skill's `CHANGELOG.md`.
- The origin of the skills is reworded: they are written by our own senior
  engineers from six years of building booking systems, are not synthetic, and
  are published once the engineer who owns one has proven the module in
  production. "Extracted, not invented" becomes "Earned, not invented", the
  layout table describes `provenance.md` as the defects found in our earlier
  implementations, and the contributing section no longer mentions an
  extraction audit.
- Every em-dash in the README is rewritten as a comma, colon, full stop or
  conjunction.

## [0.4.0] - 2026-09-01

`booking-kiosk` and `island-mode-server` join the index as the sixth and seventh
published skills, and the repository gets a cover, a favicon and host-compatibility
badges.

### Added

- `booking-kiosk` in the skills table, the opening list of modules, the all-skills
  clone loop, the activation examples and the slash-command list: a self-service
  touchscreen booking kiosk — stepped walk-up flow from service to confirmation,
  on-screen keyboard, inactivity auto-reset, pay-at-counter or pay-by-QR, a
  server-priced idempotent booking API with device-key auth and TTL stock locks,
  live availability refresh, a find-my-booking edit flow and a LAN failover
  contract — on a backend- and payment-agnostic `KioskBackend` seam with a
  Firestore reference implementation.
- `island-mode-server` in the same places: an on-premise fallback server — a live
  two-way RxDB replica of a site's Firestore slice, LAN takeover for kiosk and
  staff PWAs when the internet drops, reconnect flush with idempotent cloud
  ingestion, HMAC hardware auth, and systemd and nginx on-site ops.
- A repository cover image (`assets/cover.svg`, with a PNG render) at the top of
  the README, and a favicon in `assets/`.
- Badges under the title for the Agent Skills format, the skills.sh install, and
  Claude Code, Codex CLI and Gemini CLI compatibility.

### Changed

- The **Version** column now carries each skill's current release tag:
  `blog-markdown` 0.1.1, `digital-signage` 0.1.3, `help-center-markdown` 0.2.2,
  `ksef` 1.2.1, `stripe-connect-subscriptions` 0.1.3.
- The layout table notes where `island-mode-server` and `booking-kiosk` keep their
  seam contract and rules — `references/architecture.md` and the *Adaptation
  Contract* table of `SKILL.md` respectively — and that `island-mode-server`'s
  `assets/` holds its passing vitest suite.
- The README title is capitalized as **Timerise Skills**.

## [0.3.3] - 2026-09-01

The index describes the pack as Agent Skills rather than Claude Code skills. Nothing
in the skills was ever Claude-specific, and the same folders load unchanged in every
skills-compatible agent; the README now says so and documents how.

### Added

- A **Codex CLI, Gemini CLI and other agents** section under Install: why the skills
  travel — `SKILL.md` declares only `name` and `description`, and no file calls a
  model — the `~/.agents/skills` path both agents discover, the symlink that keeps a
  single clone current for every agent, and the two things that do not travel
  automatically: first-run activation and each skill's non-negotiables.
- A **One command, via skills.sh** section: the pending listing on the open Agent
  Skills directory, and the `npx skills add timerise-ai/<skill>` install that already
  resolves the repositories ahead of that listing.

### Changed

- The opening line points at the [Agent Skills](https://agentskills.io) format instead
  of the Claude Code skills documentation, and names Claude Code, Codex CLI and Gemini
  CLI as hosts rather than Claude Code alone.

## [0.3.2] - 2026-08-30

### Added

- A **Version** column in the skills table, carrying each skill's latest release
  tag — `blog-markdown` 0.1.0, `digital-signage` 0.1.2, `help-center-markdown`
  0.2.1, `ksef` 1.2.0, `stripe-connect-subscriptions` 0.1.2 — with a note that
  the skill's own repository is the authoritative copy.

## [0.3.1] - 2026-08-30

The index is checked against every published skill repository; no new skills, and
the corrections are all to what the index says about the five already listed.

### Fixed

- `stripe-connect-subscriptions` points at `timerise-ai/stripe-connect-subscriptions`,
  the canonical repository, instead of the stale `timerise-io` copy. The all-skills
  clone loop now iterates bare skill names under one organisation.
- "What every skill looks like" attributes the missing `references/adaptation.md`
  and `references/provenance.md` to `ksef` alone, and names the reference that
  carries its seam. `stripe-connect-subscriptions` has both files and no longer
  reads as an exception.
- Contributing no longer claims a `CLAUDE.md` in every repository;
  `stripe-connect-subscriptions` has none.

### Added

- An `assets/` row in the layout table for the runnable TypeScript examples `ksef`
  ships alongside its references.

## [0.3.0] - 2026-08-30

`blog-markdown` joins the index as the fifth published skill.

### Added

- `blog-markdown` in the skills table, the opening list of modules, the
  all-skills clone loop and the slash-command list: a file-based multilingual
  blog — locale-partitioned markdown posts joined by a shared translation key,
  localized slugs, tag pages, related posts, cover art, RSS, sitemap, hreflang
  and a CI content validator, with no CMS.

## [0.2.0] - 2026-08-30

`ksef` joins the index as the fourth published skill, and the layout section
stops overstating what every repository contains.

### Added

- `ksef` in the skills table, the all-skills clone loop and the slash-command list:
  KSeF API 2.0 integration for Poland's mandatory e-invoicing, on Postgres and Vercel.

### Changed

- `help-center` is renamed to `help-center-markdown` — table link, single-skill
  clone example, clone loop and slash command. GitHub redirects the old URL.
- "What every skill looks like" no longer claims `references/adaptation.md` and
  `references/provenance.md` in every repository: the integration skills carry the
  seam in `SKILL.md` plus their architecture reference, and the defect record in
  their changelog. "Extracted, not invented" now covers skills distilled from a
  vendor's own specification and corrected against production field reports.

## [0.1.0] - 2026-08-30

Initial published version of the Timerise skills index.

### Added

- README index of the Claude Code skills published by Timerise: what the pack is,
  why the skills are extracted from production modules rather than written from scratch,
  and how they fit the delivery process.
- Skills table listing `digital-signage`, `help-center` and
  `stripe-connect-subscriptions` with what each one builds and the backends it supports.
- Install instructions for cloning a single skill or all of them into
  `~/.claude/skills/`, plus how to scope a skill to one project.
- Description of the shared skill layout (`SKILL.md`, `references/adaptation.md`,
  `references/provenance.md`, `CHANGELOG.md`) and the three properties that hold
  across the pack.
- Contributing guidance and a pointer to the Timerise Toolkit repositories.
- MIT License.
- Note that more skills are published as each module stabilises.

[0.6.0]: https://github.com/timerise-ai/skills/releases/tag/v0.6.0
