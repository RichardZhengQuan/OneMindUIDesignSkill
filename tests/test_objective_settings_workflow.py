from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"


def run_script(name: str, *args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(SCRIPTS / name), *args],
        check=check,
        capture_output=True,
        text=True,
    )


def read_contract(path: Path) -> dict:
    match = re.search(r"Object\.freeze\((\{.*\})\);\s*$", path.read_text(encoding="utf-8"), re.DOTALL)
    if not match:
        raise AssertionError("missing settings contract")
    return json.loads(match.group(1))


def write_contract(path: Path, contract: dict) -> None:
    payload = json.dumps(contract, ensure_ascii=False, indent=2)
    path.write_text(
        "/* OneMind UI Design v0.4 objective authority. Saved by the local library UI. */\n"
        f"window.OneMindDesignSettings = Object.freeze({payload});\n",
        encoding="utf-8",
    )


class ObjectiveSettingsWorkflowTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory(prefix="onemind-ui-settings-test-")
        self.project = Path(self.temp.name)
        run_script("init_objective_library.py", "--project-root", str(self.project), "--objective", "Team Flow")
        self.objective = self.project / "docs" / "design" / "team-flow"

    def tearDown(self) -> None:
        self.temp.cleanup()

    def test_generated_library_has_durable_objective_contract(self) -> None:
        contract = read_contract(self.objective / "design-settings.js")
        self.assertEqual(contract["objective"], "team-flow")
        self.assertEqual(contract["settings"]["style"], "floating")
        self.assertEqual(contract["settings"]["color"], "neutral")
        self.assertEqual(contract["settings"]["baseGrid"], 4)
        self.assertEqual(contract["settings"]["elementGap"], 8)
        self.assertEqual(contract["settings"]["componentGap"], 16)
        self.assertNotIn("size", contract["settings"])
        self.assertEqual(
            set(contract["settings"]["typeRoles"]),
            {"title", "subtitle", "body", "content", "annotation"},
        )
        self.assertEqual(contract["settings"]["typeRoles"]["title"], {"family": "inherit", "size": 32, "weight": 700})
        self.assertNotIn("grid", contract["settings"])
        self.assertNotIn("spacing", contract["settings"])
        self.assertIn("buttonAppearance", contract["settings"])
        index_content = (self.objective / "index.html").read_text(encoding="utf-8")
        self.assertIn('class="library-home-primary-action" href="style.html"', index_content)
        self.assertIn('href="https://github.com/RichardZhengQuan/OneMindUIDesignSkill"', index_content)
        self.assertIn('href="https://onemind.team"', index_content)
        self.assertIn('href="license.html#project-license"', index_content)
        self.assertIn('href="license.html#iconpark-notice"', index_content)
        css_content = (self.objective / "library.css").read_text(encoding="utf-8")
        floating_preview = re.search(r"\.library-style-choice-preview-floating\s*\{([^}]*)\}", css_content, re.DOTALL)
        self.assertIsNotNone(floating_preview)
        self.assertNotIn("--style-preview-accent", floating_preview.group(1))
        self.assertNotIn("#0969da", floating_preview.group(1))
        self.assertNotIn('data-settings-style="block"', css_content)
        self.assertNotIn("library-style-choice-preview-block", css_content)
        self.assertNotIn(':root[data-settings-style="floating"] .library-settings-group,', css_content)
        self.assertNotIn(':root[data-settings-style="floating"] .element-content-section,', css_content)
        self.assertNotIn(':root[data-settings-style="floating"] .component-content-section {', css_content)
        self.assertIn(".library-semantic-color-grid { display: grid; grid-template-columns: minmax(0, 1fr)", css_content)
        self.assertNotIn(".library-semantic-color-grid { grid-template-columns: repeat(2", css_content)
        self.assertIn(".library-color-picker::-webkit-color-swatch", css_content)
        self.assertIn("--settings-base-grid: 4px", css_content)
        self.assertIn("--settings-element-gap: 8px", css_content)
        self.assertIn("--settings-component-gap: 16px", css_content)
        self.assertIn("--settings-primary-rail-width: 184px", css_content)
        self.assertIn("Full objective cascade", css_content)
        self.assertIn("Component rhythm: internal content uses Element gap", css_content)
        self.assertIn(".library-type-role-row,", css_content)
        self.assertIn("padding: var(--settings-component-gap) 0 0;", css_content)
        self.assertIn(".library-workshop-drawer-actions .library-icon-button {\n  gap: var(--settings-element-gap);", css_content)
        self.assertIn("their border-to-border clearance visibly equals the configured Component gap", css_content)
        self.assertIn(".library-primary-drawer nav a,\n:root[data-settings-style=\"floating\"] .library-standards-drawer nav a,", css_content)
        self.assertIn("box-shadow: none;", css_content)
        self.assertIn("flex-flow: row nowrap;", css_content)
        self.assertIn(".library-settings-actions > * {\n  width: auto;\n}", css_content)
        self.assertIn(".library-settings-save-status:empty {\n  display: none;", css_content)
        self.assertIn(".library-settings-content {\n  padding-top: var(--settings-component-gap);", css_content)
        navigation_height = re.search(
            r"\.library-primary-drawer nav a,\s*\.library-standards-drawer nav a,\s*\.library-settings-rail nav a,.*?\{(.*?)\}",
            css_content,
            re.DOTALL,
        )
        self.assertIsNotNone(navigation_height)
        self.assertIn("height: var(--settings-button-height);", navigation_height.group(1))
        self.assertIn("min-height: var(--settings-button-height);", navigation_height.group(1))
        self.assertNotIn("min-height: var(--settings-control-height);", navigation_height.group(1))
        for removed_size_token in (
            "--settings-base-size",
            "--settings-scale",
            "--settings-type-step",
            "--settings-control-height",
        ):
            self.assertNotIn(removed_size_token, css_content)
        self.assertIn("padding: var(--settings-element-gap);", navigation_height.group(1))
        self.assertNotIn("calc(var(--settings-element-gap) * 1.5)", navigation_height.group(1))
        self.assertIn(".library-workshop-shell .library-primary-drawer,\n.library-standards-drawer,\n.library-settings-rail {\n  padding: var(--settings-component-gap);", css_content)
        self.assertIn("padding: var(--settings-component-gap) 0 0;\n  border-top: 0;", css_content)
        self.assertIn(".library-settings-group > h2,\n.library-settings-group > .element-content-parts {\n  padding-inline: var(--settings-component-gap);", css_content)
        self.assertIn(".library-primary-drawer-title,\n.library-settings-rail-title {\n  margin: 0 0 var(--settings-component-gap);", css_content)
        self.assertIn(".library-standards-drawer-heading {\n  padding: 0 0 var(--settings-component-gap);", css_content)
        self.assertIn("container: library-content / inline-size", css_content)
        self.assertIn("@container library-content (max-width: 720px)", css_content)
        self.assertIn(".library-style-choices { grid-template-columns: minmax(0, 1fr); }", css_content)
        self.assertIn(".side-drawer-specimen aside { border-right: 0; border-bottom: 1px solid var(--one-mind-border); }", css_content)
        self.assertIn("align-self: start; height: max-content; min-height: calc(100dvh - (var(--settings-component-gap) * 2))", css_content)
        self.assertNotIn(".library-settings-content { align-self: stretch;", css_content)
        self.assertIn("grid-template-columns: var(--settings-primary-rail-width) var(--settings-secondary-rail-width)", css_content)
        self.assertIn('data-settings-button="soft"] :is(.library-settings-reset', css_content)
        self.assertIn("--type-title-family: var(--settings-font-family)", css_content)
        self.assertIn("--type-annotation-weight: 500", css_content)
        elements_content = (self.objective / "elements.html").read_text(encoding="utf-8")
        self.assertIn('data-settings-copy="colorNav">Color</a>', elements_content)
        self.assertIn('data-settings-copy="color">Color style</h2>', elements_content)
        self.assertIn('name="color" value="custom"', elements_content)
        self.assertEqual(elements_content.count('class="library-color-picker"'), 9)
        self.assertEqual(elements_content.count('type="color"'), 9)
        self.assertIn('id="settings-base-grid"', elements_content)
        self.assertIn('id="settings-element-gap"', elements_content)
        self.assertIn('id="settings-component-gap"', elements_content)
        self.assertNotIn('id="size-system"', elements_content)
        self.assertNotIn('id="settings-size"', elements_content)
        self.assertNotIn('data-settings-copy="size"', elements_content)
        self.assertNotIn('id="spacing-density-system"', elements_content)
        self.assertEqual(elements_content.count('class="library-type-role-row"'), 5)
        self.assertEqual(elements_content.count('data-type-property="family"'), 5)
        self.assertEqual(elements_content.count('data-type-property="size"'), 5)
        self.assertEqual(elements_content.count('data-type-property="weight"'), 5)
        self.assertIn('class="library-font-controls"', elements_content)
        self.assertIn('data-settings-copy="fontFamilyShort">Font</span>', elements_content)
        self.assertIn('data-settings-copy="typeSize">Font size</span>', elements_content)
        self.assertIn('data-settings-copy="fontWeight">Font weight</span>', elements_content)
        self.assertIn(".library-font-controls { container: font-panel / inline-size; display: grid; gap: var(--settings-component-gap); width: 100%; max-width: 100%; min-width: 0; overflow: hidden; padding: var(--settings-component-gap); border:", css_content)
        self.assertIn("container: font-panel / inline-size", css_content)
        self.assertIn("@container font-panel (max-width: 560px)", css_content)
        self.assertIn(".library-type-role-row strong { grid-column: 1 / -1; }", css_content)
        script_content = (self.objective / "library.js").read_text(encoding="utf-8")
        self.assertIn("resolvedSemanticColor", script_content)
        self.assertIn('next.color = "custom"', script_content)
        self.assertIn("settingsTypeRoleDefaults", script_content)
        self.assertIn("alignToBaseGrid", script_content)
        self.assertIn("function persistSettingsDraft(state)", script_content)
        self.assertGreaterEqual(script_content.count("persistSettingsDraft(state);"), 4)
        self.assertIn("function resetSettingsViewport()", script_content)
        self.assertIn("event.preventDefault();", script_content)
        self.assertIn('window.addEventListener("load", scheduleSettingsViewportReset, { once: true });', script_content)
        self.assertIn('root.style.setProperty("--settings-primary-rail-width"', script_content)
        self.assertIn("delete state.size;", script_content)
        self.assertNotIn('size: document.querySelector("#settings-size")', script_content)
        self.assertIn("--type-${role}-family", script_content)
        for html_path in self.objective.glob("*.html"):
            content = html_path.read_text(encoding="utf-8")
            self.assertLess(content.index("design-settings.js"), content.index("library.js"))
        result = run_script(
            "validate_objective_library.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
        )
        self.assertIn("VALID", result.stdout)

    def test_export_import_round_trip_becomes_project_authority(self) -> None:
        export = self.project / "exported-design-settings.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["updatedAt"] = "2026-08-14T12:34:56.789Z"
        contract["settings"]["style"] = "lines"
        contract["settings"]["buttonAppearance"] = "outline"
        contract["settings"]["baseGrid"] = 3
        contract["settings"]["elementGap"] = 9
        contract["settings"]["componentGap"] = 18
        contract["settings"]["typeRoles"]["title"] = {"family": "serif", "size": 40, "weight": 600}
        write_contract(export, contract)

        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
        )
        installed = read_contract(self.objective / "design-settings.js")
        self.assertIn("2026-08-14T12:34:56.789Z", result.stdout)
        self.assertEqual(installed["settings"]["style"], "lines")
        self.assertEqual(installed["settings"]["buttonAppearance"], "outline")
        self.assertEqual(installed["settings"]["elementGap"] % installed["settings"]["baseGrid"], 0)
        self.assertEqual(installed["settings"]["componentGap"] % installed["settings"]["baseGrid"], 0)
        self.assertEqual(installed["settings"]["typeRoles"]["title"], {"family": "serif", "size": 40, "weight": 600})

        run_script("init_objective_library.py", "--project-root", str(self.project), "--objective", "Team Flow")
        preserved = read_contract(self.objective / "design-settings.js")
        self.assertEqual(preserved["updatedAt"], "2026-08-14T12:34:56.789Z")
        self.assertEqual(preserved["settings"]["style"], "lines")

    def test_import_rejects_another_objective(self) -> None:
        export = self.project / "wrong-objective.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["objective"] = "another-objective"
        write_contract(export, contract)
        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("does not match", result.stderr)

    def test_import_rejects_removed_block_style(self) -> None:
        export = self.project / "removed-block-style.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["settings"]["style"] = "block"
        write_contract(export, contract)
        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("unsupported style 'block'", result.stderr)

    def test_import_rejects_removed_global_size_foundation(self) -> None:
        export = self.project / "removed-global-size.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["settings"]["size"] = 16
        write_contract(export, contract)
        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("removed global Size foundation", result.stderr)

    def test_import_rejects_gaps_off_base_grid(self) -> None:
        export = self.project / "invalid-grid-gaps.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["settings"]["baseGrid"] = 4
        contract["settings"]["elementGap"] = 10
        write_contract(export, contract)
        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("integer multiples of baseGrid", result.stderr)

    def test_import_rejects_invalid_semantic_type_role(self) -> None:
        export = self.project / "invalid-type-role.js"
        contract = read_contract(self.objective / "design-settings.js")
        contract["settings"]["typeRoles"]["content"]["family"] = "comic"
        write_contract(export, contract)
        result = run_script(
            "import_design_settings.py",
            "--project-root", str(self.project),
            "--objective", "Team Flow",
            "--settings-file", str(export),
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("typeRoles.content.family is unsupported", result.stderr)


if __name__ == "__main__":
    unittest.main()
