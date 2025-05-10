/**
 * Advanced Example for @open-utils/cli-colorize
 * 
 * This example demonstrates all the enhanced features of the library:
 * - Progress bars
 * - Spinners
 * - Workflows
 * - Tables with options
 * - Custom themes
 * 
 * Run with:
 * node examples/advanced-example.js
 */

// Import all components from the library
const { 
  logger, 
  ColorizeLogger, 
  THEMES, 
  createWorkflow
} = require('../dist/colorize');

// Helper to simulate async operations
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Clear the console to start with a clean slate
console.clear();

/**
 * Main example function
 */
async function runExample() {
  // Display header
  logger
    .info('=================================================')
    .info('        @open-utils/cli-colorize DEMO', 'bright')
    .info('=================================================')
    .info('');

  // ----- THEME SHOWCASE -----
  logger.info('THEME SHOWCASE', 'bright');
  logger.info('-------------------------------------------------');
  
  // Show all available themes with examples
  for (const themeName of Object.keys(THEMES)) {
    const themeLogger = new ColorizeLogger({ theme: themeName });
    themeLogger.info(`Theme: ${themeName}`, 'bright');
    themeLogger.success('✓ Success message');
    themeLogger.error('✗ Error message');
    themeLogger.warning('⚠ Warning message');
    themeLogger.info('ℹ Info message');
    themeLogger.debug('⟡ Debug message');
    logger.info('-------------------------------------------------');
  }

  logger.info('');

  // ----- PROGRESS BAR DEMO -----
  logger.info('PROGRESS BAR DEMO', 'bright');
  logger.info('-------------------------------------------------');
  
  // Create a progress bar for 20 steps
  const progressBar = logger.createProgressBar(20, {
    width: 40,
    completeChar: '█',
    incompleteChar: '░',
    style: { color: 'cyan', style: 'bright' }
  });
  
  // Simulate a process with progress updates
  for (let i = 0; i <= 20; i++) {
    progressBar.update(i, `Processing... (${i}/20)`);
    await wait(100); // Simulate work
  }
  
  // Complete the progress bar
  progressBar.complete('Process completed successfully!');
  logger.info('-------------------------------------------------');
  logger.info('');

  // ----- SPINNER DEMO -----
  logger.info('SPINNER DEMO', 'bright');
  logger.info('-------------------------------------------------');
  
  // Create a spinner with default options
  const spinner = logger.createSpinner('Loading data...');
  
  // Start the spinner
  spinner.start();
  
  // Simulate work with text updates
  await wait(1000);
  spinner.update('Still loading...');
  await wait(1000);
  spinner.update('Almost there...');
  await wait(1000);
  
  // Complete with success
  spinner.success('Data loaded successfully!');
  
  // Create an error spinner
  const errorSpinner = logger.createSpinner('Connecting to service...');
  errorSpinner.start();
  await wait(2000);
  errorSpinner.error('Connection failed!');

  logger.info('-------------------------------------------------');
  logger.info('');

  // ----- WORKFLOW DEMO -----
  logger.info('WORKFLOW DEMO', 'bright');
  logger.info('-------------------------------------------------');
  
  // Create a workflow for a structured process
  const workflow = createWorkflow({ theme: 'vibrant' });
  
  // Start the workflow
  workflow.start('User Registration Process');
  
  // Step 1: Validation
  workflow.step('Validating input');
  await wait(500);
  workflow.success('Input validation passed');
  
  // Step 2: Database
  workflow.step('Creating user in database');
  await wait(800);
  workflow.success('User record created');
  
  // Step 3: Email
  workflow.step('Sending welcome email');
  await wait(600);
  workflow.warning('Email service is responding slowly');
  await wait(400);
  workflow.success('Welcome email sent');
  
  // Step 4: Logs
  workflow.step('Updating activity logs');
  await wait(300);
  workflow.success('Logs updated successfully');
  
  // Complete workflow
  workflow.end('Registration process completed');
  
  logger.info('-------------------------------------------------');
  logger.info('');

  // ----- TABLE DEMO -----
  logger.info('TABLE DEMO', 'bright');
  logger.info('-------------------------------------------------');
  
  // Sample data for tables
  const users = [
    { id: 1, name: 'Alice', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob', role: 'Designer', status: 'Away' },
    { id: 3, name: 'Charlie', role: 'Manager', status: 'Busy' },
    { id: 4, name: 'Diana', role: 'DevOps', status: 'Active' }
  ];
  
  // Display table with custom options
  logger.table(users, 'User Directory', {
    headerStyle: { color: 'white', bgColor: 'bgBlue', style: 'bright' }
  });

  // Simple stats table
  const stats = {
    'Total Users': users.length,
    'Active Users': users.filter(u => u.status === 'Active').length,
    'Last Updated': new Date().toLocaleString()
  };
  
  logger.table(stats, 'System Statistics');
  
  logger.info('-------------------------------------------------');
  logger.info('');

  // ----- CUSTOM THEME DEMO -----
  logger.info('CUSTOM THEME DEMO', 'bright');
  logger.info('-------------------------------------------------');
  
  // Define a custom terminal theme
  const terminalTheme = {
    success: { color: 'black', bgColor: 'bgGreen', style: 'bright' },
    error: { color: 'white', bgColor: 'bgRed', style: 'bright' },
    warning: { color: 'black', bgColor: 'bgYellow', style: 'bright' },
    info: { color: 'white', bgColor: 'bgBlue', style: null },
    debug: { color: 'white', bgColor: 'bgMagenta', style: null },
    prompt: { color: 'black', bgColor: 'bgCyan', style: 'bright' }
  };
  
  // Register and apply the theme
  logger.createTheme('terminal', terminalTheme);
  logger.setTheme('terminal');
  
  // Show examples with the custom theme
  logger.success(' SUCCESS ');
  logger.error(' ERROR ');
  logger.warning(' WARNING ');
  logger.info(' INFO ');
  logger.debug(' DEBUG ');
  
  // Use the prompt formatter
  const promptText = logger.formatPrompt(' PROMPT ');
  console.log(`This is a custom prompt: ${promptText}`);
  
  // Reset to default theme
  logger.setTheme('default');
  logger.info('-------------------------------------------------');
  logger.info('');

  // ----- CONCLUSION -----
  logger
    .info('=================================================')
    .success('            DEMO COMPLETED!                 ', 'bright')
    .info('=================================================');
}

// Run the example
runExample().catch(err => {
  logger.error('Demo failed with error:');
  console.error(err);
}); 