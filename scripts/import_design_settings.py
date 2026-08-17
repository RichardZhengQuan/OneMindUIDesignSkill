#!/usr/bin/env python3
"""Validate and install an exported objective settings contract."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


SKILL_VERSION = "0.4"
REQUIRED_SETTINGS = {
    "style", "color", "colors", "baseGrid", "elementGap", "componentGap", "font", "typeRoles", "radius",
    "elevation", "motion", "buttonAppearance", "buttonHeight", "buttonRadius",
}
SUPPORTED_STYLES = {"floating", "lines"}
TYPE_ROLES = {"title", "subtitle", "body", "content", "annotation"}
TYPE_FAMILIES = {"inherit", "system", "humanist", "serif", "mono"}
TYPE_WEIGHTS = {400, 500, 600, 700}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if not slug:
        raise ValueError("objective must contain at least one letter or number")
    return slug


def parse_contract(path: Path) -> dict:
    content = path.read_text(encoding="utf-8")
    match = re.search(r"Object\.freeze\((\{.*\})\);\s*$", content, re.DOTALL)
    if not match:
        raise ValueError("settings file is not a OneMind design-settings.js contract")
    contract = json.loads(match.group(1))
    if contract.get("schemaVersion") != 1 or contract.get("skillVersion") != SKILL_VERSION:
        raise ValueError(f"settings contract must use schema 1 and skill version {SKILL_VERSION}")
    settings = contract.get("settings")
    if not isinstance(settings, dict) or not REQUIRED_SETTINGS.issubset(settings):
        raise ValueError("settings contract is missing required global design settings")
    if "size" in settings:
        raise ValueError("settings contract uses the removed global Size foundation")
    if settings["style"] not in SUPPORTED_STYLES:
        raise ValueError(f"settings contract uses unsupported style {settings['style']!r}")
    base_grid = settings["baseGrid"]
    element_gap = settings["elementGap"]
    component_gap = settings["componentGap"]
    if any(not isinstance(value, int) or isinstance(value, bool) or value <= 0 for value in (base_grid, element_gap, component_gap)):
        raise ValueError("grid settings must be positive integers")
    if element_gap % base_grid or component_gap % base_grid:
        raise ValueError("elementGap and componentGap must be integer multiples of baseGrid")
    type_roles = settings["typeRoles"]
    if not isinstance(type_roles, dict) or set(type_roles) != TYPE_ROLES:
        raise ValueError("typeRoles must define title, subtitle, body, content, and annotation")
    for role, type_style in type_roles.items():
        if not isinstance(type_style, dict) or set(type_style) != {"family", "size", "weight"}:
            raise ValueError(f"typeRoles.{role} must define family, size, and weight")
        if type_style["family"] not in TYPE_FAMILIES:
            raise ValueError(f"typeRoles.{role}.family is unsupported")
        if not isinstance(type_style["size"], int) or isinstance(type_style["size"], bool) or not 10 <= type_style["size"] <= 64:
            raise ValueError(f"typeRoles.{role}.size must be an integer from 10 to 64")
        if type_style["weight"] not in TYPE_WEIGHTS:
            raise ValueError(f"typeRoles.{role}.weight must be 400, 500, 600, or 700")
    return contract


def serialize(contract: dict) -> str:
    payload = json.dumps(contract, ensure_ascii=False, indent=2)
    return f"/* OneMind UI Design v{SKILL_VERSION} objective authority. Saved by the local library UI. */\nwindow.OneMindDesignSettings = Object.freeze({payload});\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--project-root", required=True, type=Path)
    parser.add_argument("--objective", required=True)
    parser.add_argument("--settings-file", required=True, type=Path)
    args = parser.parse_args()

    project_root = args.project_root.expanduser().resolve()
    objective = slugify(args.objective)
    target_dir = project_root / "docs" / "design" / objective
    if not target_dir.is_dir():
        parser.error(f"objective library does not exist: {target_dir}")
    source = args.settings_file.expanduser().resolve()
    if not source.is_file():
        parser.error(f"settings file does not exist: {source}")

    try:
        contract = parse_contract(source)
    except (ValueError, json.JSONDecodeError) as error:
        parser.error(str(error))
    if contract.get("objective") != objective:
        parser.error(f"settings objective {contract.get('objective')!r} does not match {objective!r}")

    destination = target_dir / "design-settings.js"
    destination.write_text(serialize(contract), encoding="utf-8")
    print(f"installed settings: {destination}")
    print(f"updatedAt: {contract.get('updatedAt')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
