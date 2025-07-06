#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCATORS_FILE_PATH = path.join(__dirname, '..', 'locators', 'index.js');
const TEST_DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'test-data.ts');

/**
 * Extract locator values from the locators file
 * @returns Object with full locator name as key and value as value
 */
function extractLocators(): Record<string, string> {
  try {
    const fileContent = fs.readFileSync(LOCATORS_FILE_PATH, 'utf8');
    const locators: Record<string, string> = {};
    // Regex para encontrar todos los objetos exportados (incluyendo los que están en múltiples líneas)
    const objectRegex = /export\s+const\s+([A-Z0-9_]+)\s*=\s*\{([\s\S]*?)\};/gs;
    let objectMatch: RegExpExecArray | null;
    while ((objectMatch = objectRegex.exec(fileContent)) !== null) {
      const objectName = objectMatch[1];
      const objectBody = objectMatch[2];
      // Regex para encontrar todas las propiedades tipo: EMAIL_INPUT: '[selector]',
      // Captura desde los dos puntos hasta la coma, incluyendo las comillas
      const propRegex = /([A-Z0-9_]+):\s*([^,]+),?/g;
      let propMatch: RegExpExecArray | null;
      while ((propMatch = propRegex.exec(objectBody)) !== null) {
        const prop = propMatch[1];
        let value = propMatch[2].trim();
        // Remover comillas del inicio y final si existen
        if ((value.startsWith("'") && value.endsWith("'")) || 
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith('`') && value.endsWith('`'))) {
          value = value.slice(1, -1);
        }
        // Solo agregar si es un selector con data-testid
        if (value && value.includes('data-testid=')) {
          const fullName = `${objectName}.${prop}`;
          locators[fullName] = value;
        }
      }
    }
    return locators;
  } catch (error: any) {
    console.error('❌ Error reading locators file:', error.message);
    process.exit(1);
  }
}

/**
 * Check for hardcoded selectors in test data file
 */
function checkForHardcodedSelectors(): Array<{ type: string; value: string; file: string; recommendation: string }> {
  const hardcodedSelectors: Array<{ type: string; value: string; file: string; recommendation: string }> = [];
  try {
    if (fs.existsSync(TEST_DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(TEST_DATA_FILE_PATH, 'utf8');
      const selectorPatterns = [
        /data-testid=["`'][^"'`]+["`']/g,
        /getByTestId\(["`'][^"'`]+["`']\)/g,
        /locator\(["`'][^"'`]+["`']\)/g,
        /selector:\s*["`'][^"'`]+["`']/g,
      ];
      selectorPatterns.forEach(pattern => {
        const matches = fileContent.match(pattern);
        if (matches) {
          matches.forEach(match => {
            hardcodedSelectors.push({
              type: 'hardcoded_selector',
              value: match,
              file: 'data/test-data.ts',
              recommendation: 'Move selector to locators/index.js',
            });
          });
        }
      });
    }
  } catch (error: any) {
    console.warn(
      '⚠️  Warning: Could not check test data file for hardcoded selectors:',
      error.message,
    );
  }
  return hardcodedSelectors;
}

/**
 * Find duplicate locator values
 */
function findDuplicates(locators: Record<string, string>): Array<{ value: string; names: string[] }> {
  const valueToNames: Record<string, string[]> = {};
  const duplicates: Array<{ value: string; names: string[] }> = [];
  for (const [name, value] of Object.entries(locators)) {
    if (!valueToNames[value]) {
      valueToNames[value] = [];
    }
    valueToNames[value].push(name);
  }
  for (const [value, names] of Object.entries(valueToNames)) {
    if (names.length > 1) {
      duplicates.push({
        value,
        names,
      });
    }
  }
  return duplicates;
}

function validateLocators(): boolean {
  console.log('🔍 Validating locators for duplicates and hardcoded selectors...\n');
  const locators = extractLocators();
  console.log(`📊 Found ${Object.keys(locators).length} locators to validate\n`);
  const duplicates = findDuplicates(locators);
  const hardcodedSelectors = checkForHardcodedSelectors();
  let hasIssues = false;
  if (duplicates.length > 0) {
    hasIssues = true;
    console.log('❌ Found duplicate locators:');
    console.log('='.repeat(50));
    duplicates.forEach((duplicate, index) => {
      console.log(`\n${index + 1}. Duplicate Value: "${duplicate.value}"`);
      console.log('   Used by:');
      duplicate.names.forEach(name => {
        console.log(`   - ${name}`);
      });
    });
  }
  if (hardcodedSelectors.length > 0) {
    hasIssues = true;
    console.log('\n❌ Found hardcoded selectors in test data:');
    console.log('='.repeat(50));
    hardcodedSelectors.forEach((selector, index) => {
      console.log(`\n${index + 1}. File: ${selector.file}`);
      console.log(`   Selector: ${selector.value}`);
      console.log(
        `   Recommendation: ${selector.recommendation}`,
      );
    });
  }
  if (!hasIssues) {
    console.log('✅ No duplicate locators or hardcoded selectors found!');
    console.log('🎉 All locators are unique and well-organized.');
    console.log('✅ No hardcoded selectors found in test data.');
    return true;
  }
  console.log(`\n${'=' .repeat(50)}`);
  console.log('💡 Recommendations:');
  console.log('   - Review and consolidate duplicate locators');
  console.log('   - Ensure each locator has a unique purpose');
  console.log('   - Consider using more specific selectors');
  console.log('   - Update tests to use the correct locator names');
  console.log('   - Move any hardcoded selectors to locators/index.js');
  return false;
}

// Ejecutar si se llama directamente
(async () => {
  const isValid = validateLocators();
  process.exit(isValid ? 0 : 1);
})();

export { validateLocators, extractLocators, findDuplicates, checkForHardcodedSelectors }; 