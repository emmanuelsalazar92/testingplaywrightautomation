#!/usr/bin/env node

/**
 * Naming Convention Validator
 * 
 * This script validates that files, classes, and methods follow the established naming conventions.
 * It's important for automation projects because:
 * - Consistent naming improves code readability and maintainability
 * - It helps team members quickly understand the purpose of each component
 * - It prevents confusion and reduces onboarding time
 * - It ensures scalability as the test suite grows
 */

import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url'; // Not used in this script

// const __filename = fileURLToPath(import.meta.url); // Not used in this script
// const __dirname = path.dirname(__filename); // Not used in this script

// Naming convention patterns
const NAMING_PATTERNS = {
  // File naming: pageName_action.spec.js or pageName_action.js
  FILE_PATTERN: /^[a-z][a-z0-9-]*(_[a-z][a-z0-9-]*)*\.(spec\.)?(js|ts)$/,
  
  // Class naming: PageNameAction (PascalCase)
  CLASS_PATTERN: /^[A-Z][a-zA-Z0-9]*$/,
  
  // Method naming: actionName (camelCase)
  METHOD_PATTERN: /^[a-z][a-zA-Z0-9]*$/,
  
  // Page Object naming: PageNamePage (ends with Page)
  PAGE_OBJECT_PATTERN: /^[A-Z][a-zA-Z0-9]*Page$/,
  
  // Test naming: should_actionName (descriptive test names)
  TEST_PATTERN: /^should_[a-z][a-zA-Z0-9_]*$/,
};

// Directories to scan
const SCAN_DIRECTORIES = [
  'tests',
  'pages',
  'utils',
  'scripts',
];

// File types to validate
const VALID_FILE_EXTENSIONS = ['.js', '.ts'];

/**
 * Check if a string matches a pattern
 * @param {string} str - String to check
 * @param {RegExp} pattern - Pattern to match against
 * @returns {boolean} True if matches
 */
function matchesPattern(str, pattern) {
  return pattern.test(str);
}

/**
 * Extract class names from a file
 * @param {string} filePath - Path to the file
 * @returns {Array} Array of class names found
 */
function extractClasses(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const classMatches = content.match(/class\s+(\w+)/g);
    
    if (!classMatches) return [];
    
    return classMatches.map(match => {
      const className = match.replace(/class\s+/, '');
      // Filter out common non-class patterns
      const nonClassPatterns = [
        'for', 'uses', 'names', 'with', 'from', 'into', 'over', 'under',
        'test', 'describe', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll'
      ];
      
      if (nonClassPatterns.includes(className)) {
        return null;
      }
      return className;
    }).filter(Boolean);
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read file ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Extract method names from a file
 * @param {string} filePath - Path to the file
 * @returns {Array} Array of method names found
 */
function extractMethods(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const methodMatches = content.match(/(?:async\s+)?(\w+)\s*\(/g);
    
    if (!methodMatches) return [];
    
    return methodMatches.map(match => {
      const methodName = match.replace(/(?:async\s+)?(\w+)\s*\(/, '$1');
      // Filter out common non-method patterns
      const nonMethodPatterns = [
        'if', 'for', 'while', 'switch', 'catch', 'function', 'const', 'let', 'var',
        'RegExp', 'Date', 'String', 'Number', 'Boolean', 'Array', 'Object', 'Map', 'Set',
        'Promise', 'Error', 'TypeError', 'ReferenceError', 'SyntaxError',
        'console', 'process', 'require', 'import', 'export', 'default',
        'test', 'describe', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll',
        'expect', 'page', 'browser', 'context', 'new', 'await', 'return',
        'LoginPage', 'TestHelpers', 'TestData', 'Selectors' // Common class names
      ];
      
      if (nonMethodPatterns.includes(methodName)) {
        return null;
      }
      return methodName;
    }).filter(Boolean);
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read file ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Extract test names from a file
 * @param {string} filePath - Path to the file
 * @returns {Array} Array of test names found
 */
function extractTests(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const testMatches = content.match(/test\s*\(\s*["'`]([^"'`]+)["'`]/g);
    
    if (!testMatches) return [];
    
    return testMatches.map(match => {
      const testName = match.replace(/test\s*\(\s*["'`]([^"'`]+)["'`]/, '$1');
      return testName;
    });
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read file ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Validate a single file
 * @param {string} filePath - Path to the file
 * @returns {Object} Validation results
 */
function validateFile(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  const issues = [];
  
  // Validate file name
  if (!matchesPattern(fileName, NAMING_PATTERNS.FILE_PATTERN)) {
    // Allow page object files with names like LoginPage.ts
    if (filePath.includes('pages/') && fileName.match(/^[A-Z][a-zA-Z]*Page\.(ts|js)$/)) {
      // This is a valid page object file
    } else {
      issues.push({
        type: 'file_name',
        message:
          `File name "${fileName}" doesn't follow pattern: pageName_action.spec.js`,
      });
    }
  }
  
  // Validate classes
  const classes = extractClasses(filePath);
  classes.forEach(className => {
    if (!matchesPattern(className, NAMING_PATTERNS.CLASS_PATTERN)) {
      issues.push({
        type: 'class_name',
        message: `Class "${className}" doesn't follow PascalCase pattern`,
      });
    }
    
    // Check if it's a page object
    if (filePath.includes('pages/') && !matchesPattern(className, NAMING_PATTERNS.PAGE_OBJECT_PATTERN)) {
      issues.push({
        type: 'page_object_name',
        message:
          `Page object class "${className}" should end with "Page"`,
      });
    }
  });
  
  // Validate methods
  const methods = extractMethods(filePath);
  methods.forEach(methodName => {
    if (!matchesPattern(methodName, NAMING_PATTERNS.METHOD_PATTERN)) {
      // eslint-disable-next-line max-len
      issues.push({
        type: 'method_name',
        message: `Method "${methodName}" doesn't follow camelCase pattern`,
      });
    }
  });
  
  // Validate test names (only in test files)
  if (fileName.includes('.spec.')) {
    const tests = extractTests(filePath);
    tests.forEach(testName => {
      // Allow any descriptive test name that starts with 'should'
      if (!testName.startsWith('should ')) {
        issues.push({
          type: 'test_name',
          message:
            `Test "${testName}" should start with "should " and be descriptive`,
        });
      }
    });
  }
  
  return {
    filePath: relativePath,
    issues,
  };
}

/**
 * Scan directory recursively for files
 * @param {string} dirPath - Directory path
 * @returns {Array} Array of file paths
 */
function scanDirectory(dirPath) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...scanDirectory(fullPath));
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (VALID_FILE_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not scan directory ${dirPath}: ${error.message}`);
  }
  
  return files;
}

/**
 * Main validation function
 */
function validateNamingConventions() {
  console.log('🔍 Validating naming conventions...\n');
  
  const allFiles = [];
  
  // Scan all directories
  for (const dir of SCAN_DIRECTORIES) {
    if (fs.existsSync(dir)) {
      allFiles.push(...scanDirectory(dir));
    }
  }
  
  // Filter out validation scripts to avoid false positives
  const filesToValidate = allFiles.filter(file => 
    !file.includes('scripts/validate-')
  );
  
  console.log(`📊 Found ${filesToValidate.length} files to validate\n`);
  
  const results = filesToValidate.map(validateFile);
  const filesWithIssues = results.filter(result => result.issues.length > 0);
  
  if (filesWithIssues.length === 0) {
    console.log('✅ All files follow naming conventions!');
    console.log('🎉 No naming convention violations found.');
    return true;
  }
  
  console.log('❌ Found naming convention violations:');
  console.log('=' .repeat(60));
  
  filesWithIssues.forEach(result => {
    console.log(`\n📁 ${result.filePath}:`);
    result.issues.forEach(issue => {
      console.log(`   ❌ ${issue.message}`);
    });
  });
  
  console.log(`\n${'=' .repeat(60)}`);
  console.log('💡 Naming Convention Rules:');
  console.log('   📄 Files: pageName_action.spec.js (e.g., login_success.spec.js)');
  console.log('   🏗️  Classes: PascalCase (e.g., LoginPage, UserDashboard)');
  console.log('   🔧 Methods: camelCase (e.g., clickLogin, fillEmail)');
  console.log('   📄 Page Objects: Must end with "Page" (e.g., LoginPage)');
  console.log('   🧪 Tests: should_actionName (e.g., should_login_successfully)');
  
  return false;
}

// Run validation if this script is executed directly
const isValid = validateNamingConventions();
process.exit(isValid ? 0 : 1);

export { validateNamingConventions, NAMING_PATTERNS }; 