#!/usr/bin/env node
"use strict";
/**
 * Copyright (c) 2025 Vedhashree Sampath
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const commander_1 = require("commander");
commander_1.program
    .name("fix-ts-imports")
    .description("Fix relative path imports to use custom alias like @/")
    .option("-d, --dir <path>", "Project root directory", process.cwd())
    .option("-a, --alias <alias>", "Alias (e.g. @)", "@")
    .option("-b, --base <base>", "Base folder to replace (e.g. src)", "src");
commander_1.program.parse();
const options = commander_1.program.opts();
async function main() {
    try {
        await (0, index_1.fixImports)({
            projectPath: options.dir,
            alias: options.alias,
            baseDir: options.base,
        });
    }
    catch (err) {
        console.error("Error fixing imports:", err);
        process.exit(1);
    }
}
main();
