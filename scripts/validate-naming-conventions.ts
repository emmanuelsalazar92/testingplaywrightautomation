#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TESTS_DIR = path.join(__dirname, '..', 'tests');

function getTestFiles(dir: string): string[] {
  let files: string[] = [];
  try {
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getTestFiles(fullPath));
      } else if (entry.isFile() && /\.(spec|test)\.(ts|js)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error: any) {
    console.warn(`⚠️  Warning: Could not scan directory ${dir}: ${error.message}`);
  }
  return files;
}

function validateNamingConventions(): boolean {
  console.log('🔍 Validating naming conventions...\n');
  const testFiles = getTestFiles(TESTS_DIR);
  console.log(`📊 Found ${testFiles.length} files to validate\n`);
  let hasIssues = false;
  for (const filePath of testFiles) {
    const fileName = path.basename(filePath);
    if (!/^[a-z0-9\-_.]+\.(spec|test)\.(ts|js)$/.test(fileName)) {
      hasIssues = true;
      console.log(`❌ Invalid test file name: ${fileName}`);
    }
  }
  if (!hasIssues) {
    console.log('✅ All files follow naming conventions!');
    console.log('🎉 No naming convention violations found.');
    return true;
  }
  return false;
}

// Ejecutar si se llama directamente
(async () => {
  const isValid = validateNamingConventions();
  process.exit(isValid ? 0 : 1);
})();

export { validateNamingConventions }; 