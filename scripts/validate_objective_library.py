#!/usr/bin/env python3
"""Validate required OneMind UI Design v0.4 offline visual catalogs."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


SKILL_VERSION = "0.4"
REQUIRED = {
        "index.html": ("library-home-hero", "library-navigation", "library-home-footer"),
    "guide.html": ("design-brief", "visual-direction", "layout-hierarchy", "state-contract", "authority-contract", "validation-plan"),
    "style.html": ("style-library", "style-principles", "color-language", "typography-language", "spacing-layout", "shape-depth", "motion-language"),
    "elements.html": ("element-library", "semantic-color-system", "layout-grid-system", "size-system", "type-role-system", "spacing-density-system", "radius-system", "elevation-shadow-system", "motion-state-treatment"),
    "components.html": ("component-library", "title-action-list", "side-drawer", "side-floating-panel", "notification-inbox", "file-inventory"),
    "pages.html": ("page-module-library", "page-pattern-library", "signed-in-app-shell", "authoritative-product-lifecycle"),
    "license.html": ("open-source-licenses", "project-license", "iconpark-notice"),
    "library.css": (),
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
            ".library-home",
            ".library-dot-sea",
            ".module-preview",
            ".page-preview",
        ):
            if token not in css_content:
                errors.append(f"library.css: missing visual token or preview contract {token}")
    script = target / "library.js"
    if script.is_file():
        script_content = script.read_text(encoding="utf-8")
        for contract in ("enhanceEntries", "specimenFor", "structureComponentEntry", "component-content-parts", "structureSettingsGroup", "element-content-parts", "page-preview", "renderDotSea", "prefers-reduced-motion", "aria-expanded"):
            if contract not in script_content:
                errors.append(f"library.js: missing visual interaction contract {contract}")
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
        if path.is_file() and not re.search(
            r'<script\s+src="library\.js(?:\?[^"<]*)?"></script>',
            path.read_text(encoding="utf-8"),
        ):
            errors.append(f"{html_name}: missing shared visual renderer")

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

    offline_files = (
        "index.html",
        "guide.html",
        "style.html",
        "elements.html",
        "components.html",
        "pages.html",
        "license.html",
        "library.css",
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
            if re.search(pattern, content):
                errors.append(f"{name}: offline contract forbids {label}")
        if path.suffix == ".html":
            for reference in re.findall(r'\b(?:href|src)="([^"]+)"', content):
                local_reference = reference.split("#", 1)[0].split("?", 1)[0]
                if not local_reference:
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
    if len(entry_ids) < 70:
        errors.append(f"visual catalog: expected at least 70 guide/module/settings entries, found {len(entry_ids)}")
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
