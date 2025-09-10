# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-09-10

### Added

- Added `--dry-run` CLI option to preview file modifications without making any changes.
- Logs all files that **would** be updated, enabling safer testing of the tool.
- Updated CLI usage examples and README to reflect new option.

---

## [1.0.0] - 2025-09-06

### Added

- Initial release: CLI tool to replace relative import paths with configured TypeScript aliases.
- Supports configuration via `--dir`, `--alias`, and `--base` flags.

---

<!-- Version Links -->

[1.1.0]: https://github.com/vedhashrees/ts-path-alias-fixer/releases/tag/v1.1.0
[1.0.0]: https://github.com/vedhashrees/ts-path-alias-fixer/releases/tag/v1.0.0
