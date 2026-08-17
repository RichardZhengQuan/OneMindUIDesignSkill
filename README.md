# OneMind UI Design

An MIT-licensed Codex skill for designing, building, reviewing, and validating neutral OneMind BETA web UI modules and objective-specific design libraries as fully local, offline static artifacts.

The skill never starts or depends on a local or remote server. Generated libraries use relative local files and can be opened directly from disk.

Users ask Codex to build with the skill, adjust project-wide standards in the generated objective library, and save them to the objective-owned `design-settings.js`. Codex re-reads that contract before every subsequent build or change so the latest style, foundation, and component standards remain authoritative across the project.

See [SKILL.md](SKILL.md) for the workflow and contract.
