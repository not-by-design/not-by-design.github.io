# Not by Design

An independent publication covering **Technology**, **PPE**, and **Arts & Letters**. Its defining architectural feature is a visible production pipeline: **rough cuts** ("working papers"), promoted **releases**, and derived works connected via explicit lineage links.

Hosted on GitHub Pages at [https://not-by-design.github.io](https://not-by-design.github.io).

---

## Architecture & Tech Stack

- **Framework**: [Astro](https://astro.build/) (v5 static output)
- **Content Engine**: Astro Content Collections with the `glob` loader and strict schema validation
- **Theming & Design Tokens**: Centralized CSS custom properties (`src/styles/tokens.css` & `src/styles/global.css`) supporting automatic light/dark modes (`color-scheme: light dark`) plus an interactive theme toggle with persistent user preference
- **Navigation**: Direct domain category navigation (**Technology**, **PPE**, and **Arts & Letters**) with stage filtering (**Releases** vs. **Rough cuts**)
- **Feed Filtering**: Client-side URL-driven filtering (`?stage=...&domain=...`) with static no-JS fallback
- **Feeds**: Full RSS 2.0 feed at `/rss.xml` for released pieces
- **Hosting**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Contributor & Agent Guidelines**: See [AGENTS.md](AGENTS.md) for commit conventions, release workflows, and editorial standards

---

## Planning New Content

Track ideas in the [content backlog](CONTENT_BACKLOG.md) and develop each idea in its matching file under [`content-brainstorm/`](content-brainstorm/). The [directory guide](content-brainstorm/README.md) explains the ID and file naming steps. Contributors and agents should follow the workflow in [AGENTS.md](AGENTS.md).

## Content Model & Domains

Every entry is a Markdown file in `src/content/entries/<id>.md`.

### Editorial Domains
1. **Technology** (`technology`): Software architecture, distributed systems, code, and demos.
2. **PPE** (`ppe` / `econ-philosophy`): Philosophy, Politics, and Economics.
3. **Arts & Letters** (`arts-letters` umbrella in navigation):
   - **Commentary** (`commentary`): Criticism and appraisals on film, television, and media.
   - **Creative** (`creative`): Creative writing, character studies, stories, and poetry.

### Content Buckets
- **Rough cuts** (`stage: 'draft'`): Working papers, raw thoughts, exercises, script drafts.
- **Releases** (`stage: 'polished'`): Refined essays, milestones, releases, demos.

### Frontmatter Schema

| Field | Type | Description |
| --- | --- | --- |
| `title` | `string` | Entry title (required) |
| `domain` | `'technology' \| 'ppe' \| 'econ-philosophy' \| 'commentary' \| 'creative'` | Content domain (required) |
| `stage` | `'draft' \| 'polished'` | Stage of work (`draft` = Rough cut, `polished` = Release) |
| `type` | `'note' \| 'essay' \| 'script-draft' \| 'video' \| 'poem' \| 'story' \| 'exercise' \| 'milestone' \| 'demo'` | Entry content type (required) |
| `created` | `YYYY-MM-DD` | Date initially created (required) |
| `published` | `YYYY-MM-DD` | Publication date (**required** when `stage` is `polished`) |
| `derivedFrom` | `string` | Filename id of parent entry (optional) |
| `videoUrl` | `URL string` | Video link or YouTube URL for embed (optional) |
| `crossPosts` | `Array<{ platform, url }>` | External cross-post links (optional) |

### Promotion Pipeline

The publication keeps the editorial process transparent:
1. Publish working papers and early pieces as rough cuts (`stage: "draft"`).
2. When refining or expanding into an essay or milestone, create a new release entry (`stage: "polished"`).
3. Set `derivedFrom: "<draft-filename-without-md>"` in the new entry's frontmatter.
4. **Both the rough cut and the release stay published.** The entry pages automatically render bidirectional lineage cards ("Derived From" on the child; "Derived Works" on the parent).

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build static production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Visual Design & Theming

Visual design follows an attainable, content-first baseline:
- **Centralized tokens**: Edit `src/styles/tokens.css` to adjust typography, neutral color scales, spacing, and domain/stage badges.
- **Light & dark themes**: Supports system defaults automatically via `prefers-color-scheme` plus manual switching via the header toggle.
- **Accessible metadata**: Domain accents and stage borders are complemented by visible text labels on every row and entry view.

---

## GitHub Pages Deployment

Deploys are automated via GitHub Actions on every push to `main`.

---

## Licenses

- **Platform Code**: [MIT License](LICENSE.md)
- **Content & Writing**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT)
