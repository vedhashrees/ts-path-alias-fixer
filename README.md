# ts-path-alias-fixer

> Fix relative path imports in TypeScript/JavaScript to use custom aliases like `@/`.

## ✨ Features

- Converts long relative paths to clean alias imports
- Converts relative imports under a base directory (e.g., `src/`) to a custom alias (e.g., `@/`).
- Supports `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, and `.cjs` files.
- Supports TypeScript projects using `tsconfig.json` paths
- CLI-based, fast and easy to use
- Easy to integrate into your build or development workflow.

## 📦 Installation

### Global Install

```bash
npm install -g ts-path-alias-fixer
```

### Local Install (recommended)

Install as a development dependency in your project:

```bash
npm install --save-dev ts-path-alias-fixer
```

### or with Yarn:

```bash
yarn add --dev ts-path-alias-fixer
```

## Usage

### CLI Usage

Run the CLI tool from your project root (or specify a directory):

```bash
npx fix-ts-imports
```

or if installed globally:

```bash
fix-ts-imports
```

### CLI Options

Option Description Default

| Options     |               Descriptions                |        Default         |
| ----------- | :---------------------------------------: | :--------------------: |
| -d, --dir   |          Project root directory           | ./ (Current directory) |
| -a, --alias |   Alias to replace relative paths with    |           @            |
| -b, --base  | Base folder inside the project to replace |          src           |

## Example:

```bash
npx fix-ts-imports --dir ./ --alias @ --base src
```

## Example Output

Once you run the cli command as above, you should see some output console log which will indicate how many files have been modified with custom path alias imports in our project

```bash
✅ Imports fixed in 6 file(s).
```
