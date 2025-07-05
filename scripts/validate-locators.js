#!/usr/bin/env node

/**
 * Locator Duplicate Validator
 * 
 * This script validates that there are no duplicate locator values in the centralized locators file.
 * It's important for automation projects because:
 * - Duplicate locators can cause confusion about which element to interact with
 * - They indicate poor organization and maintenance issues
 * - They can lead to flaky tests when the wrong element is selected
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to the files to check
const LOCATORS_FILE_PATH = path.join(__dirname, '..', 'locators', 'index.js');
const TEST_DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'test-data.ts');

/**
 * Extract locator values from the locators file
 * @returns {Object} Object with locator name as key and value as value
 */
function extractLocators() {
  try {
    const fileContent = fs.readFileSync(LOCATORS_FILE_PATH, 'utf8');
    const locators = {};
    
    // Regular expression to match locator definitions
    // Matches patterns like: LOCATOR_NAME: 'selector-value'
    const locatorRegex = /(\w+):\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = locatorRegex.exec(fileContent)) !== null) {
      const [, name, value] = match;
      locators[name] = value;
    }
    
    return locators;
  } catch (error) {
    console.error('❌ Error reading locators file:', error.message);
    process.exit(1);
  }
}

/**
 * Check for hardcoded selectors in test data file
 * @returns {Array} Array of hardcoded selectors found
 */
function checkForHardcodedSelectors() {
  const hardcodedSelectors = [];
  
  try {
    if (fs.existsSync(TEST_DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(TEST_DATA_FILE_PATH, 'utf8');
      
      // Look for common selector patterns in test data
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
              recommendation: 'Move selector to locators/index.js'
            });
          });
        }
      });
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not check test data file for hardcoded selectors:', error.message);
  }
  
  return hardcodedSelectors;
}

/**
 * Find duplicate locator values
 * @param {Object} locators - Object with locator name as key and value as value
 * @returns {Array} Array of duplicate groups
 */
function findDuplicates(locators) {
  const valueToNames = {};
  const duplicates = [];
  
  // Group locators by their values
  for (const [name, value] of Object.entries(locators)) {
    if (!valueToNames[value]) {
      valueToNames[value] = [];
    }
    valueToNames[value].push(name);
  }
  
  // Find values that have multiple names
  for (const [value, names] of Object.entries(valueToNames)) {
    if (names.length > 1) {
      duplicates.push({
        value,
        names
      });
    }
  }
  
  return duplicates;
}

/**
 * Main validation function
 */
function validateLocators() {
  console.log('🔍 Validating locators for duplicates and hardcoded selectors...\n');
  
  const locators = extractLocators();
  console.log(`📊 Found ${Object.keys(locators).length} locators to validate\n`);
  
  const duplicates = findDuplicates(locators);
  const hardcodedSelectors = checkForHardcodedSelectors();
  
  let hasIssues = false;
  
  if (duplicates.length > 0) {
    hasIssues = true;
    console.log('❌ Found duplicate locators:');
    console.log('=' .repeat(50));
    
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
    console.log('=' .repeat(50));
    
    hardcodedSelectors.forEach((selector, index) => {
      console.log(`\n${index + 1}. File: ${selector.file}`);
      console.log(`   Selector: ${selector.value}`);
      console.log(`   Recommendation: ${selector.recommendation}`);
    });
  }
  
  if (!hasIssues) {
    console.log('✅ No duplicate locators or hardcoded selectors found!');
    console.log('🎉 All locators are unique and well-organized.');
    console.log('✅ No hardcoded selectors found in test data.');
    return true;
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('💡 Recommendations:');
  console.log('   - Review and consolidate duplicate locators');
  console.log('   - Ensure each locator has a unique purpose');
  console.log('   - Consider using more specific selectors');
  console.log('   - Update tests to use the correct locator names');
  console.log('   - Move any hardcoded selectors to locators/index.js');
  
  return false;
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const isValid = validateLocators();
  process.exit(isValid ? 0 : 1);
}

export { validateLocators, extractLocators, findDuplicates, checkForHardcodedSelectors }; 