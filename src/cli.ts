#!/usr/bin/env node

/**
 * Copyright (c) 2025 Vedhashree Sampath
 * Licensed under the MIT License.
 */

import { fixImports } from "./index";
import { program } from "commander";

program
  .name("fix-ts-imports")
  .description("Fix relative path imports to use custom alias like @/")
  .option("-d, --dir <path>", "Project root directory", process.cwd())
  .option("-a, --alias <alias>", "Alias (e.g. @)", "@")
  .option("-b, --base <base>", "Base folder to replace (e.g. src)", "src");

program.parse();

const options = program.opts();

async function main() {
  try {
    await fixImports({
      projectPath: options.dir,
      alias: options.alias,
      baseDir: options.base,
    });
  } catch (err) {
    console.error("Error fixing imports:", err);
    process.exit(1);
  }
}

main();
