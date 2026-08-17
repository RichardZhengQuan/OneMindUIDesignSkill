# OneMind UI visual library contract v0.4

Use these definitions to decide where a UI unit belongs.

## Element

An element is the smallest reusable visual or interactive primitive with one responsibility.

Examples: icon, text style, badge, divider, button treatment, input treatment, image treatment, focus ring.

An element may expose variants but must not own feature data loading or a multi-step product workflow.

## Component

A component combines elements into a reusable content or interaction pattern.

Examples: search field, labelled status row, identity summary, repeatable list item, filter menu, side-panel header.

A component owns its interaction contract and accessibility semantics. It may accept product data through props but must not become the authority for persisted product state.

## Page module

A page module combines components into a reusable page section, workspace region, or feature-scale pattern.

Examples: side navigation, detail drawer, title-action list, card grid, split-pane workspace, file editor, inbox-detail layout.

A page module may coordinate local view state. Keep business data, domain authority, route ownership, and feature actions outside it.

## Consuming page

A consuming page composes neutral page modules within the BETA shell, binds business content, and connects the route to application use cases and host adapters.

A consuming page must expose truthful loading, empty, error, permission, blocked, success, and recovery states where relevant. A standalone preview is not route integration.

## Neutral module rule

Catalog modules by structure and behavior. Use placeholder slots, never real people, teams, projects, plans, records, or feature copy.

Correct reusable list module:

```text
[list title] [action]
[list item]
[list item]
[load more]
```

Incorrect reusable list module:

```text
[Team members] [Add]
[Richard]
[Tom]
[Lisa]
[load more]
```

The consuming feature may bind `list title`, `action`, and `list item` slots to its business data. Keep that binding out of `elements.html`, `components.html`, and the page-module library.

## Reuse decision

Extend an existing unit when:

- its purpose and interaction contract remain the same;
- the new behavior can be expressed as a documented variant;
- the variant does not create unrelated conditional branches.

Create a new unit when:

- it owns a different user task or semantic role;
- it requires a different accessibility or state contract;
- extending the old unit would couple unrelated capabilities.

## Library entry schema

Each entry in `elements.html`, `components.html`, or `pages.html` must contain:

```html
<article
  class="library-entry"
  id="stable-kebab-id"
  data-status="draft|ready|deprecated"
  data-scope="shared"
>
  <h2>Human name</h2>
  <p class="purpose">...</p>
  <dl class="contract">...</dl>
  <ul class="dependencies">...</ul>
  <section class="states">...</section>
  <section class="evidence">...</section>
</article>
```

Use links to repository-relative implementation, test, and documentation paths. Describe content as named slots and generic fixtures. Do not paste implementation source or business records into the catalog.

## Visual specimen and cascade contract

The generated objective's `design-settings.js` is the machine-readable authority for global standards. Re-read it from disk before each consuming implementation change. Browser storage may preserve an unsaved preview but never overrides the project file for Codex work.

Persist every in-browser adjustment and Undo result as an objective-scoped unsaved draft immediately, so refreshes and navigation do not silently restore an older value. Keep Save as the only operation that writes or downloads `design-settings.js`; Codex continues to consume the project file, not the browser draft.

Foundation hash links select a panel but never act as native in-page scroll targets. On initial hash load, click navigation, and hash history changes, reset both the settings-main scroll container and document viewport to the top so the shared Reset/Undo/Save row is fully visible.

Every entry must open a rendered neutral specimen through the shared `library.js` controller. Keep maturity in `data-status` and source documentation without rendering maturity pills in the visual library. A title, status metadata, and prose contract without a specimen is incomplete.

- On the Components page, present every selected component through exactly three labelled content sections in order: Description, Adjustments, and Preview area. Description explains purpose and behavior; Adjustments records variants, states, dependencies, constraints, or evidence; Preview area contains the neutral rendered specimen.
- On the Pages page, render every selected page module and page pattern as a borderless, full-size workspace that fills the catalog content pane at desktop and mobile widths. Keep the title, status, description, and contract inside that workspace without wrapping the page in a card or shrinking its specimen back to thumbnail scale.
- Use the generic renderer when it communicates the structure faithfully; add explicit neutral specimen markup for distinctive contracts.
- Use shared `library.css` semantic tokens for color, type, radius, elevation/shadow, layout grid, layer/z-index, focus, and motion. Type authority includes a global family plus independent Title, Subtitle, Body, Content, and Annotation family/size/weight roles. The saved base grid governs alignment; element gaps govern internal content-to-container spacing; component gaps govern spacing between controls, components, panels, and page regions. Both gap values must be integer multiples of the base grid.
- Apply saved style and button treatment to every dependent element, component, page module, page pattern, and consuming feature; do not limit a settings change to catalog previews.
- Apply the same contract to the objective library shell itself, including navigation, rails, workspaces, catalog entries, controls, and action buttons. Grid controls must cascade through shell alignment, internal element spacing, and separation between panels and components.
- Treat each separate navigation link, action button, form control, catalog entry, preview card, rail, panel, and page region as a component boundary: spacing between those boundaries uses `componentGap`. Spacing inside one boundary, such as icon-to-label distance or content-to-control edge padding, uses `elementGap`.
- Keep configurable gaps visually measurable. A shadow or decorative effect on a child must not occupy the clear space represented by `componentGap`; elevate the containing floating rail or panel instead of shadowing every row inside it.
- Keep sibling action controls in one horizontal component row at every supported content-panel width. The action row sits one `componentGap` from its containing panel edge and one `componentGap` from the next page region; an empty status message must not reserve space.
- Button height is shared by action buttons and button-like navigation controls. Primary drawer links, secondary rail links, catalog disclosure controls, and preference actions must consume `buttonHeight`; they must not retain a separate fixed or Size-derived control height.
- Do not provide a global Size foundation. Font role sizes own typography, `buttonHeight` owns control height, and the base grid plus element/component gaps own spatial scale. Older drafts or imported contracts containing a top-level `size` setting must be migrated away or rejected.
- Treat `buttonHeight` as the exact border-box height, not only a minimum. Center single-line button content within that box and contain long labels with the library's existing ellipsis behavior instead of allowing padding or line-height to enlarge the control.
- Button-like drawer and rail navigation uses exactly one `elementGap` on every inset edge. Do not multiply horizontal padding independently; when `elementGap` is 1px, both left and right padding must compute to 1px.
- High-level drawer edges and content-region insets use exactly one `componentGap`, without viewport clamps or multipliers. Preference actions remain a component-spaced group but do not draw a separator line above Language.
- Drawer and rail headings inherit their horizontal inset solely from the containing panel. Their own left/right margin and padding are zero, preventing a nested inset from doubling the configured `componentGap`.
- Make every page respond to the width of its actual content panel after navigation rails are allocated, not only to the browser viewport. Style choices, standards documents, component specimens, page specimens, settings controls, and license content must reflow without horizontal escape.
- Never freeze shared token values inside a component or page preview.
- After changing an element or token, inspect every dependent component, page module, page pattern, and consuming feature. Update all affected contracts and previews in the same change.
- Keep controls keyboard-operable with native buttons, `aria-expanded`, `aria-controls`, visible focus, and honest disabled state.
- Preview business-shaped structures only through generic content slots.

## Status promotion

- Keep an entry `needed` while it is only required by a roadmap, lifecycle, disabled destination, blank canvas, or design proposal.
- Move it to `candidate` when an implementation or composition exists but remains route-bound, incompletely documented, host-unverified, or missing a required rendered/integrated gate.
- Move it to `ready` only after implementation, canonical documentation, neutral public contract, dependencies, light/dark behavior, desktop browser and macOS-host behavior, applicable states, accessibility, localization, focused tests, and rendered evidence are present.
- Move it back to `candidate` when the current repository disproves a ready contract or a regression invalidates required evidence.

Record the source commit or branch used for promotion. Focused evidence never upgrades a route or full product lifecycle by itself.
