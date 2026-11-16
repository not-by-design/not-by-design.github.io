# Handoff: publication build ("Not by Design")

You are picking up the publication build for Not by Design. This document is self-contained. Read it fully before changing anything.

## 1. Status at a glance

| Area | Status |
| --- | --- |
| Publication structure (sections, stages, domains) | Decided |
| Content model and homepage feed behavior | Decided, with two open details (section 5) |
| Hosting (GitHub Pages, public repo, Astro) | Decided |
| Repo created | Yes (confirm exact name and site type, section 9) |
| Publication name | "Not by Design" |
| Visual design (palette, type, layout polish) | **Attainable baseline:** clean typography, centralized tokens, light/dark mode, readable metadata badges |
| Licenses | Not final. Proposal: MIT for code, CC BY 4.0 for writing |

Visual design focuses on what is attainable within reason: a clean, content-first typographic layout, solid baseline styling with centralized CSS design tokens, responsive structure, and light/dark theme support. Styling can be tuned directly in the design tokens.

## 2. What the publication is

An independent publication covering Technology, Philosophy, Politics & Economics (PPE), and Arts & Letters (Commentary & Creative). Its distinguishing feature is that the production pipeline is visible: rough cuts ("working papers"), promoted releases, and derived work (video scripts, videos, cross-posts) are all published and linked to each other. Structured sections keep early drafts organized.

Every entry has two independent properties:

- **Domain:** `econ-philosophy`, `creative`, or `technology`.
- **Stage:** `draft` or `polished`.

The six sections are the combinations of those properties:

| Section | Domain | Stage | Contents |
| --- | --- | --- | --- |
| 1A | econ-philosophy | draft | Rough thoughts, no quality bar. Also video script drafts |
| 1B | econ-philosophy | polished | Think pieces; short videos derived from them |
| 2A | creative | draft | Poems, haiku, story exercises, stream of consciousness, film ideas |
| 2B | creative | polished | Refined versions of the best 2A work |
| 3A | technology | draft | Code exercises, patterns, Algorithm explanations, architecture reviews, stats practice |
| 3B | technology | polished | Milestones, tool releases, skills attained, video demos |

Note that 3B is not "a polished 3A exercise". It is a record of progress, so its entries are always `polished` with type `milestone` or `demo`.

The site is the canonical home. Twitter, Substack, YouTube, TikTok, and Instagram posts link back to it. Cross-posting is manual for now.

## 3. Scope of this handoff

**In scope (Phase 1, the writing core):**

1. Scaffold the Astro project and verify it builds.
2. Content collection and schema supporting all three domains from the start.
3. Clean, attainable layout with centralized design tokens (CSS custom properties), semantic HTML, readable typography, and light/dark theme support.
4. Homepage feed with the two filters.
5. Entry page with lineage.
6. RSS feed.
7. GitHub Actions deploy to GitHub Pages.
8. README, with license placeholders.

**Out of scope (later phases, do not build yet):**

- Over-engineered or bespoke illustration/animation work (stick to clean, attainable typography, spacing, and CSS token styling).
- Dedicated section index pages (use homepage links with preset query params for now).
- Automation of cross-posting.
- Any server-side feature, comments, accounts, or analytics.
- A Trello board link (undecided).

## 4. Tech stack and constraints

- **Astro** static site, Markdown content, content collections with the `glob` loader and a Zod schema. Check the installed Astro version. If the `z` import from `astro:content` produces a deprecation warning, use the import path the warning recommends.
- **Language:** TypeScript for scripts and config.
- **No database, no CMS.** A new entry is one Markdown file.
- **Hosting:** GitHub Pages from a **public** repo, deployed with GitHub Actions (`withastro/action` plus `actions/deploy-pages`). Pages is free and supports a custom domain and HTTPS. GitHub's terms restrict Pages from commercial transactions such as e-commerce, so do not add any.
- **Dependencies:** keep them minimal. Ask before adding a CSS framework or UI library.
- **The repo is public.** Never commit secrets, private credentials, or unapproved material. Truly private author drafts live outside the repo.
- Do not add proprietary content or employer intellectual property.

## 5. Content model

Each entry is a Markdown file in `src/content/entries/`. The entry id is the filename without extension.

Fields:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Required |
| `domain` | `econ-philosophy` \| `creative` \| `technology` | Required |
| `stage` | `draft` \| `polished` | Required |
| `type` | `note`, `essay`, `script-draft`, `video`, `poem`, `story`, `exercise`, `milestone`, `demo` | Required |
| `created` | date | Required |
| `published` | date | Required when `stage` is `polished` |
| `derivedFrom` | string | Id of the entry this grew out of |
| `videoUrl` | URL | Optional |
| `crossPosts` | list of `{ platform, url }` | Default empty |

Reference schema (adapt to the installed Astro version):

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z
    .object({
      title: z.string(),
      domain: z.enum(['econ-philosophy', 'creative', 'technology']),
      stage: z.enum(['draft', 'polished']),
      type: z.enum([
        'note', 'essay', 'script-draft', 'video',
        'poem', 'story', 'exercise', 'milestone', 'demo',
      ]),
      created: z.coerce.date(),
      published: z.coerce.date().optional(),
      derivedFrom: z.string().optional(),
      videoUrl: z.string().url().optional(),
      crossPosts: z
        .array(z.object({ platform: z.string(), url: z.string().url() }))
        .default([]),
    })
    .refine((d) => d.stage !== 'polished' || d.published !== undefined, {
      message: 'polished entries need a published date',
      path: ['published'],
    }),
});

export const collections = { entries };
```

**Promotion rule:** promoting a draft creates a new `polished` entry with `derivedFrom` pointing at the draft. The draft is kept and stays published. Do not delete or hide drafts on promotion.

Add two example entries (one draft, one polished derived from it) so the feed and lineage can be verified.

## 6. Attainable design direction and tokens

Rather than getting blocked on granular UX design steps (moodboards, wireframes, extensive prototyping), the site adopts an attainable, clean, and pragmatic design:

**Design principles:**
- **Content-first readability:** Optimal measure (60–75ch), comfortable line height (1.6), clear typographic scale (`--font-sans`, `--font-mono`), and clean spacing scale.
- **Centralized tokens:** All colors, spacing, borders, and fonts live in CSS custom properties (`src/styles/tokens.css` or global styles) for effortless tuning.
- **Automatic light/dark themes:** Handled via `prefers-color-scheme` with accessible contrast ratios (WCAG AA compliant).
- **Clear visual differentiation for Domain and Stage:**
  - **Domain:** Signaled by subtle domain accent color tags (e.g., indigo for `econ-philosophy`, terracotta/amber for `creative`, teal for `technology`) accompanied by clear text labels.
  - **Stage:**
    - `draft` ("Working papers"): Monospaced/typewriter touches, subtle dashed border or badge styling, sketch-like informal feel.
    - `polished` ("Hey, I made a thing"): Refined typography, solid border/badge styling, crisp publication layout.
  - **Grayscale accessible:** Every distinction is conveyed with text and structural styling, not color alone.
- **Responsive & lightweight:** Fast loading, zero bloat, mobile-friendly flex/grid layouts.

## 7. Homepage feed spec

A reverse-chronological list of all entries with two dropdown filters.

**Control 1, stage** (labels are working titles and should be easy to change in one place):

| Value | Label | Filter | Default |
| --- | --- | --- | --- |
| `polished` | "Hey, I made a thing" | polished entries | Yes |
| `draft` | "Working papers" | draft entries | |
| `all` | "Everything" | no stage filter | |

**Control 2, domain:**

| Value | Label | Filter | Default |
| --- | --- | --- | --- |
| `all` | "All" | no domain filter | Yes |
| `econ-philosophy` | "Econ + philo" | that domain | |
| `creative` | "Artwork" | that domain | |
| `technology` | "Technology" | that domain | |

**Behavior:**

- Filter state lives in the URL query string (`?stage=polished&domain=all`) so a filtered view is a shareable link. Missing params fall back to the defaults.
- Filtering runs in the browser over the statically generated list. Updating the URL on change should not add history entries (`history.replaceState`).
- Without JavaScript, the full list should still render and be usable.
- Each row shows title, stage, domain, and date.
- Sort key: `published ?? created`, descending. This is an **open question** (below).

**Open questions:**

1. Sort by promotion date (`published`) or by original draft date (`created`)? Current default is `published ?? created`, which matches how a reader experiences the feed.
2. Should all drafts be public automatically, or only drafts marked for publication? Current default: all entries in the repo are published.

## 8. Entry page spec

Show on each entry:

- Title, stage and domain labels, type, and date.
- **Derived from:** link to the parent entry, if any.
- **Derived works:** computed by finding entries whose `derivedFrom` equals this entry's id. Show script drafts, videos, and promoted versions.
- The video link or embed, if `videoUrl` is set.
- Cross-post links, if any.
- A link back to the homepage.

## 9. Baseline Configuration

- **Repo name and site type.** The repo is `not-by-design.github.io` under `not-by-design`, served at the root with no `base` path needed.
- **Publication name:** "Not by Design", centralized in `src/consts.ts`.
- **Licenses:** MIT for code (`LICENSE.md`) and CC BY 4.0 for writing (`LICENSE-CONTENT`). Third-party material (quotes, film stills) stays under its own copyright.

## 10. Deploy workflow

Reference `.github/workflows/deploy.yml` (check action versions are current when you build):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

One-time manual repository setup: in repository Settings -> Pages, set Source to "GitHub Actions".

## 11. Suggested order of work

1. Confirm baseline items, or proceed with the stated defaults and list what you assumed.
2. Scaffold Astro, confirm `npm run build` passes.
3. Add the schema and initial example entries.
4. Add the base layout and token stylesheet.
5. Build the homepage feed and filters.
6. Build the entry page with lineage.
7. Add the RSS feed (a feed of polished entries at `/rss.xml`; per-domain feeds are later).
8. Add the deploy workflow.
9. Write the README (how to add an entry, how promotion works, how to run locally, license placeholders).

## 12. Definition of done

- `npm run build` passes and the deploy workflow is green on `main`.
- The homepage defaults to polished entries and all domains.
- Changing either dropdown filters the list and updates the URL. Loading a URL with params restores the state.
- Adding a polished entry without `published` fails the build with a clear error.
- An entry page lists its parent and its derived works correctly for the example entries.
- Stage and domain are visible as text on every feed row.
- Tokens are centralized so a palette or type change touches one file.
- Design is clean, responsive, and functional out of the box with clear domain/stage indicators and light/dark support.

## 13. Editorial & Engineering Guidelines

- The editorial voice is direct, analytical, and professional.
- For architectural decisions, give a clear structure and a short justification for each choice, flagging trade-offs.
- Content commits and platform code commits must remain strictly decoupled.

## 14. Reference

- Google Doc "Personal Site Design Document": sections, content model, homepage feed, decisions, risks, phasing.
- Design baseline: Attainable design within reason (content-first typography, centralized tokens, light/dark mode, distinct stage/domain treatments).
- Phasing after this handoff: Phase 3 adds sections 2A, 2B, and 3A; Phase 4 adds the video script workflow, YouTube embeds, 3B, and the progress board link; Phase 5 considers cross-posting automation.
