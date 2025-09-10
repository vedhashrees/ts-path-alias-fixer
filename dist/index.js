"use strict";
/**
 * Copyright (c) 2025 Vedhashree Sampath
 * Licensed under the MIT License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixImports = fixImports;
const ts_morph_1 = require("ts-morph");
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
async function fixImports({ projectPath = process.cwd(), alias = "@", baseDir = "src", dryRun = false, } = {}) {
    const aliasWithSlash = alias.endsWith("/") ? alias : alias + "/";
    const files = await (0, fast_glob_1.default)(["**/*.{ts,tsx,js,jsx,mjs,cjs}"], {
        cwd: projectPath,
        ignore: ["node_modules", "dist"],
        absolute: true,
    });
    const project = new ts_morph_1.Project({
        tsConfigFilePath: path_1.default.join(projectPath, "tsconfig.json"),
        skipAddingFilesFromTsConfig: true,
        compilerOptions: {
            allowJs: true,
        },
    });
    const modifiedFiles = [];
    files.forEach((file) => {
        let sourceFile = project.getSourceFile(file);
        if (!sourceFile) {
            sourceFile = project.addSourceFileAtPathIfExists(file);
            if (!sourceFile)
                return; // skip if file can't be parsed
        }
        let wasModified = false;
        sourceFile.getImportDeclarations().forEach((importDecl) => {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            if (moduleSpecifier.startsWith(".") &&
                !moduleSpecifier.startsWith(aliasWithSlash)) {
                const importPath = path_1.default.resolve(path_1.default.dirname(file), moduleSpecifier);
                const srcPath = path_1.default.resolve(projectPath, baseDir);
                if (importPath.startsWith(srcPath)) {
                    const relativePathFromSrc = path_1.default
                        .relative(srcPath, importPath)
                        .replace(/\\/g, "/");
                    importDecl.setModuleSpecifier(`${aliasWithSlash}${relativePathFromSrc}`);
                    wasModified = true;
                }
            }
        });
        if (wasModified) {
            modifiedFiles.push(file);
            if (!dryRun) {
                sourceFile.saveSync();
            }
        }
    });
    if (dryRun) {
        console.log(`🔍 Dry run: ${modifiedFiles.length} file(s) would be modified.`);
        modifiedFiles.forEach((file) => {
            console.log(" - " + path_1.default.relative(projectPath, file));
        });
    }
    else {
        console.log(`✅ Imports fixed in ${modifiedFiles.length} file(s).`);
    }
}
