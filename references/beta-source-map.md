# OneMind BETA source map v0.3

Treat this file as discovery guidance, not repository authority. Re-read the current checkout and `origin/BETA` before work.

Catalog snapshot: `origin/BETA` `e3cd17a2bbc83d88d8a57a4104ec39c371d9f67d`, audited 2026-08-13.

## Canonical inspection order

1. `AGENTS.md`
2. `docs/components/README.md` and `#docs/components`
3. `src/components/beta-*` and reusable `src/components`
4. `src/beta`
5. the relevant entry under `apps/beta-*-web`
6. focused tests and Vite configuration
7. `script/build_beta_macos_app.sh` only when macOS-host packaging is in scope

## BETA implementation map

- Shared product UI: `src/beta`
- BETA reusable navigation: `src/components/beta-navigation`
- BETA public/landing components: `src/components/beta-landing`
- Additional BETA component families: `src/components/beta-*`
- Mind reading/editing: `src/components/mind-editor`, `src/components/mind-file-editor`, `src/components/mind-pull-request`
- Notification Inbox/detail: `src/components/notification`
- Signed-in product shell and route registry: `src/beta/notification/BetaNotificationProductApp.tsx`
- BETA Team workspace: `src/components/beta-team`
- BETA Mind workspaces: `src/beta/components/BetaMindPage.tsx`, `BetaMindPullRequestPage.tsx`
- BETA checkout: `src/beta/checkout`
- BETA knowledge analysis: `src/beta/knowledge-analysis`
- BETA update components: `src/components/beta-update`
- Public entry: `apps/beta-public-web`
- Product entry: `apps/beta-web`
- Sign-in entry: `apps/beta-signin-web`
- Settings entry: `apps/beta-settings-web`
- Matrix entry: `apps/beta-matrix-web`
- Canonical component documentation: `docs/components/README.md`
- Shared macOS artifact packaging: `script/build_beta_macos_app.sh`

Do not add BETA UI to legacy `src/App.tsx` when a dedicated BETA entry exists.

## Discovery commands

```bash
git status --short --branch
git fetch origin BETA
git rev-parse origin/BETA
rg --files src/beta src/components apps/beta-* docs/components
rg -n "<feature|component|route>" src/beta src/components apps/beta-* docs/components
```

When inventorying the complete BETA surface, also inspect disabled destinations and empty canvases. At the v0.3 catalog snapshot, the signed-in Matrix destination is disabled and `BetaMatrixPage` contains an empty canvas; classify the populated Matrix workspace as Needed until live source proves otherwise.

Do not fetch, switch, merge, or rebase when the user's state boundary forbids it.

## Applicable BETA gates

Choose the focused test and build that match the changed surface:

```bash
pnpm test:beta-public-web
pnpm test:beta-signin-web
pnpm test:beta-web
pnpm test:beta-settings-web
pnpm test:beta-matrix-web

pnpm build:beta-public-web
pnpm build:beta-signin-web
pnpm build:beta-web
pnpm build:beta-settings-web
pnpm build:beta-matrix-web
```

When shared macOS-host packaging is explicitly in scope:

```bash
pnpm package:beta-macos
```

Also run repository-mandated component, localization, internal-documentation, image-format, browser, or host-lifecycle checks that apply to the actual diff.

## v0.3 platform boundary

- Design and implement desktop shared HTML UI.
- Preserve browser and macOS-host compatibility.
- Do not create a separate SwiftUI version of a product page.
- Record mobile behavior as deferred unless the current project instructions explicitly bring it into scope.
- Keep native-only capabilities behind versioned, allowlisted host adapters.
