# AGENTS.md — Instructions for AI Agents and Contributors

Welcome to the **Not by Design** repository (`not-by-design.github.io`).
Not by Design is an independent publication covering **Technology**, **PPE** (Philosophy, Politics & Economics), and **Arts & Letters** (Commentary and Creative Writing). Its defining architectural feature is a **visible production pipeline**: early rough cuts ("working papers"), promoted releases, and derived works (video scripts, poems, demos) are all published and connected via bidirectional lineage links.

---

## 1. Architecture & Tech Stack

- **Framework**: [Astro](https://astro.build/) (v5 static output).
- **Content Collections**: Stored in `src/content/entries/` loaded via `glob` and validated against a strict Zod schema in `src/content.config.ts`.
- **Styling**: Centralized CSS custom properties in `src/styles/tokens.css` and `src/styles/global.css`.
- **Theming**: Automatic light/dark mode via native `color-scheme: light dark`, `prefers-color-scheme`, and an accessible interactive theme toggle.
- **Lineage Engine**: Bidirectional parent-child linkage computed at build time from `derivedFrom` references.
- **Deployment**: Automatic GitHub Actions deployment to GitHub Pages on pushes to `main` (`.github/workflows/deploy.yml`).

---

## 2. Git Commit and Release Conventions

All commits must strictly delineate between **Content Releases** and **Site Infrastructure Changes**. **Never mix content authoring and site code changes in a single commit.**

### A. Content Releases (`src/content/entries/`)
Content releases represent new or revised editorial writing. Use the following commit shapes:

- **New Rough Cut (Draft)**:
  ```bash
  git commit -m "content(<domain>): draft <title>"
  # Example: content(technology): draft distributed consensus notes
  # Example: content(ppe): draft institutional friction notes
  # Example: content(commentary): draft slow cinema appraisal
  # Example: content(creative): draft evening haiku series
  ```
- **New Release (Promoted or Polished Work)**:
  ```bash
  git commit -m "release(content): publish <title>"
  # Example: release(content): publish on emergent order and institutions
  # Example: release(content): publish cinematic rhythm in slow cinema
  # Example: release(content): release publication architecture milestone
  ```
- **Derived Work or Script**:
  ```bash
  git commit -m "content(<domain>): script draft for <title>"
  # Example: content(ppe): script draft for emergent order
  ```
- **Revising / Updating Existing Content**:
  ```bash
  git commit -m "content(<domain>): revise <slug> - <brief summary>"
  # Example: content(ppe): revise emergent-order - expand bibliography
  ```

> **Content Release Policy**: Content deployments to GitHub Pages are continuous upon push to `main`. The publication date recorded in the entry's frontmatter (`published: YYYY-MM-DD`) serves as the official timestamp of the release.

### B. Site Infrastructure & Code Changes
All non-content code changes (Astro components, layouts, CSS tokens, build configuration, CI workflows, documentation) follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(<scope>): <description>` — New user-facing site feature (e.g., `feat(theme): add interactive theme toggle`)
- `fix(<scope>): <description>` — Bug fix in site layout or script (e.g., `fix(feed): handle empty search state`)
- `style(<scope>): <description>` — Visual styling, CSS tokens, or theme adjustments (e.g., `style(tokens): tune technology badge dark mode contrast`)
- `refactor(<scope>): <description>` — Code refactoring without UI changes
- `chore(<scope>): <description>` — Tooling, package upgrades, or CI config (e.g., `chore(deps): update withastro/action to v6`)
- `docs: <description>` — Updates to documentation or plans (e.g., `docs: update AGENTS.md conventions`)

### C. Site Release Tagging
When completing significant platform features, architectural phases, or major visual design milestones:
```bash
git tag -a v0.x.x -m "Release v0.x.x: <summary of site improvements>"
```

---

## 3. Content Model & Promotion Pipeline

### Content Idea Backlog

Use [CONTENT_BACKLOG.md](CONTENT_BACKLOG.md) as the index for ongoing ideas and [`content-brainstorm/`](content-brainstorm/) for the detailed plan for each idea. Add a one-line idea under its domain heading with the next numeric ID (start at `0` if the backlog is empty), then create `content-brainstorm/<id>.md` and link it back to the backlog entry. Keep brainstorming and planning in that file.

### Content Buckets
- **Rough cuts** (`stage: 'draft'`): Working papers, unpolished notes, story ideas, exercises, code reviews, script drafts.
- **Releases** (`stage: 'polished'`): Polished essays, tools, demos, skills attained, milestones.

### Content Domains
1. `technology` ("Technology"): Systems, code, architecture, demos.
2. `ppe` / `econ-philosophy` ("PPE"): Philosophy, Politics, and Economics.
3. Arts & Letters:
   - `commentary` ("Commentary"): Appraisals and criticism on film, television, and media.
   - `creative` ("Creative"): Poetry, fiction, character studies.

### Schema Specifications (`src/content.config.ts`)
Each entry is a Markdown file in `src/content/entries/<id>.md`:

```yaml
---
title: "Title of Entry"
domain: "technology" | "ppe" | "econ-philosophy" | "commentary" | "creative"
stage: "draft" | "polished"
type: "note" | "essay" | "script-draft" | "video" | "poem" | "story" | "exercise" | "milestone" | "demo"
created: YYYY-MM-DD
published: YYYY-MM-DD # REQUIRED if stage is "polished"
derivedFrom: "parent-entry-id" # Optional: id of draft this grew out of
videoUrl: "https://..." # Optional: URL or YouTube link for embedding
crossPosts: # Optional: external publication links
  - platform: "Substack"
    url: "https://..."
---
```

### The Promotion Rule (Crucial)
When promoting a rough cut to a release:
1. **Do NOT overwrite or delete the rough cut.** The draft stays published.
2. Create a new `.md` file with `stage: 'polished'`, set `published: <today>`, and point `derivedFrom: "<draft-id>"`.
3. The entry page automatically renders the bidirectional lineage (parent link on the release, child links on the draft).

---

## 4. Design & UX Principles

Follow an **attainable baseline design within reason**:
1. **Content-First Readability**:
   - Optimal reading measure: 60–75 characters (`--content-max-ch`).
   - Line height: 1.6–1.65.
   - Clean typographic scale using system fonts and monospace accents for drafts/code.
2. **Centralized Design Tokens**:
   - All colors, fonts, borders, and spacing must be defined in `src/styles/tokens.css`.
   - Never hardcode arbitrary hex colors in component files.
3. **Accessible Visual Differentiation**:
   - **Never rely on color alone** to indicate domain or stage.
   - **Domain**: Conveyed by text badge (`Technology`, `PPE`, `Commentary`, `Creative`) and subtle accent color.
   - **Stage**:
     - *Rough cuts*: Dashed borders, monospace metadata styling, "Rough cut" badge.
     - *Releases*: Solid crisp borders, clean typography, "Release" badge.
4. **Dark Mode Standards**:
   - Supported natively via `<meta name="color-scheme" content="light dark">` in `<head>` and `:root { color-scheme: light dark; }`.
   - Toggle button provides manual override persisted in `localStorage`.

---

## 5. Development & Verification Workflow

Agents must always verify changes locally before completing a task:

```bash
# Run local dev server (hot reloading)
npm run dev

# Run static production build (validates all schemas and routes)
npm run build

# Preview static production build (exact GitHub Pages simulation)
npm run preview
```

### Build Verification Checklist
- [ ] `npm run build` exits with code 0.
- [ ] Polished entries without `published` fail build validation.
- [ ] Lineage links on parent and child entry pages render accurately.
- [ ] Grayscale / high-contrast legibility remains intact.
- [ ] Filter state on `/` responds to dropdown changes and updates URL query parameters (`?stage=...&domain=...`).

---

## 6. Public Repository Rules

- This repository is **public**.
- **Never commit secrets**, API keys, private credentials, or private drafts.
- **Never commit proprietary work** or content derived from employer projects.
- Writing is published under **CC BY 4.0** ([LICENSE-CONTENT](LICENSE-CONTENT)).
- Code is published under the **MIT License** ([LICENSE.md](LICENSE.md)).
