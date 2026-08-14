# OneMind BETA neutral visual module catalog v0.4

This catalog was audited against `origin/BETA` at `e3cd17a2bbc83d88d8a57a4104ec39c371d9f67d` on 2026-08-13. Treat it as a baseline, not live repository authority.

## Status rules

- **Ready** means the reusable contract is implemented and documented in `docs/components/README.md`, with applicable interaction, state, localization, theme, and host evidence.
- **Candidate** means BETA contains the structure, but it is still route-bound, incompletely documented, or missing an integrated gate.
- **Needed** means the intended BETA product lifecycle requires the module, but current BETA does not provide it truthfully as a reusable contract.

Before changing a status, inspect the current implementation, canonical component documentation, focused tests, rendered route, and host boundary. Keep business nouns and records out of reusable examples.

## Foundation elements

| ID | Status | Neutral contract | Current evidence |
| --- | --- | --- | --- |
| `semantic-color-system` | Ready | Background, surface, main text, inverse text, line, selected, link, active, danger, and focus roles with light/dark parity. | `src/beta/styles.css`, `src/components/beta-navigation/OneMindBetaNavigation.css` |
| `elevation-shadow-system` | Ready | Semantic depth levels for canvas, structural boundary, floating content, and modal focus. | canonical BETA main-view, side-panel, dialog, and overlay treatments |
| `layout-grid-system` | Ready | Shared shell regions for menu, clearance, fixed rails, flexible content, and inspector. | BETA navigation, Settings, Team, Mind, and Notification workspaces |
| `layer-z-index-system` | Ready | Named content, navigation, overlay, dialog, and transient-feedback stacking roles. | canonical BETA navigation, side-panel, dialog, and feedback layering |
| `type-role-system` | Ready | System-sans hierarchy for page title, section title, body, compact label, metadata, and action text. | `docs/components/README.md`, BETA component styles |
| `spacing-density-system` | Ready | 64px title/header grammar; 40px controls; 12px list insets/gaps; 24px content insets; 256px rails. | navigation, Settings, Team, Mind documentation |
| `surface-divider-treatment` | Ready | Open surfaces, subtle structural lines, selected surfaces, and the shared left-facing main-view shadow. | BETA navigation and workspace styles |
| `focus-ring-treatment` | Ready | Visible 2px semantic focus ring with separation from the controlled surface. | canonical component interaction contracts |
| `button-treatment` | Ready | Text, icon, inverse-primary, danger, disabled, loading, hover, focus, and pressed variants without default blue-primary identity. | `OneMindButton`, BETA pricing and pull-request actions |
| `icon-action-treatment` | Ready | Decorative theme-paired asset inside one named 30px or 40px native button. | navigation, Team, file, Mind, and update icon components |
| `form-control-treatment` | Ready | Labelled text, text-area, select, switch, validation, description, disabled, loading, and recovery behavior. | canonical form controls and BETA Settings/pull-request forms |
| `status-tag-treatment` | Ready | Text-redundant status dot/tag using success, warning, error, selected, and neutral roles. | Team, Notification, Mind, and Settings surfaces |
| `identity-avatar-treatment` | Ready | Fallback-safe person/tool identity image with explicit sizes, names, and non-color status. | `OneMindPersonAvatar`, Team workspace |
| `selection-row-treatment` | Ready | Transparent rest, selected surface, hover, focus-visible, pressed, disabled, truncation, and current-state semantics. | side drawer, Team lists, Mind navigation, notification rows |
| `scrim-dialog-treatment` | Ready | Dismissible scrim, inert background, focus trap/restoration, scroll lock, Escape behavior, and portal theme parity. | `OneMindSidePanel`, `OneMindConfirmDialog`, Notification detail |
| `motion-state-treatment` | Ready | Reduced-motion-safe transitions; motion never carries status or direction meaning alone. | BETA navigation, public story, Team scanning, update controls |

## Reusable components

| ID | Status | Neutral slots and behavior | Current evidence |
| --- | --- | --- | --- |
| `title-action-list` | Ready | Title, optional action, repeatable neutral rows, selected/loading/empty states, and load-more control. | shared list composition contract used across BETA navigation and inbox surfaces |
| `public-menu-bar` | Ready | Brand, primary destinations, language, display mode, optional host utility, and primary action. | `BetaMenuBar` |
| `side-drawer` | Ready | Brand, global destinations, identity summary, preferences, settings, expanded/folded modes. | `OneMindSideDrawer` |
| `side-drawer-toggle` | Ready | External fold control with current state, labels, focus, and theme artwork. | `OneMindSideDrawerToggle` |
| `contextual-side-navigation` | Ready | Page-owned hierarchy and actions, distinct from global navigation. | `OneMindBetaSideNavigation` |
| `main-view-boundary` | Ready | Flexible content boundary beside global or contextual rails. | `OneMindBetaMainView` |
| `side-floating-panel` | Ready | 512px or 768px modal side overlay with title, close, scrollable content, and focus restoration. | `OneMindSidePanel` |
| `mode-title-bar` | Ready | Window-level mode label above the normal product shell. | `OneMindQuickStartTitleBar` |
| `preference-radio-menu` | Ready | Trigger plus localized radio menu for mutually exclusive preferences. | menu bar and side drawer preference controls |
| `settings-row` | Ready | Optional decorative icon, label, supporting copy, current value, and optional trailing action. | `BetaSettingsPage` canonical contract |
| `identity-navigation-list` | Ready | Repeatable person/tool rows with selection, identity, metadata, status, and action slots. | `BetaTeamSideNavigationList` |
| `filter-radio-menu` | Ready | Menu-button filter with radio choices, keyboard traversal, outside/Escape dismissal, and focus return. | `BetaTeamFilterMenu` |
| `profile-edit-panel` | Ready | Validated form inside a side panel that preserves input on recoverable failure and closes only after authoritative confirmation. | `BetaTeamProfilePanel` |
| `notification-inbox` | Ready | Family filters, scoped rows, read hierarchy, loading/empty/error states, and selected-detail handoff. | `OneMindNotificationInbox` |
| `notification-detail-drawer` | Ready | Evidence summary, process details, optional governed action, dismissal, and source-row focus return. | Notification Inbox detail contract |
| `notification-family-icon` | Ready | Theme/read-state family artwork with decorative semantics. | `OneMindNotificationFamilyIcon` |
| `file-inventory` | Ready | Required base row, added-file rows, upload, edit/remove actions, path, type, size, and atomic failure. | `OneMindMindPullRequestFileList` |
| `markdown-file-editor` | Ready | Visual Markdown canvas, toolbar, Markdown round-trip, unsaved state, and accessible file context. | `OneMindMindFileEditor`, `OneMindMindEditor` |
| `confirmation-dialog` | Ready | Named consequence, confirm/cancel, danger or neutral mode, busy guard, dismissal, and focus restoration. | `OneMindConfirmDialog` |
| `conflict-report` | Ready | Blocking/advisory findings, immutable evidence identity, acknowledgement, decision boundary, and no auto-resolution claim. | `OneMindConflictCheck` |
| `pricing-card-grid` | Ready | Audience tabs, plan cards, capability rows, one selected plan, truthful action state, and disclosure. | `OneMindBetaPricingCards` |
| `landing-scene` | Ready | Viewport-sized public section with background, content, action, and active-state slots. | `OneMindBetaLandingScene` |
| `horizontal-story` | Candidate | Sticky multi-panel journey with scrubber, direction, entry state, keyboard stops, and reduced motion. | `OneMindBetaHorizontalStory`; focused evidence exists, final strict interaction gate remains separate |
| `tool-logo-cloud` | Candidate | Neutral identity-tile cloud with pointer/keyboard repositioning, active-item reporting, and reduced motion. | `OneMindBetaAIToolLogoCloud`; final lifecycle verification remains separate |
| `site-footer` | Ready | Narrative slot, grouped navigation, legal destinations, locale fit, and full-width legal row. | `OneMindBetaSiteFooter` |
| `host-utility-action` | Ready | One icon-only action supplied by a typed browser/macOS host adapter. | `OneMindBetaHostUtilityAction` |
| `software-update-availability-action` | Ready | Conditional shared-HTML action shown only after the native host reports an available version. | `OneMindBetaSoftwareUpdateButton` |
| `sign-in-process-banner` | Candidate | Opening, waiting, error, retry, cancel, and status announcement around a host sign-in handoff. | public and dedicated BETA sign-in entries |
| `authoritative-receipt-detail` | Candidate | Decision/outcome, subject and context digests, fingerprint, agent/version identity, and receipt identifier. | Notification Safe Check and Conflict Check detail contracts |
| `async-state-boundary` | Needed | Stable loading, empty, offline, stale, permission-limited, failure, retry, and recovery composition usable by every product module. | states exist per page but no canonical BETA-wide component contract |

## Page modules

| ID | Status | Neutral composition | Current evidence |
| --- | --- | --- | --- |
| `public-landing-frame` | Ready | Public menu plus one active full-screen scene and sign-in process feedback. | `BetaPublicApp`, `BetaLandingPage` |
| `public-pricing-scene` | Ready | Scene frame plus pricing cards and sign-in/checkout prerequisite action. | BETA landing pricing composition |
| `public-about-footer-scene` | Ready | Full-screen narrative visual plus grouped site footer. | BETA About/footer composition |
| `signed-in-app-shell` | Candidate | Global side drawer plus one routed main-view surface, preferences, update accessory, and unsaved-transition guard. | `BetaNotificationProductApp`; Matrix is disabled and session authority is incomplete |
| `settings-rail-detail-workspace` | Ready | Fixed section rail, compact title row, settings rows, and side-panel edit flows. | `BetaSettingsPage` |
| `three-pane-identity-workspace` | Ready | Primary identity rail, selected identity/tool rail, and flexible profile detail pane. | `BetaTeamPage` |
| `document-inspector-workspace` | Ready | Context rail, immutable document canvas, inspector, history, and change-request entry actions. | `BetaMindPage` |
| `change-request-composer` | Ready | Action title row, authority context, metadata fields, file inventory, local draft recovery, Save, and Send. | `BetaMindPullRequestPage` |
| `notification-inbox-detail-workspace` | Ready | Title/toggle, authoritative inbox, filters, detail drawer, and governed detail actions. | `BetaNotificationPage`, `OneMindNotificationInbox` |
| `checkout-summary-payment-workspace` | Candidate | Selected plan, quantity, price summary, authoritative transaction state, payment overlay, success/failure recovery. | `BetaCheckoutPage`; integrated production billing coverage remains separate |
| `sign-in-entry-surface` | Candidate | Public menu, sign-in action, preference menus, and host process feedback. | `BetaSignInEntry`; current authorization still depends on the Alpha endpoint |
| `governance-canvas-workspace` | Needed | Authority navigation, accepted document/context state, governance activity, and truthful loading/recovery states. | current `BetaMatrixPage` renders an empty canvas; signed-in Matrix destination is disabled |
| `guided-start-workflow` | Needed | Host-aware mode title, objective selection, draft, safety check, submission, and handoff to approval. | only the title bar and host link boundary are ready |
| `approval-decision-workspace` | Candidate | Evidence detail, blockers/advisories, acknowledgement, approve/reject actions, and authoritative result. | Notification and Conflict Check provide parts; complete Mind lifecycle integration remains unproven |
| `sync-receipt-recovery-workspace` | Needed | Scope review, backup, apply progress, verification receipt, failure recovery, and rollback action. | required by BETA lifecycle; not present as a reusable shared-HTML module |
| `native-update-panel` | Ready | Compact macOS-only current/checking/available/downloading/restarting/failure panel. | `BetaSoftwareUpdateView` and native update use case |

## Route-level patterns

| ID | Status | Composition rule |
| --- | --- | --- |
| `shared-public-four-scene` | Ready | One shared HTML menu and Home, Practice, Pricing, and About scenes across browser and macOS host. |
| `shared-signed-in-shell` | Candidate | One shared HTML global rail and route registry; do not call it complete until Matrix and authoritative session ownership are live. |
| `rail-detail-settings` | Ready | Fixed section rail plus flexible detail with side-panel mutations. |
| `three-pane-identity` | Ready | Two fixed hierarchy rails plus a flexible detail pane; preserve internal horizontal scrolling in compact hosts. |
| `document-read-inspect` | Ready | Context navigation plus immutable readable document and inspector; mutation begins in a separate proposal flow. |
| `draft-review-submit` | Candidate | Recoverable local draft, validation, authoritative submission receipt, and transition to review without claiming publication. |
| `inbox-detail-action` | Ready | One authoritative inbox, family filters, durable evidence drawer, and optional governed decision. |
| `prerequisite-checkout` | Candidate | Preserve selected plan through sign-in, then create the authoritative transaction and payment overlay. |
| `native-capability-handoff` | Ready | Shared HTML presents availability and intent; a versioned allowlisted host adapter performs the native capability. |
| `authoritative-product-lifecycle` | Needed | Sign in -> load Matrix/Mind -> draft -> safety check -> submit -> second-admin approval -> immutable version -> assignment -> backup/apply -> receipt -> rollback. |

## Product truth and host boundaries

- Render one shared HTML/CSS/JavaScript product in the browser and macOS WKWebView.
- Keep Keychain, filesystem, AI-tool discovery, notifications, application update, windowing, and background runtime behind narrow versioned host adapters.
- Keep identity, permission, accepted Mind state, approval, provenance, audit, recovery, and publication under Matrix and application authority.
- Do not treat fixtures, local storage, disabled destinations, blank canvases, host-unverified previews, or passing focused tests as integrated product completion.
- Keep mobile web outside v0.4 unless current project instructions explicitly add it.
