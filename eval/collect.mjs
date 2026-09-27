#!/usr/bin/env node
/**
 * Copies every skill's agent eval results into this index: evals/<skill>/*.md
 * mirrors each skill repository's evals/ folder (prompts.md aside), and
 * EVALS.md summarises the newest run per skill and agent.
 *
 *   node eval/collect.mjs            # from the repository root
 *
 * Reads the public skill repositories only, so it needs no write access
 * anywhere but here. GITHUB_TOKEN, when set, only raises the API rate limit.
 * The skill repositories stay the authoritative copy: a file removed there is
 * removed here on the next run.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { readFrontmatter } from "./run.mjs";

const ORG = "timerise-ai";
const INDEX_REPO = "skills";
const ROOT = process.cwd();
const OUT = path.join(ROOT, "evals");

const AGENT_NAMES = { "claude-code": "Claude Code", codex: "Codex CLI", "gemini-cli": "Gemini CLI" };
const RESULT_LABELS = { pass: "Built, checks pass", partial: "Builds, tests fail", fail: "Did not build" };
const CHECK_MARKS = { pass: "✓", fail: "✗", none: "–" };

async function api(url) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "timerise-ai skills collect" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(url, { headers });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response;
}

async function listRepos() {
  const response = await api(`https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public`);
  const repos = await response.json();
  return repos
    .filter((repo) => !repo.archived && repo.name !== INDEX_REPO)
    .map((repo) => repo.name)
    .sort();
}

/** The result files in a skill's evals/ folder, or null when it has none. */
async function listEvals(repo) {
  const response = await api(`https://api.github.com/repos/${ORG}/${repo}/contents/evals`);
  if (!response) return null;
  const entries = await response.json();
  return entries.filter(
    (entry) => entry.type === "file" && entry.name.endsWith(".md") && entry.name !== "prompts.md",
  );
}

async function mirror(repo, files) {
  const dir = path.join(OUT, repo);
  await mkdir(dir, { recursive: true });
  const keep = new Set(files.map((file) => file.name));
  for (const name of await readdir(dir)) {
    if (!keep.has(name)) await rm(path.join(dir, name));
  }
  const runs = [];
  for (const file of files) {
    const text = await (await api(file.download_url)).text();
    await writeFile(path.join(dir, file.name), text);
    runs.push({ ...readFrontmatter(text).data, file: file.name, repo });
  }
  return runs;
}

/** The day's run number: `...-p1.md` is 1, `...-p1-2.md` is 2. Text order would put 1 after 2. */
const runNumber = (file) => Number(file.match(/-p\d+-(\d+)\.md$/)?.[1] ?? 1);

/** The newest run per agent: by date, then run number within the day; first one wins. */
function latestPerAgent(runs) {
  const sorted = [...runs].sort(
    (a, b) =>
      String(b.date).localeCompare(String(a.date)) ||
      runNumber(b.file) - runNumber(a.file) ||
      b.file.localeCompare(a.file),
  );
  const seen = new Set();
  return sorted.filter((run) => {
    if (seen.has(run.agent)) return false;
    seen.add(run.agent);
    return true;
  });
}

/** The model the run reports, with the reasoning effort when there is one. */
const model = (run) =>
  run.model ? `\`${run.model}\`${run.reasoningEffort ? `, ${run.reasoningEffort}` : ""}` : "not recorded";

function summary(bySkill, waiting) {
  const lines = [
    "# Agent evals",
    "",
    "Each skill is run through coding agents on a fresh Next.js App Router app with only that skill",
    "installed: the agent gets one of the prompts in the skill's `evals/prompts.md`, works unattended,",
    "and the app is then type-checked, built and tested. Nothing is fixed by hand before the checks.",
    "The harness is [`eval/`](eval) and [`agent-eval.yml`](.github/workflows/agent-eval.yml); each skill",
    "runs it on every release. This file is regenerated from the skill repositories by",
    "[`collect-evals.yml`](.github/workflows/collect-evals.yml); the copies are in [`evals/`](evals).",
    "",
    "Checks: typecheck / build / tests. ✓ passed, ✗ failed, – the agent left no tests.",
    "",
    "| Skill | Agent | Model | Result | Checks | Skill version | Prompt | Run |",
    "|---|---|---|---|---|---|---|---|",
  ];
  for (const [repo, runs] of bySkill) {
    for (const run of latestPerAgent(runs)) {
      const checks = run.checks ?? {};
      const marks = ["typecheck", "build", "tests"].map((k) => CHECK_MARKS[checks[k]] ?? "–").join(" / ");
      const link = `https://github.com/${ORG}/${repo}/blob/main/evals/${run.file}`;
      lines.push(
        `| [\`${repo}\`](https://github.com/${ORG}/${repo}) | ${AGENT_NAMES[run.agent] ?? run.agent} | ${model(run)} | ${RESULT_LABELS[run.result] ?? run.result} | ${marks} | ${run.skillVersion ?? ""} | ${run.promptIndex ?? ""} | [${run.date}](${link}) |`,
      );
    }
  }
  if (bySkill.size === 0) lines.push("| – | – | – | No runs yet | – | – | – | – |");
  if (waiting.length > 0) {
    lines.push("", `Prompts written, not run yet: ${waiting.map((repo) => `\`${repo}\``).join(", ")}.`);
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const bySkill = new Map();
  const waiting = [];
  const withEvals = new Set();
  for (const repo of await listRepos()) {
    const files = await listEvals(repo);
    if (files === null) continue;
    withEvals.add(repo);
    if (files.length === 0) {
      waiting.push(repo);
      await rm(path.join(OUT, repo), { recursive: true, force: true });
      continue;
    }
    bySkill.set(repo, await mirror(repo, files));
    console.log(`${repo}: ${files.length} run(s)`);
  }
  // A skill that dropped its evals/ folder drops out of the mirror too.
  await mkdir(OUT, { recursive: true });
  for (const name of await readdir(OUT)) {
    if (name.startsWith(".")) continue;
    if (!withEvals.has(name) || waiting.includes(name)) await rm(path.join(OUT, name), { recursive: true, force: true });
  }
  await writeFile(path.join(ROOT, "EVALS.md"), summary(bySkill, waiting));
  console.log(`EVALS.md: ${bySkill.size} skill(s) with runs, ${waiting.length} waiting`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
