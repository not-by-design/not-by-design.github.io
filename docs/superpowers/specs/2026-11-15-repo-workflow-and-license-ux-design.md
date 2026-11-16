# Repo Workflow and License UX Design

## Intent

Close the remaining TODO items around content planning and the deployed software license page. Make the existing content idea process easy for contributors to find and follow, and give visitors a useful HTML license page with a title and a path back to the publication.

## Goals

- Reference `CONTENT_BACKLOG.md` from the repository's top-level contributor and project documentation.
- Clarify the backlog and brainstorm-file steps without adding unnecessary process.
- Serve the MIT license at `/LICENSE` in an HTML page with a meaningful browser title and a return-to-site link.
- Retain “Not by Design” as the public copyright attribution.
- Record why a separate content brainstorming skill is not being added now, and close the corresponding TODO items.

## Non-goals

- Create a repo-level agent skill in this change.
- Change the content model or create editorial content.
- Change the license terms or attribution.

## Approaches

1. **Document the existing workflow and improve the license page (selected).** Add top-level links and clarify the current backlog-to-brainstorm flow. Replace the plain text asset route with an HTML Astro page that presents the MIT text, has a browser title, and links back to the site. This addresses the stated needs with little new maintenance.
2. **Add a dedicated brainstorming skill.** This could guide a repeated, detailed ideation process, but would duplicate the existing repository workflow instructions and create another artifact to maintain. Defer until there is repeated need.

## Design

Keep `CONTENT_BACKLOG.md` as the index for ideas and `content-brainstorm/` as the home for one plan per idea. Clarify how to assign the next ID and name its matching file, then link to both from `AGENTS.md` and `README.md`. Note in the workflow review that a dedicated skill can be reconsidered if contributors repeatedly need more guidance than these repo instructions provide.

Replace `public/LICENSE` with an Astro `/LICENSE` page using the shared site layout and a meaningful page title. Rename the root license source to `LICENSE.md` so Astro's dev server does not serve the source file at the same `/LICENSE` path as the page; render its text so it remains the canonical source. GitHub recognizes `LICENSE.md` as a standard root license filename. Include a visible link to the home page. Keep the footer link opening in a new tab, now with a clear way back to the publication. Preserve “Not by Design” in the MIT copyright notice.

Update `TODO.md` to mark the completed workflow and license items done and remove or resolve the answered ownership question.

## Constraints and verification

Keep content authoring separate from site and documentation changes. Run `npm run build` and confirm the generated output contains the HTML `/LICENSE` route and the MIT text.
