#!/usr/bin/env python3
"""Resolve and optionally open a static, offline OneMind UI Design library."""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import html
import json
import re
import tempfile
import webbrowser
from pathlib import Path


LIBRARY_FILES = ("guide.html", "style.html", "elements.html", "components.html", "pages.html")
TEMPLATE_FILES = ("index.html", *LIBRARY_FILES, "license.html", "library.css", "design-settings.js", "library.js")
LEGAL_FILES = ("LICENSE", "THIRD_PARTY_NOTICES.md", "licenses/IconPark-Apache-2.0.txt")
ASSET_FILES = ("assets/onemind-beta-mark-light.svg", "assets/onemind-beta-mark-dark.svg")
STANDARD_FILES = (
    "standards/design-brief.md", "standards/visual-direction.md", "standards/layout-hierarchy.md",
    "standards/state-contract.md", "standards/authority-host.md", "standards/validation-plan.md",
)
SKILL_VERSION = "0.4"


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if not slug:
        raise ValueError("objective must contain at least one letter or number")
    return slug


def discover(design_root: Path) -> list[Path]:
    if not design_root.is_dir():
        return []
    return sorted(
        path
        for path in design_root.iterdir()
        if path.is_dir() and all((path / name).is_file() for name in LIBRARY_FILES)
    )


def entry_path(objective_dir: Path) -> Path:
    index = objective_dir / "index.html"
    return index if index.is_file() else objective_dir / "pages.html"


def temporary_root(project_root: Path) -> Path:
    digest = hashlib.sha256(str(project_root).encode("utf-8")).hexdigest()[:12]
    return Path(tempfile.gettempdir()) / "onemind-ui-design" / digest


def build_baseline(project_root: Path) -> Path:
    """Render the source-backed BETA baseline without changing project files."""
    target = temporary_root(project_root) / "baseline"
    target.mkdir(parents=True, exist_ok=True)
    templates = Path(__file__).resolve().parent.parent / "assets" / "objective-library"
    replacements = {
        "{{OBJECTIVE_NAME}}": "OneMind BETA Baseline",
        "{{OBJECTIVE_SLUG}}": "onemind-beta-baseline",
        "{{SKILL_VERSION}}": SKILL_VERSION,
        "{{CREATED_DATE}}": dt.date.today().isoformat(),
    }
    for name in TEMPLATE_FILES:
        content = (templates / name).read_text(encoding="utf-8")
        for token, value in replacements.items():
            content = content.replace(token, value)
        (target / name).write_text(content, encoding="utf-8")
    for name in ASSET_FILES:
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text((templates / name).read_text(encoding="utf-8"), encoding="utf-8")
    for name in STANDARD_FILES:
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        content = (templates / name).read_text(encoding="utf-8")
        for token, value in replacements.items():
            content = content.replace(token, value)
        destination.write_text(content, encoding="utf-8")
    source_root = Path(__file__).resolve().parent.parent
    for name in LEGAL_FILES:
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text((source_root / name).read_text(encoding="utf-8"), encoding="utf-8")
    return target / "index.html"


def build_hub(project_root: Path, objectives: list[Path]) -> Path:
    hub_dir = temporary_root(project_root)
    hub_dir.mkdir(parents=True, exist_ok=True)
    links = "\n".join(
        f'<li><a href="{html.escape(entry_path(path).resolve().as_uri())}">{html.escape(path.name)}</a></li>'
        for path in objectives
    )
    content = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="onemind-ui-design-version" content="{SKILL_VERSION}">
  <title>OneMind UI Design libraries</title>
</head>
<body>
  <header><p>OneMind UI Design v{SKILL_VERSION}</p><h1>Objective libraries</h1></header>
  <main><nav aria-label="Objective libraries"><ul>{links}</ul></nav></main>
</body>
</html>
"""
    hub = hub_dir / "index.html"
    hub.write_text(content, encoding="utf-8")
    return hub


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", required=True, type=Path)
    parser.add_argument("--objective")
    parser.add_argument("--open-default", action="store_true")
    args = parser.parse_args()

    project_root = args.project_root.expanduser().resolve()
    if not project_root.is_dir():
        parser.error(f"project root does not exist: {project_root}")

    objectives = discover(project_root / "docs" / "design")

    selected: Path
    selection: str
    objective_slug = None
    if not objectives and args.objective:
        objective_slug = slugify(args.objective)
        print(json.dumps({
            "status": "not_found",
            "project_root": str(project_root),
            "objective": objective_slug,
            "objectives": [],
            "offline": True,
            "network_required": False,
        }))
        return 3
    if not objectives:
        selected = build_baseline(project_root)
        objective_slug = "onemind-beta-baseline"
        selection = "baseline"
    elif args.objective:
        objective_slug = slugify(args.objective)
        matches = [path for path in objectives if path.name == objective_slug]
        if not matches:
            print(json.dumps({
                "status": "not_found",
                "project_root": str(project_root),
                "objective": objective_slug,
                "objectives": [path.name for path in objectives],
                "offline": True,
                "network_required": False,
            }))
            return 3
        selected = entry_path(matches[0])
        selection = "objective"
    elif len(objectives) == 1:
        objective_slug = objectives[0].name
        selected = entry_path(objectives[0])
        selection = "objective"
    else:
        selected = build_hub(project_root, objectives)
        selection = "hub"

    file_uri = selected.resolve().as_uri()
    opened = False
    if args.open_default:
        opened = bool(webbrowser.open_new_tab(file_uri))
        if not opened:
            print(json.dumps({
                "status": "open_failed",
                "path": str(selected),
                "file_uri": file_uri,
                "offline": True,
                "network_required": False,
            }))
            return 4

    print(json.dumps({
        "status": "ready",
        "selection": selection,
        "objective": objective_slug,
        "objectives": [path.name for path in objectives],
        "path": str(selected),
        "file_uri": file_uri,
        "temporary": selection in {"baseline", "hub"},
        "opened_default_browser": opened,
        "offline": True,
        "network_required": False,
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
