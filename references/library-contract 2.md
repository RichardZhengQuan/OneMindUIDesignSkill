# OneMind UI visual library contract v0.3

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

Every entry must open a rendered neutral specimen through the shared `library.js` controller. A status badge, title, and prose contract without a specimen is incomplete.

- Use the generic renderer when it communicates the structure faithfully; add explicit neutral specimen markup for distinctive contracts.
- Use shared `library.css` semantic tokens for color, type, spacing, radius, elevation/shadow, layout grid, layer/z-index, focus, and motion.
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
