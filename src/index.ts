/**
 * Copyright (c) 2025 Vedhashree Sampath
 * Licensed under the MIT License.
 */

import { Project } from "ts-morph";
import fg from "fast-glob";
import path from "path";

interface FixImportsOptions {
  projectPath?: string;
  alias?: string;
  baseDir?: string;
  dryRun?: boolean;
}

export async function fixImports({
  projectPath = process.cwd(),
  alias = "@",
  baseDir = "src",
  dryRun = false,
}: FixImportsOptions = {}) {
  const aliasWithSlash = alias.endsWith("/") ? alias : alias + "/";
  const files = await fg(["**/*.{ts,tsx,js,jsx,mjs,cjs}"], {
    cwd: projectPath,
    ignore: ["node_modules", "dist"],
    absolute: true,
  });

  const project = new Project({
    tsConfigFilePath: path.join(projectPath, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      allowJs: true,
    },
  });

  const modifiedFiles: string[] = [];
  files.forEach((file) => {
    let sourceFile = project.getSourceFile(file);
    if (!sourceFile) {
      sourceFile = project.addSourceFileAtPathIfExists(file);
      if (!sourceFile) return; // skip if file can't be parsed
    }
    let wasModified = false;
    sourceFile.getImportDeclarations().forEach((importDecl) => {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();

      if (
        moduleSpecifier.startsWith(".") &&
        !moduleSpecifier.startsWith(aliasWithSlash)
      ) {
        const importPath = path.resolve(path.dirname(file), moduleSpecifier);
        const srcPath = path.resolve(projectPath, baseDir);

        if (importPath.startsWith(srcPath)) {
          const relativePathFromSrc = path
            .relative(srcPath, importPath)
            .replace(/\\/g, "/");
          importDecl.setModuleSpecifier(
            `${aliasWithSlash}${relativePathFromSrc}`
          );
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
    console.log(
      `🔍 Dry run: ${modifiedFiles.length} file(s) would be modified.`
    );
    modifiedFiles.forEach((file) => {
      console.log(" - " + path.relative(projectPath, file));
    });
  } else {
    console.log(`✅ Imports fixed in ${modifiedFiles.length} file(s).`);
  }
}
