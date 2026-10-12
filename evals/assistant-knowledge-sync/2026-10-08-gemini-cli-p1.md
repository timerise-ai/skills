---
agent: gemini-cli
agentVersion: 0.63.0
model: gemini-3.8-flash
date: 2026-10-08
skillVersion: 0.1.0
promptIndex: 1
prompt: >
  Our site has a chat assistant; its code is below, save each file at its path
  first. We just shipped a partners page and the assistant knows nothing about
  it: people who ask about partnering get sent to sales, and yesterday it told
  someone they would earn 20%. Teach it about the partner program.


  // lib/ai/knowledge.ts

  export type KnowledgeKind = "help" | "page";


  export interface KnowledgeDocument {
    kind: KnowledgeKind;
    title: string;
    url: string;
    summary: string;
    tags: string[];
    content: string;
  }


  const DOCS: KnowledgeDocument[] = [
    {
      kind: "help",
      title: "Booking widget",
      url: "/help/booking-widget",
      summary: "Embed a booking calendar on your site.",
      tags: ["widget", "calendar", "embed"],
      content: "Paste the script tag before the closing body tag. The widget reads your services and opening hours.",
    },
    {
      kind: "page",
      title: "Pricing",
      url: "/pricing",
      summary: "Plans and prices.",
      tags: ["price", "plan", "cost"],
      content: "Starter: 29 EUR a month. Pro: 79 EUR a month.",
    },
  ];


  export function searchKnowledge(locale: string, query: string, limit: number):
  KnowledgeDocument[] {
    const tokens = query.toLowerCase().split(/\W+/).filter(Boolean);
    return DOCS.map((doc) => {
      const text = `${doc.title} ${doc.tags.join(" ")} ${doc.summary} ${doc.content}`.toLowerCase();
      return { doc, score: tokens.filter((t) => text.includes(t)).length };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.doc);
  }


  export function readKnowledgeDocument(locale: string, url: string):
  KnowledgeDocument | undefined {
    return DOCS.find((doc) => doc.url === url);
  }


  export function getKnowledgePack(locale: string): string {
    return ["#### SITE MAP", "- Pricing: /pricing", "- Help: /help/booking-widget", "- Talk to sales: /contact"].join("\n");
  }


  // lib/ai/prompts.ts

  import { getKnowledgePack } from "./knowledge";


  export const searchDescription = "Full-text search across the help center and
  the pricing page.";


  export function buildSystemPrompt(locale: string): string {
    return [
      "You are Ada, the assistant on our website. Answer questions about our booking software.",
      "Only discuss booking, pricing and help articles. For anything else, send people to /contact.",
      "Link pages with relative links.",
      getKnowledgePack(locale),
    ].join("\n\n");
  }


  // app/partners/page.tsx

  const ROLES = [
    { name: "Referrer", body: "Introduce a client. We do the setup." },
    { name: "Implementer", body: "Set up the booking widget for your client. We review it before it goes live." },
  ];


  const FAQ = [
    { q: "Who can join?", a: "Agencies and freelancers who set up booking for their clients." },
    { q: "How are partners paid?", a: "A share of the first year's subscription for every client you bring. The shares are published when the first round opens." },
  ];


  export default function PartnersPage() {
    return (
      <main>
        <h1>Partner program</h1>
        <p>Bring clients to us and get paid for every one.</p>
        <h2>Roles</h2>
        <ul>
          {ROLES.map((role) => (
            <li key={role.name}>
              <strong>{role.name}</strong>: {role.body}
            </li>
          ))}
        </ul>
        <h2>FAQ</h2>
        {FAQ.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <p>
          <a href="/partners/apply">Apply to the program</a>
        </p>
      </main>
    );
  }
stack: No data store
durationMinutes: 7
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 13
linesAdded: 1502
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/assistant-knowledge-sync/actions/runs/37785035114
---

Rubric 5/8, scored from the JSON summary. The copy moved verbatim, the guardrails use the template wording
with a probe rejecting any percentage, the routing line sends partners to `/partners/apply`, the site map
gained one line in the existing pack, and the probe script imports `ask` from a separate `scripts/ask.mjs` as
the template does, reported not run with its command. Item 2: it rewrote the host's search scorer to weight
title, tags and summary, reading "check the search scorer weights title, tags and summary above body hits"
as an instruction, though the same reference says the host keeps its scorer; and it created `data/program.ts`
as an alias of `data/partners.ts` "to support canonical skill references", reading the seam table's canonical
path as a file to create. Item 3: seven tests of its own rather than the shipped ones, for the same reason as
the other two runs. Item 8: neither the pack size before and after nor the absent seams (no sitemap source, no
tools module) are reported. Commits are not mentioned; three shell commands were denied by policy, so whether
it tried to commit is unknown.
