# Repo Workflow and License UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the content idea workflow discoverable and serve an accessible, titled MIT license page with a way back to the publication.

**Architecture:** Keep the current backlog and brainstorm directory, clarifying their relationship in top-level docs. Replace the static text asset at `/LICENSE` with an Astro page using the shared layout. Rename the root license source to `LICENSE.md` to prevent the Astro dev server from serving it at the route URL, and import it into the page so the legal text has one source of truth.

**Tech Stack:** Astro 5, Markdown documentation, GitHub Pages static output.

**Spec:** `docs/superpowers/specs/2026-11-15-repo-workflow-and-license-ux-design.md`

## Global Constraints

- Keep content authoring separate from site and documentation changes.
- Preserve “Not by Design” as the public copyright attribution.
- Use `CONTENT_BACKLOG.md` as the idea index and `content-brainstorm/` for individual idea plans.
- Do not add a repo-level brainstorming skill in this change.

## Review Focus

- Static and Astro output both claim `/LICENSE`: remove `public/LICENSE`, rename root `LICENSE` to `LICENSE.md` to prevent dev-server root-file shadowing, and confirm build emits only the HTML route.
- License text can drift from the root legal file: import `../../LICENSE.md?raw` and render it escaped in a `<pre>` block.
- Backlog instructions may imply an undefined initial ID: specify incrementing the largest existing numeric ID and use a consistent filename.
- A route can build without a useful title or return path: assert both are present in generated HTML.
- TODO completion must preserve unrelated in-progress work: edit only the relevant unchecked bullets.

---

### Task 1: Document the content idea workflow

**Files:**
- Modify: `CONTENT_BACKLOG.md`
- Modify: `content-brainstorm/README.md`
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `TODO.md`

**Interfaces:**
- Produces: one documented flow: choose the next integer after the largest backlog ID; add a one-line idea to the relevant domain section; create `content-brainstorm/<id>.md`; link each top-level guide to the backlog and brainstorm directory.

- [x] **Step 1: Clarify the backlog's purpose and ID workflow**

Keep the frontmatter intent, state explicitly that this file indexes ideas rather than holding the brainstorm itself, and specify how to choose the next ID and where the one-line entry belongs.

- [x] **Step 2: Clarify the matching brainstorm file convention**

In `content-brainstorm/README.md`, specify `<id>.md`, require the file to refer back to its backlog entry, and describe it as the place to develop and plan the idea.

- [x] **Step 3: Link the workflow from top-level guidance**

Add a concise section in `AGENTS.md` and a brief pointer in `README.md` to `CONTENT_BACKLOG.md` and `content-brainstorm/`.

- [x] **Step 4: Resolve workflow and skill-review TODOs**

Review the project for distinct, recurring workflows that merit repo-level skills. Record in the checked TODO items that content brainstorming is the only plausible candidate, but is deferred because the current lightweight documented flow is sufficient; no other workflow shows enough repeated, specialized steps to justify a skill now. Resolve the answered license-attribution question without changing the attribution.

- [x] **Step 5: Review documentation links and diff**

Run `rg -n 'CONTENT_BACKLOG|content-brainstorm' AGENTS.md README.md CONTENT_BACKLOG.md content-brainstorm/README.md` and inspect `git diff --check` plus the focused diff. Confirm all references resolve and no unrelated TODO items were changed.

### Task 2: Serve a titled HTML license page

**Files:**
- Rename: `LICENSE` → `LICENSE.md`
- Create: `src/pages/LICENSE.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Delete: `public/LICENSE`

**Interfaces:**
- Consumes: root `LICENSE.md` text, imported as `licenseText` from `../../LICENSE.md?raw`.
- Produces: static `/LICENSE` HTML page with a meaningful document title, escaped license text, and a visible `/` return link.

- [x] **Step 1: Replace the public text asset with an Astro route**

Delete `public/LICENSE`. Rename root `LICENSE` to `LICENSE.md`. Create `src/pages/LICENSE.astro`, import `../../LICENSE.md?raw`, render it inside `<pre>` within `BaseLayout`, and set the page title to `MIT License`.

- [x] **Step 2: Add a visible return-to-site link**

Place a clear “Back to Not by Design” link near the license text, targeting `/`.

- [x] **Step 3: Improve footer link semantics**

Keep the footer opening `/LICENSE` in a new tab, and add `rel="noopener noreferrer"` to its link.

- [x] **Step 4: Build and inspect the generated route**

Run `npm run build`. Confirm Astro emits an HTML page for `/LICENSE` containing `<title>MIT License — Not by Design</title>`, the MIT license text, and the return link, with no plain-text `dist/LICENSE` asset shadowing the route. Run the production preview and open `/LICENSE` to confirm the title and return link are visible. Inspect `git diff --check`.

