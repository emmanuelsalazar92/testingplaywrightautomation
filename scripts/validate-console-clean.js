#!/usr/bin/env node

/**
 * Console Clean Validator
 * 
 * This script validates that no unwanted console logs or errors are present in test results.
 * It's important for automation projects because:
 * - Clean console output makes debugging easier
 * - Prevents accidental logging of sensitive information
 * - Ensures professional test execution
 * - Reduces noise in CI/CD logs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to check for console issues
const PATHS_TO_CHECK = [
  'test-results',
  'playwright-report'
];

// Patterns to detect unwanted console output
const CONSOLE_PATTERNS = {
  // Unwanted console methods
  CONSOLE_LOGS: /console\.(log|warn|error|info|debug)\s*\(/g,
  
  // Debug statements
  DEBUG_STATEMENTS: /debugger\s*;/g,
  
  // Alert statements
  ALERT_STATEMENTS: /alert\s*\(/g,
  
  // Print statements (if using print instead of console)
  PRINT_STATEMENTS: /print\s*\(/g,
  
  // Common debugging patterns
  DEBUG_PATTERNS: /(?:TODO|FIXME|HACK|XXX)\s*:/gi,
  
  // Hardcoded credentials (basic pattern)
  HARDCODED_CREDENTIALS: /(?:password|secret|key|token)\s*[:=]\s*['"`][^'"`]+['"`]/gi,
};

// Allowed console patterns (whitelist)
const ALLOWED_CONSOLE_PATTERNS = [
  /console\.log\s*\(\s*['"`]Test completed['"`]\s*\)/, // Example of allowed log
  /console\.error\s*\(\s*['"`]Expected error['"`]\s*\)/, // Example of allowed error
];

/**
 * Check if a console statement is allowed
 * @param {string} line - Line of code to check
 * @returns {boolean} True if allowed
 */
function isAllowedConsole(line) {
  return ALLOWED_CONSOLE_PATTERNS.some(pattern => pattern.test(line));
}

/**
 * Scan file for console issues
 * @param {string} filePath - Path to the file
 * @returns {Array} Array of issues found
 */
function scanFileForConsoleIssues(filePath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, lineNumber) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
        return;
      }
      
      // Check for console issues
      for (const [patternName, pattern] of Object.entries(CONSOLE_PATTERNS)) {
        const matches = trimmedLine.match(pattern);
        
        if (matches && !isAllowedConsole(trimmedLine)) {
          issues.push({
            type: patternName,
            line: lineNumber + 1,
            content: trimmedLine,
            file: path.relative(process.cwd(), filePath)
          });
        }
      }
    });
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read file ${filePath}: ${error.message}`);
  }
  
  return issues;
}

/**
 * Scan test results for console errors
 * @param {string} resultsPath - Path to test results
 * @returns {Array} Array of console errors found
 */
function scanTestResultsForConsoleErrors(resultsPath) {
  const issues = [];
  
  try {
    if (fs.existsSync(resultsPath)) {
      const files = fs.readdirSync(resultsPath);
      
      for (const file of files) {
        const filePath = path.join(resultsPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && (file.endsWith('.json') || file.endsWith('.txt') || file.endsWith('.log'))) {
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Look for console errors in test results
            const consoleErrorMatches = content.match(/console\.error[^}]*}/g);
            if (consoleErrorMatches) {
              consoleErrorMatches.forEach(match => {
                issues.push({
                  type: 'CONSOLE_ERROR_IN_RESULTS',
                  file: path.relative(process.cwd(), filePath),
                  content: match.substring(0, 100) + '...',
                  severity: 'high'
                });
              });
            }
            
            // Look for JavaScript errors
            const jsErrorMatches = content.match(/Error:|Exception:|TypeError|ReferenceError/g);
            if (jsErrorMatches) {
              jsErrorMatches.forEach(match => {
                issues.push({
                  type: 'JAVASCRIPT_ERROR',
                  file: path.relative(process.cwd(), filePath),
                  content: match,
                  severity: 'high'
                });
              });
            }
          } catch (error) {
            console.warn(`⚠️  Warning: Could not read result file ${filePath}: ${error.message}`);
          }
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not scan results directory ${resultsPath}: ${error.message}`);
  }
  
  return issues;
}

/**
 * Scan directory recursively for files
 * @param {string} dirPath - Directory path
 * @param {Array} extensions - File extensions to check
 * @returns {Array} Array of file paths
 */
function scanDirectory(dirPath, extensions = ['.js', '.ts']) {
  const files = [];
  
  try {
    if (!fs.existsSync(dirPath)) return files;
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...scanDirectory(fullPath, extensions));
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
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
function validateConsoleClean() {
  console.log('🔍 Validating console output for unwanted logs and errors...\n');
  
  const allIssues = [];
  
  // Scan source code files
  const sourceDirectories = ['tests', 'pages', 'utils', 'scripts'];
  const sourceFiles = [];
  
  for (const dir of sourceDirectories) {
    sourceFiles.push(...scanDirectory(dir, ['.js', '.ts']));
  }
  
  console.log(`📊 Scanning ${sourceFiles.length} source files for console issues...`);
  
  // Check source files for console issues
  sourceFiles.forEach(filePath => {
    const issues = scanFileForConsoleIssues(filePath);
    allIssues.push(...issues);
  });
  
  // Check test results for console errors
  console.log('📊 Scanning test results for console errors...');
  
  for (const resultsPath of PATHS_TO_CHECK) {
    const resultIssues = scanTestResultsForConsoleErrors(resultsPath);
    allIssues.push(...resultIssues);
  }
  
  if (allIssues.length === 0) {
    console.log('✅ No console issues found!');
    console.log('🎉 Console output is clean and professional.');
    return true;
  }
  
  console.log('❌ Found console issues:');
  console.log('=' .repeat(60));
  
  // Group issues by type
  const issuesByType = {};
  allIssues.forEach(issue => {
    if (!issuesByType[issue.type]) {
      issuesByType[issue.type] = [];
    }
    issuesByType[issue.type].push(issue);
  });
  
  for (const [type, issues] of Object.entries(issuesByType)) {
    console.log(`\n🔴 ${type} (${issues.length} issues):`);
    
    issues.forEach(issue => {
      if (issue.line) {
        console.log(`   📁 ${issue.file}:${issue.line}`);
      } else {
        console.log(`   📁 ${issue.file}`);
      }
      console.log(`   💬 ${issue.content}`);
    });
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('💡 Recommendations:');
  console.log('   - Remove console.log statements from production code');
  console.log('   - Use proper logging framework for debugging');
  console.log('   - Remove debugger statements');
  console.log('   - Clean up TODO/FIXME comments');
  console.log('   - Remove hardcoded credentials');
  console.log('   - Use environment variables for sensitive data');
  
  return false;
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const isValid = validateConsoleClean();
  process.exit(isValid ? 0 : 1);
}

export { validateConsoleClean, CONSOLE_PATTERNS }; 