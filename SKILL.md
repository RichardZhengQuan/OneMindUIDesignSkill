---
name: onemind-ui-design
description: Design, build, change, review, show, or open neutral OneMind BETA UI modules and guidelines as fully local, offline, serverless HTML/CSS/JavaScript, SVG, Markdown, and deterministic file artifacts. Use for clickable visual specimens, page patterns, page modules, reusable components, UI elements, color systems, shadows and elevation, layout grids and layers, tokens, interaction states, component-library work, shared HTML UI intended for both the website and macOS host, BETA module inventory work, or requests such as "show the library" and "open the UI library." Resolve the guide and visual catalog first, reuse ready page modules before components and components before elements, propagate lower-level token and module changes through dependent previews and consuming pages, keep candidate and needed status truthful, never store business-specific UI in the library, and never start or depend on a local or remote server.
---

# OneMind UI Design v0.4

Build OneMind BETA UI through a traceable hierarchy:

`design guide -> style -> elements -> components -> page modules -> feature page`

Preserve one shared HTML/CSS/JavaScript product implementation for browser and macOS hosts. Do not create a parallel SwiftUI product surface.

## Keep the skill local and serverless

Use only checked-out project files, files bundled with this skill, and temporary local files created deterministically from them.

- Build the library from static HTML, CSS, JavaScript, SVG, Markdown, and local legal files. Local scripts may copy, resolve, or validate those files.
- Never start or require a localhost server, preview server, development server, API server, proxy, or container.
- Never contact a remote service from the skill workflow. Do not use remote APIs, CDNs, analytics, hosted fonts, external scripts, remote images, or network-fetched content. The explicit GitHub and OneMind homepage actions may navigate externally only when the user chooses them; they must never load resources into the offline library.
- Resolve every library entry to a normal filesystem path and optional `file://` URI. If a browser cannot open local files, return the clickable local path; do not start a server as a fallback.
- Represent authority-dependent product behavior as static interface contracts and truthful UI states only. Do not sign in, submit mutations, or connect to Matrix or another backend while operating this design skill.

## Keep the library neutral

Store modules, structural placeholders, behavior, states, and composition rules in this skill. Do not store business instances, real names, domain records, or feature-specific copy as reusable UI.

Use this form:

```text
[list title] [action]
[list item]
[list item]
[load more]
```

Do not save this form as a reusable module:

```text
[Team members] [Add]
[Richard]
[Tom]
[Lisa]
[load more]
```

Bind business nouns, records, permissions, and copy only in the consuming feature. Name modules by structure and behavior, such as `title-action-list`, not by a business object, such as `team-member-list`.

## Start safely

1. Read the target repository's `AGENTS.md` and current UI instructions.
2. Confirm the target is BETA work. Inspect the current branch, dirty state, and current local BETA source before editing. Preserve unrelated work.
3. Inspect `#docs/components`, `docs/components/README.md`, `src/components`, `src/components/beta-*`, and relevant `src/beta` code before designing.
4. Read [references/beta-source-map.md](references/beta-source-map.md) for BETA-specific discovery and verification commands.
5. Read [references/beta-module-catalog.md](references/beta-module-catalog.md) for the neutral baseline inventory and status rules.
6. Treat the local checkout as implementation authority. Never assume this skill's source map or module catalog is newer than the checkout, and do not fetch remote state as part of this skill.

## Use the BETA baseline catalog

Start from the baseline inventory instead of rediscovering common BETA structures for every feature.

- `ready`: implemented, canonically documented, reusable, and supported by applicable state and host evidence.
- `candidate`: implemented or composed in BETA, but still route-bound, incompletely documented, or missing an integrated gate. Inspect and promote it only after closing that gap.
- `needed`: required by the intended BETA lifecycle but not yet truthfully implemented as a reusable module.

Never downgrade a repository-confirmed ready module because the skill snapshot is old. Never upgrade a candidate or needed module from the skill alone. Record the current source path and evidence when status changes.

## Keep a visual, cascading library

Make every entry inspectable as a neutral rendered specimen. A title and status alone are not a library preview.

- Keep color, typography, spacing, radius, shadow/elevation, layout-grid, layer/z-index, focus, and motion values in the shared `library.css` token layer.
- Build element specimens from those tokens; build component specimens from elements; build page-module and page-pattern specimens from components.
- When a lower-level token or module changes, update its dependent previews and consuming feature styles in the same objective. Never leave page specimens showing the retired contract.
- Let `library.js` give every registered entry a clickable, keyboard-operable fallback preview. Add explicit neutral markup when a generic fallback cannot communicate the contract.
- Structure every component detail as three labelled sections in this order: `Description`, `Adjustments`, and `Preview area`. Put purpose copy in Description, documented variants/states/dependencies/evidence in Adjustments, and the rendered neutral specimen in Preview area.
- Give every selected page module and page pattern a borderless, full-size workspace that fills the catalog content pane at desktop and mobile widths; never wrap the page in a card or reduce its composition to a fixed-height thumbnail.
- Keep previews structural: use labels such as `List title`, `List item`, `Action`, `Field label`, and `Main content`, never real product records.
- Preserve light/dark parity and named layers: content, navigation, overlay, dialog, and transient feedback.

## Initialize the objective library

Use one slug per feature objective:

```bash
python3 <skill-dir>/scripts/init_objective_library.py \
  --project-root <project-root> \
  --objective "Feature name"
```

This creates `docs/design/<objective-slug>/index.html`, `guide.html`, `style.html`, `elements.html`, `components.html`, `pages.html`, `library.css`, `design-settings.js`, and `library.js` without overwriting existing files. A first-time install receives the full visual OneMind BETA baseline, not an empty catalog. The files remain editable for objective-specific additions.

If the repository already defines an equivalent governed design-library location, use it instead and preserve the five artifact roles.

## Treat saved standards as live project authority

`docs/design/<objective-slug>/design-settings.js` is the durable, objective-scoped machine-readable standard. Browser `localStorage` is preview state only and is never authority for Codex work.

- Before every build, change, review, or continuation for an objective, re-read `design-settings.js` from disk, then re-read the affected standards, elements, components, and page contracts. Do not rely on an earlier conversation summary or a previously loaded copy.
- Map every supported setting to the consuming product's semantic tokens and canonical components. Style, semantic colors, the base alignment grid, element gaps, component gaps, the global font family, semantic Title/Subtitle/Body/Content/Annotation type roles, radius, elevation, motion, and button treatment apply to every affected environment and dependent surface in the objective. Element and component gaps must remain integer multiples of the saved base grid. Do not create a global Size foundation: Font roles own type size, Button owns control height, and Grid owns spatial scale.
- Render the objective library itself from those same saved tokens. Its home, drawers, contextual navigation, content workspaces, controls, component catalog, page catalog, and previews must visibly update together; the settings page is not allowed to demonstrate a different system from the rest of the library.
- When the user says they changed or saved the library, re-read the file before editing product code. Report the contract's `updatedAt` value as evidence that the newest version was consumed.
- The HTML Save action must write or export a complete `design-settings.js` contract. When the browser supports local file saving, the user replaces the objective's existing `design-settings.js` in the file picker. When it only downloads the contract, stop and ask the user to place that file at the objective path before continuing; never pretend browser-only state changed the project.
- Import a downloaded fallback only after the user identifies the exported file:

```bash
python3 <skill-dir>/scripts/import_design_settings.py \
  --project-root <project-root> \
  --objective <objective-slug> \
  --settings-file <downloaded-design-settings.js>
```

- Keep draft browser storage scoped by objective. Never share one settings key across objective libraries.
- If the contract is missing, invalid, for another objective, or older than the user's reported save, treat the library as unresolved and do not build from defaults silently.

## Show the library

Treat “show the library,” “open the library,” and equivalent requests as an instruction to open the neutral design library, not to render business records.

Resolve the local library entry:

```bash
python3 <skill-dir>/scripts/show_library.py \
  --project-root <project-root> \
  [--objective <objective-slug>]
```

The command prints JSON containing the selected local path and `file://` URI, plus explicit offline and network-free status. If one objective exists, select it. If several exist and no objective is specified, create a temporary local hub linking all objective libraries. If no objective library exists, render the populated OneMind BETA baseline into a temporary local directory. Do not modify project files merely to show them, and never open files directly from `assets/objective-library` because those are unresolved source templates.

Return or open it using this order:

1. Return the local entry path as the durable deliverable.
2. If the user asked to open it and the in-app Browser supports local files, open the returned `file://` URI in a new in-app tab.
3. Otherwise, if the user asked to open it, use the local operating-system browser without a server:

```bash
python3 <skill-dir>/scripts/show_library.py \
  --project-root <project-root> \
  [--objective <objective-slug>] \
  --open-default
```

4. If local-file opening is blocked, report the clickable local path and stop. Never replace the failed local-file open with an HTTP server or remote upload.

The generated baseline or hub must work offline. Its relative links must open populated guide, style, element, component, page, and license artifacts with no unresolved template tokens. Clicking an entry must expose its rendered specimen and contract without a network request.

## Resolve the design guide

Open `guide.html`, then `style.html`, and read `design-settings.js` from disk before designing.

- If the direction is set, verify it covers product intent, audience, content hierarchy, layout, color, typography, density, interaction behavior, required states, accessibility, localization, and validation.
- If it is not set, ask one compact question covering the missing style, color, layout, and product details. Record the answer and any explicit assumptions in `guide.html` before implementation.
- If the request includes a screenshot, mockup, or reference, extract its information hierarchy and interaction intent. Do not copy accidental visual defects.
- Define the page pattern's loading, empty, error, blocked, permission, success, and recovery behavior where applicable. Express examples with neutral placeholders.

Do not build from an undocumented visual guess.

## Apply the reuse-first decision tree

Classify every needed UI unit using [references/library-contract.md](references/library-contract.md).

1. **Page module exists:** reuse it and build the feature page.
2. **Page module is a candidate:** inspect its current source and gaps. Reuse only the proven contract, or complete and promote it before treating it as ready.
3. **Page module is missing, component exists:** compose the page module from ready components, register it in `pages.html`, then build the page.
4. **Component is missing, elements exist:** compose the reusable component from ready elements, register it in `components.html`, build and register the page module, then build the page.
5. **Element is missing:** create the reusable element, register it in `elements.html`, then build and register each dependent component and page module before building the page.

At every level:

- Reuse behavior and semantics, not only appearance.
- Keep library names, previews, fixtures, and catalog examples domain-neutral.
- Extend a ready asset when the new need is a compatible variant; create a new asset when responsibilities or interaction contracts differ.
- Keep route-specific data loading and product authority outside presentational elements and components.
- Never duplicate a library asset locally to avoid updating its contract.
- Tell the user before creating a missing reusable asset, unless the active request already explicitly authorizes creating it.

## Register library entries

Give every reusable entry a stable kebab-case ID. Record:

- structural purpose and design-system scope;
- implementation and test paths;
- public props or composition contract;
- dependencies by stable library ID;
- light and dark behavior;
- desktop web and macOS-host behavior;
- mobile status as supported or explicitly deferred for v0.4;
- hover, focus, pressed, disabled, loading, empty, error, and recovery behavior as applicable;
- accessibility, localization, and content-slot requirements;
- evidence and maturity: `draft`, `ready`, or `deprecated`.
- a clickable neutral visual specimen or a deliberate use of the shared fallback renderer;
- dependent previews and consuming pages that must change when this contract changes.

When a reusable component becomes ready, also update the canonical OneMind component documentation and `#docs/components` surface. Document neutral slots and behavior there. The objective HTML catalogs provide design provenance; they do not replace the repository-wide component library.

## Apply modules to the consuming page

1. Compose from registered neutral page modules and components.
2. Bind feature copy, records, permissions, and product actions only at the consuming page or adapter layer.
3. Keep one clear primary task and truthful product state.
4. Use the BETA shell, navigation, tokens, copy system, and host adapters already present.
5. Keep Matrix and application authority boundaries explicit as static state contracts. Never let placeholder fixtures, local storage, or no-op controls imply a completed mutation, and never call an authority service from this skill.
6. Keep browser and macOS-host UI code shared. Put Keychain, filesystem, notifications, updater, window, or runtime behavior behind a narrow host adapter.
7. Update every supported language when changing user-facing text.
8. Re-render affected component, page-module, and page-pattern specimens after changing a foundation token or lower-level module. Treat stale dependent previews as a failed change.

## Verify before output

Run the narrowest relevant checks first, then the applicable BETA gates from [references/beta-source-map.md](references/beta-source-map.md).

Verify all of the following:

- library hierarchy, neutral naming, and dependency direction;
- clickable visual specimens for every registered element, component, page module, and page pattern;
- propagation of color, shadow/elevation, layout, layer, typography, spacing, radius, focus, and motion tokens through dependent previews;
- TypeScript and focused tests;
- relevant BETA web build;
- light and dark rendered behavior;
- target desktop sizes and macOS-host constraints;
- keyboard, focus, hover, pressed, disabled, loading, empty, error, and recovery behavior;
- accessible names, semantics, contrast, and reduced motion where applicable;
- localization fit and content truth;
- actual route integration, not a standalone preview only;
- the same built artifact in browser and macOS host when host work is in scope.
- zero local-server, remote-server, CDN, API, analytics, hosted-font, or other network dependency in the design-library artifact and workflow.

Validate the objective library:

```bash
python3 <skill-dir>/scripts/validate_objective_library.py \
  --project-root <project-root> \
  --objective <objective-slug>
```

Treat blocked local rendered or host verification as unresolved. Report focused evidence separately from integrated BETA readiness. Do not use a server or remote deployment to bypass a local verification block.

## Return the feature output

Report:

1. the consuming page and route produced;
2. reused page modules, components, and elements;
3. new library assets and their catalog IDs;
4. design-guide decisions or assumptions;
5. tests and rendered evidence;
6. unresolved risks, deferred modes, or authority gaps.

Do not call a feature complete merely because its static page renders. Do not call a business-specific composition a reusable library module.
