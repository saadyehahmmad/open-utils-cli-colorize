/**
 * ESM Import Test 
 * 
 * This file tests that the ESM module imports work correctly.
 * To run: node examples/esm-test.mjs
 */

import { logger, ColorizeLogger, THEMES } from '../dist/colorize.mjs';

// Basic test to ensure imports work
console.log('Testing ESM imports:');
console.log('---------------------');

// Test logger
logger.info('ESM import test successful!');
logger.success('All exports loaded correctly.');

// Test themes
console.log('\nAvailable themes:');
Object.keys(THEMES).forEach(theme => {
  console.log(` - ${theme}`);
});

// Test custom logger
const customLogger = new ColorizeLogger({ theme: 'vibrant' });
customLogger.info('\nCustom logger with vibrant theme works too!');

console.log('\nESM module is working correctly!'); 