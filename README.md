# ts-path-alias-fixer

> Fix relative path imports in TypeScript/JavaScript to use custom aliases like `@/`.

## ✨ Features

- Converts long relative paths to clean alias imports
- Converts relative imports under a base directory (e.g., `src/`) to a custom alias (e.g., `@/`).
- Provides `dry-run` option to preview the files that would be modified without saving
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

#### General

Run the CLI tool from your project root (or specify a directory):

```bash
npx fix-ts-imports
```

or if installed globally:

```bash
fix-ts-imports
```

### CLI Options

| Options     |                   Descriptions                    |        Default         |
| ----------- | :-----------------------------------------------: | :--------------------: |
| -d, --dir   |              Project root directory               | ./ (Current directory) |
| -a, --alias |       Alias to replace relative paths with        |           @            |
| -b, --base  |     Base folder inside the project to replace     |          src           |
| --dry-run   | Show which files would be modified without saving |         false          |

## Example Usage 1:

In your project, if there are files which has relative path imports which needs to be modified to use custom path alias as below

Let's say it should convert:

```bash
import { greet } from '../utils/helpers';
```

To:

```bash
import { greet } from '@/utils/helpers';
```

## Run with `dry-run` option:

In your project, before modifying your existing files by using this tool, if you want to check and understand what files will get affected

#### Preview changes without modifying files:

```bash
npx fix-ts-imports --dry-run
```

#### Run with custom options:

```bash
npx fix-ts-imports --dir ./src --alias @ --base src --dry-run
```

## Example Output

Once you run the cli command as above with dry-run, you should see some output console logs which will indicate how many files would be modified with custom path alias imports and what are their file paths in your project as below

```bash
🔍 Dry run: 3 file(s) would be modified.
 - src\index.ts
 - src\utils\helper.ts
 - src\api\v1\index.ts
```

## Run to modify files:

If you are happy with the `--dry-run` output and want to proceed with the file changes in your project, run this tool as below

```bash
npx fix-ts-imports
```

or

```bash
npx fix-ts-imports --dir ./ --alias @ --base src
```

## Example Output

Once you run the cli command as above, you should see some output console logs which will indicate how many files have been modified with custom path alias imports in our project

```bash
✅ Imports fixed in 3 file(s).
```

## Example Usage 2:

In your project, e.g `tsconfig.json` file config is as below

Example:
```bash
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/lib/apiClient/components/*"],
      "@services/*": ["src/lib/apiClient/services/*"],
      "@utils/*": ["src/utils/*"]
    },
  }
}
```

Want to modify all project files with all relative path imports related to services like `../../src/lib/apiClient/services/service-1` in your project directory to a custom directory alias path like `@services/`

Let's say it should convert:

```bash
import { ApiService } from '../../../../services/ApiService';
```

To:

```bash
import { ApiService } from '@services/ApiService';
```

## Run to modify files:

If you are happy with the `--dry-run` output and want to proceed with the file changes in your project, run this tool as below

```bash
npx fix-ts-imports --dir ./ --alias @services --base src/lib/apiClient/services
```

## Example Output

Once you run the cli command as above, you should see some output console logs which will indicate how many files have been modified with custom path alias imports in our project

```bash
✅ Imports fixed in 4 file(s).
```

## Example Usage 3:
Want to modify again now, with all project files with all relative path imports related to components like `../../src/lib/apiClient/components/component-1` in your project directory to a custom directory alias path like `@components/`

Let's say it should convert:

```bash
import { Button} from '../../../../components/buttonComponent';
```

To:

```bash
import { Button} from '@components/buttonComponent';
```

## Run to modify files:

Run the below from your command line

```bash
npx fix-ts-imports --dir ./ --alias @components --base src/lib/apiClient/components
```


Use this tool like as many times as you like and in minutes enjoy a much cleaner and readable code.

