#!/usr/bin/env node
/**
 * Runs one skill through a coding agent, unattended, and records the result in
 * the skill repository's evals/ folder.
 *
 *   node run.mjs --skill-dir ../site-pin-gate                 # Claude Code, prompt 1
 *   node run.mjs --skill-dir ../ksef --agent codex --prompt 2
 *   node run.mjs --skill-dir ../ksef --dry-run                # set up the app, skip the agent
 *
 * Steps: copy fixture/ (a fresh Next.js App Router app) to a temp folder, npm
 * install, install the skill with the skills CLI exactly as its README tells
 * people to, hand the agent prompt N from <skill>/evals/prompts.md, then run
 * typecheck, build and (if the agent left one) the test script. The result is
 * written to <skill>/evals/<date>-<agent>-p<n>.md. In CI the workflow commits
 * it; run by hand, read the agent's log and commit it yourself.
 *
 * The agent runs with every permission granted, in the temp folder. In CI that
 * is a throwaway runner; locally, run it where you would let an agent run
 * unsupervised. Locally, Claude Code is isolated from your own config
 * (CLAUDE_CONFIG_DIR) only when ANTHROPIC_API_KEY is set; the file records
 * whether the run was isolated.
 */
import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(HERE, "fixture");

/** Said to every agent after the skill's prompt, so the runs are comparable. */
const HARNESS_NOTE = `

Work unattended: do not ask questions, make reasonable assumptions and list them at the end.
No external services are reachable from here: read every credential from environment
variables and do not require them at build time. When you finish, \`npm run typecheck\` and
\`npm run build\` must pass, and if the skill ships tests, wire them to \`npm test\` so they run.`;

/** The CLI flags that pin the model (and, for Codex, the reasoning effort); none when unset. */
const modelFlag = (flag, opts) => (opts.model ? [flag, opts.model] : []);

/**
 * Gemini CLI lists every model a session touched under stats.models, each with the roles it served. The
 * work is done by the `main` role; helpers such as `utility_loop_detector` are not the model under test.
 */
const mainModels = (models) => {
  const names = Object.keys(models);
  const main = names.filter((name) => Object.keys(models[name]?.roles ?? {}).includes("main"));
  return (main.length > 0 ? main : names).join(", ");
};

export const AGENTS = {
  "claude-code": {
    bin: "claude",
    args: (prompt, opts) => [
      "-p",
      prompt,
      "--output-format",
      "json",
      "--dangerously-skip-permissions",
      ...modelFlag("--model", opts),
    ],
    /** The JSON result carries turns and the models used. */
    parse(stdout) {
      try {
        const out = JSON.parse(stdout.trim().split("\n").at(-1));
        return {
          turns: out.num_turns ?? null,
          model: Object.keys(out.modelUsage ?? {}).join(", "),
          summary: out.result ?? "",
          error: out.is_error ? String(out.result ?? "error") : "",
        };
      } catch {
        return {};
      }
    },
  },
  codex: {
    bin: "codex",
    args: (prompt, opts) => [
      "exec",
      "--skip-git-repo-check",
      "--sandbox",
      "danger-full-access",
      ...modelFlag("-m", opts),
      ...(opts.reasoning ? ["-c", `model_reasoning_effort="${opts.reasoning}"`] : []),
      prompt,
    ],
    /** Codex prints its settings as a header on stderr: `model: ...`, `reasoning effort: ...`. */
    parse: (stdout, stderr = "") => ({
      model: stderr.match(/^model: (.+)$/m)?.[1]?.trim() ?? "",
      reasoningEffort: stderr.match(/^reasoning effort: (.+)$/m)?.[1]?.trim() ?? "",
      summary: stdout.slice(-4000),
    }),
  },
  "gemini-cli": {
    bin: "gemini",
    args: (prompt, opts) => ["-p", prompt, "--yolo", "--skip-trust", "-o", "json", ...modelFlag("-m", opts)],
    /** The JSON output names every model the session used under stats.models. */
    parse(stdout) {
      try {
        const out = JSON.parse(stdout.slice(stdout.indexOf("{")));
        return {
          model: mainModels(out.stats?.models ?? {}),
          summary: String(out.response ?? ""),
          error: out.error ? String(out.error.message ?? JSON.stringify(out.error)) : "",
        };
      } catch {
        return { summary: stdout.slice(-4000) };
      }
    },
  },
};

function parseArgs(argv) {
  const opts = {
    agent: "claude-code",
    prompt: 1,
    timeoutMinutes: 60,
    dryRun: false,
    log: "",
    model: process.env.EVAL_MODEL ?? "",
    reasoning: process.env.EVAL_REASONING ?? "",
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--skill-dir") opts.skillDir = path.resolve(argv[++i]);
    else if (arg === "--agent") opts.agent = argv[++i];
    else if (arg === "--prompt") opts.prompt = Number(argv[++i]);
    else if (arg === "--timeout") opts.timeoutMinutes = Number(argv[++i]);
    else if (arg === "--model") opts.model = argv[++i];
    else if (arg === "--reasoning") opts.reasoning = argv[++i];
    else if (arg === "--log") opts.log = path.resolve(argv[++i]);
    else if (arg === "--dry-run") opts.dryRun = true;
  }
  return opts;
}

/** Runs a command and returns its exit code and output. */
function run(cmd, args, { cwd, env, timeoutMs = 20 * 60_000 } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env: { ...process.env, ...env }, stdio: "pipe" });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 10_000);
    }, timeoutMs);
    child.stdout.on("data", (d) => {
      stdout += d;
    });
    child.stderr.on("data", (d) => {
      stderr += d;
    });
    child.stdin.end();
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ code: 127, stdout, stderr: `${stderr}${error.message}`, timedOut });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? 1, stdout, stderr, timedOut });
    });
  });
}

async function must(label, cmd, args, opts) {
  const result = await run(cmd, args, opts);
  if (result.code !== 0) {
    console.error(`${label} failed:\n${result.stderr || result.stdout}`);
    process.exit(1);
  }
  return result;
}

/** Frontmatter and body of a markdown file. */
export function readFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return match ? { data: YAML.parse(match[1]) ?? {}, body: match[2] } : { data: {}, body: text };
}

export function writeFrontmatter(data, body = "") {
  return `---\n${YAML.stringify(data)}---\n${body}`;
}

/** The skill's name: the SKILL.md frontmatter `name`, which the standard makes the repo name too. */
async function skillName(skillDir) {
  const { data } = readFrontmatter(await readFile(path.join(skillDir, "SKILL.md"), "utf8"));
  return String(data.name ?? path.basename(skillDir));
}

/** The folder the skills CLI put the skill in. */
async function findInstalledSkill(dir, repo) {
  for (const base of [".claude/skills", ".agents/skills", ".codex/skills", ".gemini/skills"]) {
    const candidate = path.join(dir, base, repo);
    try {
      await stat(path.join(candidate, "SKILL.md"));
      return candidate;
    } catch {}
  }
  return null;
}

async function versionOf(skillDir) {
  try {
    const changelog = await readFile(path.join(skillDir, "CHANGELOG.md"), "utf8");
    return changelog.match(/^## \[?(\d+\.\d+\.\d+)/m)?.[1] ?? "";
  } catch {
    return "";
  }
}

async function hasTestScript(dir) {
  const pkg = JSON.parse(await readFile(path.join(dir, "package.json"), "utf8"));
  const test = pkg.scripts?.test;
  return Boolean(test) && !/no test specified/.test(test);
}

function shortstat(text) {
  return {
    files: Number(text.match(/(\d+) files? changed/)?.[1] ?? 0),
    added: Number(text.match(/(\d+) insertions?/)?.[1] ?? 0),
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const agent = AGENTS[opts.agent];
  if (!opts.skillDir || !agent) {
    console.error(
      `Usage: node run.mjs --skill-dir <path> [--agent ${Object.keys(AGENTS).join("|")}] [--prompt n] [--timeout minutes] [--model id] [--reasoning effort] [--log file] [--dry-run]`,
    );
    process.exit(1);
  }

  const repo = await skillName(opts.skillDir);
  const promptsFile = path.join(opts.skillDir, "evals", "prompts.md");
  const { data } = readFrontmatter(await readFile(promptsFile, "utf8"));
  const entry = (data.prompts ?? [])[opts.prompt - 1];
  const prompt = typeof entry === "string" ? entry : entry?.prompt;
  if (!prompt) {
    console.error(`${repo} has no prompt ${opts.prompt} in evals/prompts.md`);
    process.exit(1);
  }
  const stack = typeof entry === "object" ? (entry.stack ?? "") : "";

  // "2.1.283 (Claude Code)" → "2.1.283": the page already names the agent.
  const agentVersion = (await run(agent.bin, ["--version"])).stdout
    .trim()
    .split("\n")[0]
    .replace(/\s*\(.*\)$/, "");
  if (!agentVersion && !opts.dryRun) {
    console.error(`${agent.bin} is not installed or does not start.`);
    process.exit(1);
  }

  const dir = await mkdtemp(path.join(os.tmpdir(), `skill-eval-${repo}-`));
  console.log(`Working in ${dir}`);
  await cp(FIXTURE, dir, { recursive: true });
  await rename(path.join(dir, "gitignore"), path.join(dir, ".gitignore"));

  console.log("Installing the app…");
  await must("npm install", "npm", ["install", "--no-audit", "--no-fund"], { cwd: dir });
  const git = (args) =>
    must(`git ${args[0]}`, "git", ["-c", "user.name=eval", "-c", "user.email=eval@localhost", ...args], {
      cwd: dir,
    });
  await git(["init", "-q"]);
  await git(["add", "-A"]);
  await git(["commit", "-qm", "fixture"]);

  console.log(`Installing timerise-ai/${repo} for ${opts.agent}…`);
  await must(
    "skills add",
    "npx",
    ["-y", "skills", "add", `timerise-ai/${repo}`, "-a", opts.agent, "-y", "--copy"],
    { cwd: dir },
  );
  const installed = await findInstalledSkill(dir, repo);
  if (!installed) {
    console.error(`The skills CLI did not leave ${repo}/SKILL.md in an agent folder.`);
    process.exit(1);
  }
  const skillVersion = await versionOf(installed);
  await git(["add", "-A"]);
  await git(["commit", "-qm", "skill"]);

  if (opts.dryRun) {
    console.log(`Dry run: the app and ${repo} ${skillVersion} are ready in ${dir}.`);
    return;
  }

  // A CI runner has no config of the operator's to leak in. Locally, Claude Code
  // gets its own config folder when an API key makes that possible.
  const env = {};
  let isolated = Boolean(process.env.CI);
  if (!isolated && opts.agent === "claude-code" && process.env.ANTHROPIC_API_KEY) {
    env.CLAUDE_CONFIG_DIR = `${dir}-claude-config`;
    await mkdir(env.CLAUDE_CONFIG_DIR, { recursive: true });
    isolated = true;
  } else if (!isolated) {
    console.warn(`Not isolated: ${opts.agent} runs with your own config and skills.`);
  }

  console.log(`Running ${opts.agent} ${agentVersion} on prompt ${opts.prompt}…`);
  const started = Date.now();
  const agentRun = await run(agent.bin, agent.args(`${prompt}${HARNESS_NOTE}`, opts), {
    cwd: dir,
    env,
    timeoutMs: opts.timeoutMinutes * 60_000,
  });
  const durationMinutes = Math.round((Date.now() - started) / 60_000);
  const parsed = agent.parse(agentRun.stdout, agentRun.stderr);
  const logPath = opts.log || `${dir}-agent.log`;
  await writeFile(
    logPath,
    `exit ${agentRun.code}${agentRun.timedOut ? " (timed out)" : ""}\n\n${agentRun.stdout}\n\n--- stderr ---\n${agentRun.stderr}`,
  );

  if (!agentRun.timedOut && (agentRun.code !== 0 || parsed.error)) {
    const cause = parsed.error || agentRun.stderr.trim().split("\n").slice(-3).join(" ");
    console.error(`${opts.agent} did not work (exit ${agentRun.code}): ${cause}\nNo result written. Log: ${logPath}`);
    process.exit(1);
  }

  // Measured when the agent stops, so what the build rewrites is not counted as its work.
  await run("git", ["add", "-A"], { cwd: dir });
  const diff = shortstat((await run("git", ["diff", "--cached", "--shortstat", "HEAD"], { cwd: dir })).stdout);

  console.log("Checking the result…");
  // A fresh install, in case the agent added packages without installing them.
  await run("npm", ["install", "--no-audit", "--no-fund"], { cwd: dir });
  const outcome = async (args) => ((await run("npm", args, { cwd: dir })).code === 0 ? "pass" : "fail");
  const checks = {
    typecheck: await outcome(["run", "typecheck"]),
    build: await outcome(["run", "build"]),
    tests: (await hasTestScript(dir)) ? await outcome(["test"]) : "none",
  };
  const builds = checks.typecheck === "pass" && checks.build === "pass";
  // An agent that ran and changed nothing built nothing, whatever the untouched fixture passes.
  const result =
    !builds || agentRun.timedOut || diff.files === 0 ? "fail" : checks.tests === "fail" ? "partial" : "pass";

  const date = new Date().toISOString().slice(0, 10);
  const record = {
    agent: opts.agent,
    agentVersion,
    // What the agent reports it ran on; the pinned value when it reports nothing.
    model: parsed.model || opts.model || "",
    ...(parsed.reasoningEffort || opts.reasoning
      ? { reasoningEffort: parsed.reasoningEffort || opts.reasoning }
      : {}),
    date,
    skillVersion,
    promptIndex: opts.prompt,
    prompt,
    stack,
    durationMinutes,
    turns: parsed.turns ?? null,
    interventions: 0,
    checks,
    result,
    filesChanged: diff.files,
    linesAdded: diff.added,
    isolated,
    timedOut: agentRun.timedOut,
  };
  if (process.env.GITHUB_RUN_ID) {
    record.runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  }

  const evalsDir = path.join(opts.skillDir, "evals");
  await mkdir(evalsDir, { recursive: true });
  const existing = await readdir(evalsDir);
  let name = `${date}-${opts.agent}-p${opts.prompt}.md`;
  for (let n = 2; existing.includes(name); n++) name = `${date}-${opts.agent}-p${opts.prompt}-${n}.md`;
  await writeFile(path.join(evalsDir, name), writeFrontmatter(record));

  console.log(`\n${result.toUpperCase()}: typecheck ${checks.typecheck}, build ${checks.build}, tests ${checks.tests}`);
  console.log(`${diff.files} files, +${diff.added} lines, ${durationMinutes} min`);
  console.log(`Wrote evals/${name}\nAgent log: ${logPath}\nApp: ${dir}`);
  if (parsed.summary) console.log(`\nAgent's closing summary:\n${String(parsed.summary).slice(0, 3000)}`);
  if (process.env.GITHUB_OUTPUT) await writeFile(process.env.GITHUB_OUTPUT, `file=evals/${name}\nresult=${result}\n`, { flag: "a" });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
