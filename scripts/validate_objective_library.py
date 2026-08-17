#!/usr/bin/env python3
"""Validate required OneMind UI Design v0.4 offline visual catalogs."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


SKILL_VERSION = "0.4"
TYPE_ROLES = {"title", "subtitle", "body", "content", "annotation"}
TYPE_FAMILIES = {"inherit", "system", "humanist", "serif", "mono"}
TYPE_WEIGHTS = {400, 500, 600, 700}
ALLOWED_OUTBOUND_URLS = {
    "https://github.com/RichardZhengQuan/OneMindUIDesignSkill",
    "https://onemind.team",
}
REQUIRED = {
        "index.html": ("library-home-hero", "library-navigation", "library-home-footer"),
    "guide.html": ("design-brief", "visual-direction", "layout-hierarchy", "state-contract", "authority-contract", "validation-plan"),
    "style.html": ("style-library", "style-choice-list", "style-lines", "style-floating"),
    "elements.html": ("element-library", "semantic-color-system", "layout-grid-system", "type-role-system", "radius-system", "elevation-shadow-system", "motion-state-treatment", "button-system"),
    "components.html": ("component-library", "title-action-list", "side-drawer", "side-floating-panel", "notification-inbox", "file-inventory"),
    "pages.html": ("page-module-library", "page-pattern-library", "signed-in-app-shell", "authoritative-product-lifecycle"),
    "license.html": ("open-source-licenses", "project-license", "iconpark-notice"),
    "library.css": (),
    "design-settings.js": (),
    "library.js": (),
    "LICENSE": (),
    "THIRD_PARTY_NOTICES.md": (),
    "licenses/IconPark-Apache-2.0.txt": (),
    "assets/onemind-beta-mark-light.svg": (),
    "assets/onemind-beta-mark-dark.svg": (),
    "standards/design-brief.md": (),
    "standards/visual-direction.md": (),
    "standards/layout-hierarchy.md": (),
    "standards/state-contract.md": (),
    "standards/authority-host.md": (),
    "standards/validation-plan.md": (),
}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if not slug:
        raise ValueError("objective must contain at least one letter or number")
    return slug


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", required=True, type=Path)
    parser.add_argument("--objective", required=True)
    args = parser.parse_args()

    root = args.project_root.expanduser().resolve()
    target = root / "docs" / "design" / slugify(args.objective)
    errors: list[str] = []

    for name, required_ids in REQUIRED.items():
        path = target / name
        if not path.is_file():
            errors.append(f"missing {path}")
            continue
        content = path.read_text(encoding="utf-8")
        if path.suffix == ".html" and f'name="onemind-ui-design-version" content="{SKILL_VERSION}"' not in content:
            errors.append(f"{name}: missing v{SKILL_VERSION} metadata")
        if path.suffix == ".css" and f"OneMind UI Design v{SKILL_VERSION}" not in content:
            errors.append(f"{name}: missing v{SKILL_VERSION} banner")
        if "{{" in content or "}}" in content:
            errors.append(f"{name}: contains an unresolved template token")
        for required_id in required_ids:
            if f'id="{required_id}"' not in content:
                errors.append(f'{name}: missing id="{required_id}"')

    css = target / "library.css"
    if css.is_file():
        css_content = css.read_text(encoding="utf-8")
        for token in (
            "--library-shadow-3",
            "--library-layer-dialog",
            "--library-accent",
            "--one-mind-page-background",
            "--settings-base-grid",
            "--settings-element-gap",
            "--settings-component-gap",
            "--settings-primary-rail-width",
            "--settings-secondary-rail-width",
            "--type-title-family",
            "--type-annotation-weight",
            ".library-home",
            ".library-dot-sea",
            ".module-preview",
            ".page-preview",
            ':root[data-settings-style="floating"]',
            "Full objective cascade",
            "Component rhythm: internal content uses Element gap",
            "container: library-content / inline-size",
            "@container library-content (max-width: 720px)",
        ):
            if token not in css_content:
                errors.append(f"library.css: missing visual token or preview contract {token}")
        floating_preview = re.search(r"\.library-style-choice-preview-floating\s*\{([^}]*)\}", css_content, re.DOTALL)
        if not floating_preview or "#0969da" in floating_preview.group(1) or "--style-preview-accent" in floating_preview.group(1):
            errors.append("library.css: Floating preview must not assign a color accent")
        if ':root[data-settings-style="block"]' in css_content or ".library-style-choice-preview-block" in css_content:
            errors.append("library.css: removed Block style must not be present")
        for removed_size_token in (
            "--settings-base-size",
            "--settings-scale",
            "--settings-type-step",
            "--settings-control-height",
        ):
            if removed_size_token in css_content:
                errors.append(f"library.css: removed global Size token must not be present: {removed_size_token}")
        for nested_panel in (
            ':root[data-settings-style="floating"] .library-settings-group,',
            ':root[data-settings-style="floating"] .element-content-section,',
            ':root[data-settings-style="floating"] .component-content-section {',
        ):
            if nested_panel in css_content:
                errors.append("library.css: Floating settings must use one high-level content panel")
        if "overflow: hidden; text-overflow: ellipsis; white-space: nowrap" not in css_content:
            errors.append("library.css: fixed rails must contain long navigation labels")
        if 'height: max-content; min-height: calc(100dvh - (var(--settings-component-gap) * 2))' not in css_content:
            errors.append("library.css: floating content panels must grow with long content")
        for spacing_contract in (
            ".library-primary-drawer nav,",
            ".library-type-role-row,",
            "gap: var(--settings-component-gap);",
            "padding: var(--settings-component-gap) 0 0;",
            ".library-workshop-drawer-actions .library-icon-button",
            "gap: var(--settings-element-gap);",
            "their border-to-border clearance visibly equals the configured Component gap",
            "box-shadow: none;",
            "flex-flow: row nowrap;",
            ".library-settings-actions > *",
            ".library-settings-save-status:empty",
            "padding-top: var(--settings-component-gap);",
            "min-height: var(--settings-button-height);",
            "height: var(--settings-button-height);",
            "padding: var(--settings-element-gap);",
            "border-top: 0;",
            "padding-inline: var(--settings-component-gap);",
            "margin: 0 0 var(--settings-component-gap);",
        ):
            if spacing_contract not in css_content:
                errors.append(f"library.css: missing shared spacing contract {spacing_contract}")
    script = target / "library.js"
    if script.is_file():
        script_content = script.read_text(encoding="utf-8")
        for contract in ("enhanceEntries", "specimenFor", "structureComponentEntry", "component-content-parts", "structureSettingsGroup", "element-content-parts", "ensureWorkshopActionBar", "settings-undo", "stylePresets", "applyStylePreset", "quantizeGap", "alignToBaseGrid", "settingsTypeRoleDefaults", "dataset.settingsStyle", "dataset.settingsButton", "persistSettingsDraft", "resetSettingsViewport", "scheduleSettingsViewportReset", "saveSettingsContract", "serializeSettingsContract", "showSaveFilePicker", "downloadSettingsContract", "projectSettingsContract", "page-preview", "renderDotSea", "prefers-reduced-motion", "aria-expanded"):
            if contract not in script_content:
                errors.append(f"library.js: missing visual interaction contract {contract}")
        if 'const settingsStorageKey = `one-mind-ui.settings.v2.${objectiveSlug}`' not in script_content:
            errors.append("library.js: browser draft storage must be scoped by objective")
        preset_block = re.search(r"const stylePresets = \{(.*?)\n  \};", script_content, re.DOTALL)
        if not preset_block or re.search(r"\bcolor\s*:", preset_block.group(1)):
            errors.append("library.js: style presets must not set color")
        if preset_block and re.search(r"\bblock\s*:", preset_block.group(1)):
            errors.append("library.js: removed Block style must not be present")
        if 'delete state.size;' not in script_content or '#settings-size' in script_content or 'normalized.size' in script_content:
            errors.append("library.js: removed global Size foundation must be migrated away and have no controls")
        for color_contract in ("resolvedSemanticColor", "resolvedSemanticColors", "colorPickers", 'next.color = "custom"'):
            if color_contract not in script_content:
                errors.append(f"library.js: missing custom color workflow {color_contract}")

    elements_path = target / "elements.html"
    if elements_path.is_file():
        elements_content = elements_path.read_text(encoding="utf-8")
        for removed_size_markup in ('id="size-system"', 'id="settings-size"', 'data-settings-copy="size"'):
            if removed_size_markup in elements_content:
                errors.append(f"elements.html: removed global Size foundation must not be present: {removed_size_markup}")

    settings_path = target / "design-settings.js"
    if settings_path.is_file():
        settings_content = settings_path.read_text(encoding="utf-8")
        match = re.search(r"Object\.freeze\((\{.*\})\);\s*$", settings_content, re.DOTALL)
        if not match:
            errors.append("design-settings.js: missing parseable objective settings contract")
        else:
            try:
                contract = json.loads(match.group(1))
            except json.JSONDecodeError as error:
                errors.append(f"design-settings.js: invalid settings JSON: {error}")
            else:
                expected_objective = slugify(args.objective)
                if contract.get("schemaVersion") != 1:
                    errors.append("design-settings.js: expected schemaVersion 1")
                if contract.get("skillVersion") != SKILL_VERSION:
                    errors.append(f"design-settings.js: expected skillVersion {SKILL_VERSION}")
                if contract.get("objective") != expected_objective:
                    errors.append(f"design-settings.js: objective must be {expected_objective}")
                if not re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z", str(contract.get("updatedAt", ""))):
                    errors.append("design-settings.js: updatedAt must be an ISO UTC timestamp")
                settings = contract.get("settings")
                required_settings = {
                    "style", "color", "colors", "baseGrid", "elementGap", "componentGap", "font", "typeRoles", "radius",
                    "elevation", "motion", "buttonAppearance", "buttonHeight", "buttonRadius",
                }
                if not isinstance(settings, dict) or not required_settings.issubset(settings):
                    errors.append("design-settings.js: missing required global design settings")
                elif "size" in settings:
                    errors.append("design-settings.js: removed global Size foundation must not be present")
                elif settings["style"] not in {"floating", "lines"}:
                    errors.append("design-settings.js: style must be Floating or Lines")
                else:
                    grid_values = (settings["baseGrid"], settings["elementGap"], settings["componentGap"])
                    if any(not isinstance(value, int) or isinstance(value, bool) or value <= 0 for value in grid_values):
                        errors.append("design-settings.js: grid settings must be positive integers")
                    elif settings["elementGap"] % settings["baseGrid"] or settings["componentGap"] % settings["baseGrid"]:
                        errors.append("design-settings.js: gaps must be integer multiples of baseGrid")
                    type_roles = settings["typeRoles"]
                    if not isinstance(type_roles, dict) or set(type_roles) != TYPE_ROLES:
                        errors.append("design-settings.js: typeRoles must define title, subtitle, body, content, and annotation")
                    else:
                        for role, type_style in type_roles.items():
                            if not isinstance(type_style, dict) or set(type_style) != {"family", "size", "weight"}:
                                errors.append(f"design-settings.js: typeRoles.{role} must define family, size, and weight")
                                continue
                            if type_style["family"] not in TYPE_FAMILIES:
                                errors.append(f"design-settings.js: typeRoles.{role}.family is unsupported")
                            if not isinstance(type_style["size"], int) or isinstance(type_style["size"], bool) or not 10 <= type_style["size"] <= 64:
                                errors.append(f"design-settings.js: typeRoles.{role}.size must be an integer from 10 to 64")
                            if type_style["weight"] not in TYPE_WEIGHTS:
                                errors.append(f"design-settings.js: typeRoles.{role}.weight is unsupported")
    license_path = target / "LICENSE"
    if license_path.is_file() and "MIT License" not in license_path.read_text(encoding="utf-8"):
        errors.append("LICENSE: missing MIT License text")
    notices_path = target / "THIRD_PARTY_NOTICES.md"
    if notices_path.is_file() and "IconPark" not in notices_path.read_text(encoding="utf-8"):
        errors.append("THIRD_PARTY_NOTICES.md: missing IconPark attribution")
    apache_path = target / "licenses" / "IconPark-Apache-2.0.txt"
    if apache_path.is_file() and "Apache License" not in apache_path.read_text(encoding="utf-8"):
        errors.append("licenses/IconPark-Apache-2.0.txt: missing Apache-2.0 text")
    for html_name in ("index.html", "guide.html", "style.html", "elements.html", "components.html", "pages.html", "license.html"):
        path = target / html_name
        if path.is_file():
            html_content = path.read_text(encoding="utf-8")
            settings_script = re.search(r'<script\s+src="design-settings\.js(?:\?[^"<]*)?"></script>', html_content)
            renderer_script = re.search(r'<script\s+src="library\.js(?:\?[^"<]*)?"></script>', html_content)
            if not renderer_script:
                errors.append(f"{html_name}: missing shared visual renderer")
            if not settings_script:
                errors.append(f"{html_name}: missing durable settings contract")
            elif renderer_script and settings_script.start() > renderer_script.start():
                errors.append(f"{html_name}: design-settings.js must load before library.js")

    guide_path = target / "guide.html"
    if guide_path.is_file():
        guide_content = guide_path.read_text(encoding="utf-8")
        for markdown_name in (
            "design-brief.md", "visual-direction.md", "layout-hierarchy.md",
            "state-contract.md", "authority-host.md", "validation-plan.md",
        ):
            reference = f"standards/{markdown_name}"
            if f'data-markdown-file="{reference}"' not in guide_content:
                errors.append(f"guide.html: missing preview contract for {reference}")

    style_path = target / "style.html"
    if style_path.is_file():
        style_content = style_path.read_text(encoding="utf-8")
        for preset in ("lines", "floating"):
            if not re.search(rf'<input\b[^>]*name="style-preset"[^>]*value="{preset}"', style_content):
                errors.append(f"style.html: missing selectable {preset} style preset")
        style_choices = re.search(r'id="style-choice-list".*?</fieldset>', style_content, re.DOTALL)
        choice_order = re.findall(r'name="style-preset"[^>]*value="([^"]+)"', style_choices.group(0) if style_choices else "")
        if choice_order != ["floating", "lines"]:
            errors.append("style.html: expected only Floating and Lines preset choices")

    elements_path = target / "elements.html"
    if elements_path.is_file():
        elements_content = elements_path.read_text(encoding="utf-8")
        if 'data-settings-copy="color">Color style<' not in elements_content:
            errors.append("elements.html: Color foundation must be named Color style")
        if 'data-settings-copy="colorNav">Color<' not in elements_content:
            errors.append("elements.html: Color foundation navigation must be named Color")
        if not re.search(r'<input\b[^>]*name="color"[^>]*value="custom"', elements_content):
            errors.append("elements.html: missing Custom color style")
        if len(re.findall(r'data-color-picker="[^"]+"[^>]*type="color"', elements_content)) != 9:
            errors.append("elements.html: every semantic color needs a clickable color picker")
        if "library-semantic-color-grid { grid-template-columns: repeat(2" in (target / "library.css").read_text(encoding="utf-8"):
            errors.append("library.css: semantic colors must remain one vertical role list")
        for grid_control in ("settings-base-grid", "settings-element-gap", "settings-component-gap"):
            if f'id="{grid_control}"' not in elements_content:
                errors.append(f"elements.html: missing grid control {grid_control}")
        if 'id="spacing-density-system"' in elements_content:
            errors.append("elements.html: spacing must be governed inside Grid, not a separate foundation")
        if set(re.findall(r'data-type-role-row="([^"]+)"', elements_content)) != TYPE_ROLES:
            errors.append("elements.html: Font must expose title, subtitle, body, content, and annotation role styles")
        if len(re.findall(r'data-type-role="[^"]+"\s+[^>]*data-type-property=', elements_content)) != 15 and len(re.findall(r'data-type-property="[^"]+"\s+[^>]*data-type-role=', elements_content)) != 15:
            errors.append("elements.html: every semantic font role must expose family, size, and weight controls")
        for font_heading in ("Font", "Font size", "Font weight"):
            if f">{font_heading}</span>" not in elements_content:
                errors.append(f"elements.html: Font panel must label {font_heading}")
        font_css = (target / "library.css").read_text(encoding="utf-8")
        if "container: font-panel / inline-size" not in font_css or "@container font-panel (max-width: 560px)" not in font_css:
            errors.append("library.css: Font role list must reflow inside its content panel")

    index_path = target / "index.html"
    if index_path.is_file():
        index_content = index_path.read_text(encoding="utf-8")
        if not re.search(r'class="library-home-primary-action"\s+href="style\.html"', index_content):
            errors.append("index.html: primary action must link to Style")
        expected_home_actions = {
            "https://github.com/RichardZhengQuan/OneMindUIDesignSkill": "github",
            "https://onemind.team": "oneMind",
        }
        home_actions = re.search(r'id="library-navigation".*?</nav>', index_content, re.DOTALL)
        home_actions_content = home_actions.group(0) if home_actions else ""
        for outbound_url, copy_key in expected_home_actions.items():
            pattern = rf'<a\b[^>]*href="{re.escape(outbound_url)}"[^>]*rel="noopener noreferrer"[^>]*>.*?data-copy="{copy_key}"'
            if not re.search(pattern, home_actions_content, re.DOTALL):
                errors.append(f"index.html: missing safe {copy_key} home action")
        footer = re.search(r'id="library-home-footer".*?</footer>', index_content, re.DOTALL)
        footer_content = footer.group(0) if footer else ""
        for local_footer_link in ("license.html", "license.html#project-license", "license.html#iconpark-notice"):
            if f'href="{local_footer_link}"' not in footer_content:
                errors.append(f"index.html: footer must retain {local_footer_link}")

    offline_files = (
        "index.html",
        "guide.html",
        "style.html",
        "elements.html",
        "components.html",
        "pages.html",
        "license.html",
        "library.css",
        "design-settings.js",
        "library.js",
    )
    forbidden_network_patterns = (
        (r"https?://", "remote URL"),
        (r"(?i)\bfetch\s*\(", "fetch call"),
        (r"(?i)\bXMLHttpRequest\b", "XMLHttpRequest"),
        (r"(?i)\bWebSocket\s*\(", "WebSocket"),
        (r"(?i)\bEventSource\s*\(", "EventSource"),
        (r"(?i)@import\s+url", "remote-capable CSS import"),
    )
    for name in offline_files:
        path = target / name
        if not path.is_file():
            continue
        content = path.read_text(encoding="utf-8")
        for pattern, label in forbidden_network_patterns:
            inspected_content = content
            if label == "remote URL":
                for allowed_url in ALLOWED_OUTBOUND_URLS:
                    inspected_content = inspected_content.replace(allowed_url, "")
            if re.search(pattern, inspected_content):
                errors.append(f"{name}: offline contract forbids {label}")
        if path.suffix == ".html":
            for reference in re.findall(r'\b(?:href|src)="([^"]+)"', content):
                local_reference = reference.split("#", 1)[0].split("?", 1)[0]
                if not local_reference:
                    continue
                if local_reference in ALLOWED_OUTBOUND_URLS:
                    continue
                if not (path.parent / local_reference).is_file():
                    errors.append(f"{name}: missing local reference {reference}")

    entry_ids: list[str] = []
    for html_name in ("guide.html", "style.html", "elements.html", "components.html", "pages.html"):
        path = target / html_name
        if not path.is_file():
            continue
        content = path.read_text(encoding="utf-8")
        for tag in re.findall(r'<(?:article|section)\b[^>]*class="(?:library-entry|library-settings-group)"[^>]*>', content):
            match = re.search(r'id="([^"]+)"', tag)
            if match:
                entry_ids.append(match.group(1))
    if len(entry_ids) < 63:
        errors.append(f"visual catalog: expected at least 63 guide/module/settings entries, found {len(entry_ids)}")
    if len(entry_ids) != len(set(entry_ids)):
        errors.append("visual catalog: duplicate library entry IDs")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(f"VALID: OneMind UI Design v{SKILL_VERSION} objective library at {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
