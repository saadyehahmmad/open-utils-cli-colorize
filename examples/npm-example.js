/**
 * Example using @open-utils/cli-colorize installed via npm
 * 
 * Run this example with:
 * node npm-example.js
 * 
 * (After installing with: npm install @open-utils/cli-colorize)
 */

// Import the logger from the npm package
const { logger, ColorizeLogger, THEMES } = require('@open-utils/cli-colorize');

// Display library features
logger
  .info('======================================')
  .info('     CLI-COLORIZE NPM DEMO', 'bright')
  .info('======================================')
  .info('');

// Show all available themes
logger.info('Available Themes:');
Object.keys(THEMES).forEach(themeName => {
  // Create a theme-specific logger for demonstration
  const themeLogger = new ColorizeLogger({ theme: themeName });
  themeLogger.info(`Theme: ${themeName} - This is an info message`);
  themeLogger.success(`Theme: ${themeName} - This is a success message`);
  themeLogger.error(`Theme: ${themeName} - This is an error message`);
  themeLogger.warning(`Theme: ${themeName} - This is a warning message`);
  themeLogger.debug(`Theme: ${themeName} - This is a debug message`);
  logger.info('--------------------------------------');
});

// Show method chaining
logger
  .info('')
  .info('Method Chaining Example:')
  .success('✓ Step 1: NPM Package installed')
  .success('✓ Step 2: Library imported')
  .success('✓ Step 3: Loggers created')
  .success('✓ Step 4: Demo completed')
  .info('');

// Show custom theme creation
logger.info('Creating a Custom Theme:');
const customTheme = {
  success: { color: 'green', bgColor: 'bgBlack', style: 'bright' },
  error: { color: 'black', bgColor: 'bgRed', style: 'bright' },
  warning: { color: 'black', bgColor: 'bgYellow', style: 'bright' },
  info: { color: 'white', bgColor: 'bgBlue', style: 'bright' },
  debug: { color: 'white', bgColor: 'bgMagenta', style: 'bright' },
  prompt: { color: 'black', bgColor: 'bgCyan', style: 'bright' }
};

// Register the custom theme
logger.createTheme('custom', customTheme);
logger.setTheme('custom');

// Show examples with the custom theme
logger
  .info('Custom Theme Example')
  .success('This is a success message')
  .error('This is an error message')
  .warning('This is a warning message')
  .debug('This is a debug message');

// Show table functionality
const userData = [
  { name: 'John Doe', age: 30, role: 'Developer' },
  { name: 'Jane Smith', age: 28, role: 'Designer' },
  { name: 'Bob Johnson', age: 35, role: 'Manager' }
];

logger.info('');
logger.table(userData, 'User Database:');

// Show formatted output without logging
const formattedText = logger.format('This text is formatted but not logged directly', 'cyan', null, 'underscore');
console.log(`Regular text with ${formattedText} embedded within it.`);

// Reset to default theme
logger.setTheme('default');
logger
  .info('')
  .info('======================================')
  .success('         DEMO COMPLETED!          ', 'bright')
  .info('======================================'); 