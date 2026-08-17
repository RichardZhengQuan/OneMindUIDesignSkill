#!/usr/bin/env python3
"""Initialize the OneMind UI Design objective catalogs without overwriting work."""

from __future__ import annotations

import argparse
import datetime as dt
import re
from pathlib import Path


SKILL_VERSION = "0.4"
TEMPLATE_NAMES = ("index.html", "guide.html", "style.html", "elements.html", "components.html", "pages.html", "license.html", "library.css", "design-settings.js", "library.js")
STANDARD_NAMES = (
    "standards/design-brief.md",
    "standards/visual-direction.md",
    "standards/layout-hierarchy.md",
    "standards/state-contract.md",
    "standards/authority-host.md",
    "standards/validation-plan.md",
)
LEGAL_NAMES = ("LICENSE", "THIRD_PARTY_NOTICES.md", "licenses/IconPark-Apache-2.0.txt")
ASSET_NAMES = ("assets/onemind-beta-mark-light.svg", "assets/onemind-beta-mark-dark.svg")


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

    project_root = args.project_root.expanduser().resolve()
    if not project_root.is_dir():
        parser.error(f"project root does not exist: {project_root}")

    objective_name = args.objective.strip()
    objective_slug = slugify(objective_name)
    target = project_root / "docs" / "design" / objective_slug
    target.mkdir(parents=True, exist_ok=True)

    templates = Path(__file__).resolve().parent.parent / "assets" / "objective-library"
    replacements = {
        "{{OBJECTIVE_NAME}}": objective_name,
        "{{OBJECTIVE_SLUG}}": objective_slug,
        "{{SKILL_VERSION}}": SKILL_VERSION,
        "{{CREATED_DATE}}": dt.date.today().isoformat(),
    }

    created: list[Path] = []
    preserved: list[Path] = []
    for name in (*TEMPLATE_NAMES, *STANDARD_NAMES):
        source = templates / name
        destination = target / name
        if destination.exists():
            preserved.append(destination)
            continue
        destination.parent.mkdir(parents=True, exist_ok=True)
        content = source.read_text(encoding="utf-8")
        for token, value in replacements.items():
            content = content.replace(token, value)
        destination.write_text(content, encoding="utf-8")
        created.append(destination)

    for name in ASSET_NAMES:
        source = templates / name
        destination = target / name
        if destination.exists():
            preserved.append(destination)
            continue
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(source.read_text(encoding="utf-8"), encoding="utf-8")
        created.append(destination)

    source_root = Path(__file__).resolve().parent.parent
    for name in LEGAL_NAMES:
        source = source_root / name
        destination = target / name
        if destination.exists():
            preserved.append(destination)
            continue
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(source.read_text(encoding="utf-8"), encoding="utf-8")
        created.append(destination)

    print(f"objective library: {target}")
    for path in created:
        print(f"created: {path.relative_to(project_root)}")
    for path in preserved:
        print(f"preserved: {path.relative_to(project_root)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
