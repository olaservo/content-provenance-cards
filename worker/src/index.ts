// Serves the field guide: static files from site/, Markdown for clients that ask for it,
// and an MCP endpoint at /mcp with the skills (SEP-2640) and four read-only tools.
// site/ and generated/ are written by `node build.mjs --public --worker`.
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { memorySkillFiles, SkillsExtension } from "@modelcontextprotocol/server/ext/skills";
import * as z from "zod/v4";
import data from "../generated/data.json";
import skillFiles from "../generated/skills.json";

interface Card {
  id: string;
  name: string;
  aliases: string[];
  type: string;
  status: string;
  updated: string;
  tags: string[];
  summary: string;
  sections: { title: string; text: string }[];
}
interface Update {
  date: string;
  card: string;
  name: string;
  text: string;
}
interface Match {
  a: string;
  b: string;
  text: string;
}

const READER = "content-provenance-field-guide";
const CONTRIBUTOR = "content-provenance-field-guide-contributor";
const files = skillFiles as Record<string, string>;
const cards = data.cards as Card[];
const updates = data.updates as Update[];
const matches = data.matches as Match[];
const byId = new Map(cards.map((c) => [c.id, c]));
const layers = Object.keys(data.vocab.layers);
const layersOf = (c: Card) => c.tags.filter((t) => t.startsWith("layer/")).map((t) => t.slice(6));
const plain = (s: string) => s.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_, id: string, label?: string) => label || byId.get(id.trim())?.name || id);
const cardUri = (id: string) => `skill://${READER}/references/cards/${id}.md`;
const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });

const instructions = `A field guide to the organizations, working groups, specifications and proposals on content provenance, access, licensing, attribution and payment for AI systems. ${cards.length} cards, as of ${data.as_of}.

To answer questions from it, load the skill at skill://${READER}/SKILL.md. It reads the cards a few at a time. The tools search_cards, get_card, list_updates and list_unconnected return the same content for clients without skill support.

The guide is an early alpha, shared for feedback. Card fields, these tools and the file formats may change. Tell the user this when it bears on their question.

To suggest a new card or a correction, see skill://${CONTRIBUTOR}/SKILL.md.`;

// The catalog is the same for every request, so it is built once per isolate.
let catalog: ReturnType<typeof SkillsExtension.load> | undefined;
function skills() {
  catalog ??= SkillsExtension.load(memorySkillFiles(files), { strict: true, cacheHint: { ttlMs: 300_000, cacheScope: "public" } }).catch((err) => {
    catalog = undefined;
    throw err;
  });
  return catalog;
}

const mcp = createMcpHandler(async () => {
  const server = new McpServer({ name: READER, title: data.title, version: data.as_of || "0" }, { instructions });
  (await skills()).attach(server);

  server.registerTool(
    "search_cards",
    {
      title: "Search cards",
      description: "Find cards in the field guide by words in the name, aliases, status, summary or topics, optionally limited to one layer or type. Returns one line per card with its id, status and the URI of its file. Cards with the words in their name or aliases come first. The rest mention the words elsewhere, sometimes only in passing, so a result with no name match can mean the guide has no card on the subject.",
      inputSchema: z.object({
        query: z.string().optional().describe("Words to match. Every word must appear somewhere in the card. Leave out to list by layer or type."),
        layer: z.enum(layers as [string, ...string[]]).optional().describe("Only cards on this layer"),
        type: z.string().optional().describe("Only cards of this type, for example organization, working-group, specification or proposal"),
        limit: z.number().int().min(1).max(100).optional().describe("Most cards to return. Default 20."),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ query, layer, type, limit }) => {
      const words = (query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
      const hits = cards.filter((c) => {
        if (layer && !layersOf(c).includes(layer)) return false;
        if (type && c.type !== type) return false;
        const hay = [c.name, c.id, ...c.aliases, c.status, c.summary, ...c.sections.map((s) => s.text), ...c.tags].join(" ").toLowerCase();
        return words.every((w) => hay.includes(w));
      });
      const line = (c: Card) => `- ${c.name} (id ${c.id}; ${[c.type, ...layersOf(c)].join(", ")})${c.status ? `: ${plain(c.status)}` : ""} ${cardUri(c.id)}`;
      const count = (n: number) => `${n} ${n === 1 ? "card" : "cards"}`;
      if (hits.length === 0) return text(`No card matches. The guide may not cover this: it has ${cards.length} cards and is not a complete list.`);

      // A card named for the words is about them. A card that only mentions them may not be.
      const isNamed = (c: Card) => words.length > 0 && words.every((w) => [c.name, c.id, ...c.aliases].join(" ").toLowerCase().includes(w));
      const max = limit ?? 20;
      const named = hits.filter(isNamed);
      const mentions = hits.filter((c) => !isNamed(c));
      const shownNamed = named.slice(0, max);
      const shownMentions = mentions.slice(0, max - shownNamed.length);
      const shown = shownNamed.length + shownMentions.length;
      const head = `${hits.length} of ${cards.length} cards match${hits.length > shown ? `, showing ${shown}` : ""}. Read a card with get_card or its URI.`;
      if (words.length === 0) return text(`${head}\n\n${hits.slice(0, max).map(line).join("\n")}`);

      const parts = [head];
      if (named.length > 0) parts.push(`${count(named.length)} with these words in the name or aliases:\n${shownNamed.map(line).join("\n")}`);
      else parts.push("No card has these words in its name or aliases.");
      if (shownMentions.length > 0) parts.push(`${count(mentions.length)} ${mentions.length === 1 ? "mentions" : "mention"} them elsewhere, sometimes only in passing:\n${shownMentions.map(line).join("\n")}`);
      return text(parts.join("\n\n"));
    },
  );

  server.registerTool(
    "get_card",
    {
      title: "Get a card",
      description: "Return one card as Markdown: type, status, tags, summary, topics, history, and links to related cards.",
      inputSchema: z.object({ id: z.string().describe("Card id, as returned by search_cards, for example c2pa or ietf-aipref") }),
      annotations: { readOnlyHint: true },
    },
    async ({ id }) => {
      const body = files[`${READER}/references/cards/${id}.md`];
      if (body === undefined) return { ...text(`No card has the id ${id}. Use search_cards to find one.`), isError: true };
      return text(body);
    },
  );

  server.registerTool(
    "list_updates",
    {
      title: "List updates",
      description: "List dated events from the cards' histories, newest first: releases, charters, launches, renames and similar. Use it for questions like what has happened since a date, overall or for one card or layer.",
      inputSchema: z.object({
        since: z.string().regex(/^\d{4}(-\d{2}){0,2}$/).optional().describe("Earliest date to include, as YYYY, YYYY-MM or YYYY-MM-DD"),
        until: z.string().regex(/^\d{4}(-\d{2}){0,2}$/).optional().describe("Latest date to include, as YYYY, YYYY-MM or YYYY-MM-DD"),
        card: z.string().optional().describe("Only events for this card id"),
        layer: z.enum(layers as [string, ...string[]]).optional().describe("Only events for cards on this layer"),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ since, until, card, layer }) => {
      // An event dated 2026-10 counts as inside any range that touches October 2026.
      const hits = updates.filter((u) => {
        if (since && u.date < since.slice(0, u.date.length)) return false;
        if (until && u.date.slice(0, until.length) > until) return false;
        if (card && u.card !== card) return false;
        const c = byId.get(u.card);
        return !layer || (c !== undefined && layersOf(c).includes(layer));
      });
      const lines = hits.map((u) => `- ${u.date} ${u.name} (id ${u.card}): ${plain(u.text)}`);
      const note = `The guide records ${updates.length} dated events and was last updated ${data.as_of}. A card with no events here may still have changed: check its status with get_card.`;
      return text(`${hits.length} events match.\n\n${lines.join("\n")}\n\n${note}`);
    },
  );

  server.registerTool(
    "list_unconnected",
    {
      title: "List unconnected pairs",
      description: "List pairs of cards that the guide compares and that no primary source connects: neither effort's own material names the other. Each line says what was searched and when. Use it for questions like who should talk, who is working on the same problem separately, or whether two efforts are connected.",
      inputSchema: z.object({
        card: z.string().optional().describe("Only pairs that include this card id"),
        layer: z.enum(layers as [string, ...string[]]).optional().describe("Only pairs with a card on this layer"),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ card, layer }) => {
      if (card && !byId.has(card)) return { ...text(`No card has the id ${card}. Use search_cards to find one.`), isError: true };
      const onLayer = (id: string) => layersOf(byId.get(id)!).includes(layer!);
      const hits = matches.filter((m) => (!card || m.a === card || m.b === card) && (!layer || onLayer(m.a) || onLayer(m.b)));
      const lines = hits.map((m) => `- ${byId.get(m.a)!.name} (id ${m.a}) and ${byId.get(m.b)!.name} (id ${m.b}): ${plain(m.text)}`);
      const note = "These are comparisons the guide makes. People from the two efforts may still have talked. A pair that is not listed is either connected by a source, which get_card shows as a link outside the card's Compare section, or not compared by the guide.";
      return text(`${hits.length} of ${matches.length} unconnected pairs match.\n\n${lines.join("\n")}\n\n${note}`);
    },
  );

  return server;
});

// "/" and "/cards/<id>" each have a Markdown twin among the static files.
function markdownTwin(pathname: string): string | undefined {
  if (pathname === "/" || pathname === "/cards" || pathname === "/cards/") return "/index.md";
  const card = pathname.match(/^\/cards\/([a-z0-9-]+)\/?$/);
  return card ? `/cards/${card[1]}.md` : undefined;
}

function prefersMarkdown(request: Request): boolean {
  const q = (type: string) => {
    for (const part of (request.headers.get("Accept") ?? "").split(",")) {
      const [name, ...params] = part.trim().split(";");
      if (name.trim().toLowerCase() !== type) continue;
      const weight = params.map((p) => p.trim().match(/^q=([\d.]+)$/)).find(Boolean);
      return weight ? Number(weight[1]) : 1;
    }
    return 0;
  };
  const markdown = q("text/markdown");
  return markdown > 0 && markdown >= q("text/html");
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Expose-Headers": "*",
};

function withHeaders(response: Response, headers: Record<string, string>): Response {
  const out = new Response(response.body, response);
  for (const [k, v] of Object.entries(headers)) out.headers.append(k, v);
  return out;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    // The endpoint is public and read-only, so any origin may call it.
    if (url.pathname === "/mcp") {
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
      return withHeaders(await mcp.fetch(request), CORS);
    }

    const twin = markdownTwin(url.pathname);
    if (!twin || (request.method !== "GET" && request.method !== "HEAD")) return env.ASSETS.fetch(request);

    if (prefersMarkdown(request)) {
      const markdown = await env.ASSETS.fetch(new Request(new URL(twin, url), { method: request.method }));
      if (markdown.ok) return withHeaders(markdown, { Vary: "Accept" });
    }
    const page = await env.ASSETS.fetch(request);
    return withHeaders(page, { Vary: "Accept", Link: `<${twin}>; rel="alternate"; type="text/markdown"` });
  },
} satisfies ExportedHandler<Env>;
