#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'pages');
const TESTS_DIR = path.join(__dirname, '..', 'tests');
const UTILS_DIR = path.join(__dirname, '..', 'utils');
const RESULTS_DIR = path.join(__dirname, '..', 'test-results');

function getSourceFiles(dir: string, extensions: string[]): string[] {
  let files: string[] = [];
  try {
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getSourceFiles(fullPath, extensions));
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error: any) {
    console.warn(`⚠️  Warning: Could not scan directory ${dir}: ${error.message}`);
  }
  return files;
}

function checkForConsoleStatements(filePath: string): string[] {
  const issues: string[] = [];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (/console\.(log|warn|error|info|debug)\s*\(/.test(line)) {
        issues.push(`${filePath}:${idx + 1}: ${line.trim()}`);
      }
    });
  } catch (error: any) {
    console.warn(`⚠️  Warning: Could not read file ${filePath}: ${error.message}`);
  }
  return issues;
}

function validateConsoleClean(): boolean {
  console.log('🔍 Validating console output for unwanted logs and errors...\n');
  const sourceFiles = [
    ...getSourceFiles(SRC_DIR, ['.ts', '.js']),
    ...getSourceFiles(UTILS_DIR, ['.ts', '.js']),
    ...getSourceFiles(TESTS_DIR, ['.ts', '.js']),
  ];
  console.log(`📊 Scanning ${sourceFiles.length} source files for console issues...`);
  let hasIssues = false;
  for (const file of sourceFiles) {
    const issues = checkForConsoleStatements(file);
    if (issues.length > 0) {
      hasIssues = true;
      issues.forEach(issue => console.log(`❌ Console statement found: ${issue}`));
    }
  }
  // Scan test results for console errors
  if (fs.existsSync(RESULTS_DIR)) {
    const resultFiles = getSourceFiles(RESULTS_DIR, ['.json', '.txt']);
    console.log(`📊 Scanning test results for console errors...`);
    for (const file of resultFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (/console\.(log|warn|error|info|debug)/.test(content)) {
          hasIssues = true;
          console.log(`❌ Console statement found in test result: ${file}`);
        }
      } catch (error: any) {
        console.warn(`⚠️  Warning: Could not read result file ${file}: ${error.message}`);
      }
    }
  }
  if (!hasIssues) {
    console.log('✅ No console issues found!');
    console.log('🎉 Console output is clean and professional.');
    return true;
  }
  return false;
}

// Ejecutar si se llama directamente
(async () => {
  const isValid = validateConsoleClean();
  process.exit(isValid ? 0 : 1);
})();

export { validateConsoleClean }; 