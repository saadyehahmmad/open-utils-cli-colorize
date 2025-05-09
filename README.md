# @open-utils/cli-colorize

A powerful and customizable library for enhancing command-line interfaces with colorful, styled text output in Node.js applications.

## Features

- 🎨 **Theme Support**: Multiple built-in themes with easy customization
- 🔄 **Method Chaining**: Fluent API for concise and readable code
- 🧩 **Modular Design**: Use as a singleton or create multiple instances
- 📝 **Semantic Logging**: Express intent with semantic methods (error, warning, success)
- 🔌 **Easy Integration**: Simple drop-in enhancement for existing applications
- 📊 **Enhanced Tables**: Display data tables with styled headers
- 🔧 **Customizable**: Create and apply custom themes to match your application style
- 🔄 **Progress Bars**: Visual indicators for long-running operations
- ⏱️ **Spinners**: Animated spinners with customizable frames and styles
- 🔀 **Workflows**: Structured logging for complex operations
- 📦 **ESM & CommonJS**: Supports both module systems
- 🧪 **Type Safety**: Full TypeScript definitions included

## Installation

```bash
# Install with npm
npm install @open-utils/cli-colorize

# Install with yarn
yarn add @open-utils/cli-colorize

# Install with pnpm
pnpm add @open-utils/cli-colorize
```

## Quick Start

```javascript
// CommonJS
const { logger } = require('@open-utils/cli-colorize');

// ES Modules
import { logger } from '@open-utils/cli-colorize';

// Use semantic logging methods
logger.success('Operation completed successfully!');
logger.error('Something went wrong');
logger.warning('This might be a problem');
logger.info('Just FYI');
logger.debug('Debug information');

// Display tables with titles
logger.table({ name: 'John', age: 30 }, 'User Details');

// Chain methods for compact code
logger
  .info('Processing started')
  .success('Step 1 completed')
  .success('Step 2 completed')
  .info('All steps finished');
```

## Themes

The library comes with several built-in themes:

- **default**: Standard colors with clear distinction
- **dark**: Brighter colors for dark terminals
- **light**: Dimmed colors for light backgrounds
- **minimal**: Simple, minimal styling
- **vibrant**: High-contrast with background colors

```javascript
// Change theme globally
logger.setTheme('vibrant');

// Or create a new logger with a specific theme
const darkLogger = new ColorizeLogger({ theme: 'dark' });
```

## Custom Themes

You can create your own custom themes:

```javascript
const { logger, ColorizeLogger } = require('@open-utils/cli-colorize');

// Define a custom theme
const myTheme = {
  success: { color: 'green', bgColor: 'bgBlack', style: 'bright' },
  error: { color: 'white', bgColor: 'bgRed', style: 'bright' },
  warning: { color: 'black', bgColor: 'bgYellow', style: null },
  info: { color: 'blue', style: 'underscore' },
  debug: { color: 'magenta', style: 'dim' },
  prompt: { color: 'cyan', style: 'bright' }
};

// Method 1: Apply to the global logger
logger.setTheme('custom', myTheme);

// Method 2: Register a named theme
logger.createTheme('awesome', myTheme);
logger.setTheme('awesome');

// Method 3: Create a new instance with the custom theme
const customLogger = new ColorizeLogger({
  theme: 'custom',
  customTheme: myTheme
});
```

## New Features

### Progress Bars

```javascript
// Create a progress bar for 100 steps
const progressBar = logger.createProgressBar(100, {
  width: 40,                        // Width of the progress bar
  completeChar: '█',                // Character for completed sections
  incompleteChar: '░',              // Character for incomplete sections
  style: { color: 'cyan', style: 'bright' }  // Custom styling
});

// Update progress during operations
for (let i = 0; i <= 100; i += 10) {
  progressBar.update(i, `Processing step ${i}/100`);
  // Simulate work
  // await someOperation();
}

// Complete the progress bar
progressBar.complete('All steps completed!');
```

### Spinners

```javascript
// Create a spinner with custom options
const spinner = logger.createSpinner('Loading data...', {
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], // Animation frames
  interval: 80,                     // Frame update interval (ms)
  style: { color: 'cyan', style: 'bright' }    // Custom styling
});

// Start the spinner animation
spinner.start();

// Update the spinner text during long operations
// setTimeout(() => spinner.update('Still loading...'), 2000);

// Stop with success message
// spinner.success('Data loaded successfully!');

// Or stop with error message
// spinner.error('Failed to load data!');

// Or just stop without message
// spinner.stop();
```

### Workflow Logging

```javascript
// Create a structured workflow logger
const workflow = createWorkflow({ theme: 'vibrant' });

// Start the workflow
workflow
  .start('User Registration Process')
  .step('Validating input')
  .success('Input validation passed')
  .step('Creating user account')
  .success('User account created')
  .step('Sending welcome email')
  .warning('Email service is slow')
  .success('Welcome email sent')
  .end('Registration complete');

// Workflows are great for organized logging of multi-step processes
```

## Advanced Usage

### Creating Multiple Loggers

```javascript
const { ColorizeLogger } = require('@open-utils/cli-colorize');

// Create specialized loggers for different parts of your application
const systemLogger = new ColorizeLogger({ theme: 'minimal' });
const userLogger = new ColorizeLogger({ theme: 'vibrant' });

systemLogger.info('System starting up...');
userLogger.success('User logged in successfully');
```

### Disabling Colors

```javascript
// Disable colors for certain environments
if (process.env.NO_COLOR) {
  logger.setEnabled(false);
}

// Or create a non-colored logger
const plainLogger = new ColorizeLogger({ enabled: false });
```

### Custom Formatting

```javascript
// Format text without logging it
const errorText = logger.format('Error:', 'red', null, 'bright');
console.log(`${errorText} Something went wrong with the process`);

// Format prompts using the theme's prompt style
const prompt = logger.formatPrompt('Enter your name: ');
```

## API Reference

### ColorizeLogger Class

#### Constructor

```javascript
const logger = new ColorizeLogger(options);
```

Options:
- `theme`: Theme name or theme object (default: 'default')
- `enabled`: Whether colors are enabled (default: true)
- `customTheme`: Custom theme definition when using 'custom' theme

#### Methods

| Method | Description |
|--------|-------------|
| `log(text, color, bgColor, style)` | Log text with specific styling |
| `success(text, [style])` | Log success message |
| `error(text, [style])` | Log error message |
| `warning(text, [style])` | Log warning message |
| `info(text, [style])` | Log info message |
| `debug(text, [style])` | Log debug message |
| `table(data, [title], [options])` | Display data in a table with optional title |
| `format(text, color, bgColor, style)` | Format text without logging |
| `formatPrompt(text)` | Format text using theme's prompt style |
| `setTheme(theme, [customTheme])` | Set the active theme |
| `createTheme(name, themeConfig)` | Create a new named theme |
| `setEnabled(enabled)` | Enable or disable color output |
| `createProgressBar(total, [options])` | Create a progress bar |
| `createSpinner(text, [options])` | Create a spinner |

### ProgressBar Class

#### Methods

| Method | Description |
|--------|-------------|
| `update(value, [text])` | Update progress bar value and optional text |
| `complete([text])` | Complete the progress bar with optional text |

### Spinner Class

#### Methods

| Method | Description |
|--------|-------------|
| `start()` | Start the spinner animation |
| `update(text)` | Update the spinner text |
| `success([text])` | Stop spinner and show success message |
| `error([text])` | Stop spinner and show error message |
| `stop([text])` | Stop spinner with optional text |

### Workflow API

#### Methods

| Method | Description |
|--------|-------------|
| `start(message)` | Start a workflow with a title |
| `step(message)` | Log a numbered step |
| `success(message)` | Log a success message |
| `error(message)` | Log an error message |
| `warning(message)` | Log a warning message |
| `end(message)` | End the workflow with a message |

## TypeScript Support

This library includes full TypeScript definitions:

```typescript
import { ColorizeLogger, logger, createWorkflow, Theme } from '@open-utils/cli-colorize';

// Custom theme with type checking
const theme: Theme = {
  success: { color: 'green', style: 'bright' },
  error: { color: 'red', style: 'bright' },
  warning: { color: 'yellow', style: 'bright' },
  info: { color: 'blue', style: 'bright' },
  debug: { color: 'magenta', style: 'dim' },
  prompt: { color: 'white', style: 'underscore' }
};

// Create typed logger
const myLogger = new ColorizeLogger({ theme });
```

## Example Project - User Information Collection CLI

This repository includes a professional sample application demonstrating the usage of the ColorizeLogger library in a real-world scenario.

### Running the Example

Basic usage:
```bash
node examples/server.js
```

With a specific theme:
```bash
THEME=vibrant node examples/server.js
```

With debug information:
```bash
DEBUG=true node examples/server.js
```

With both options:
```bash
THEME=dark DEBUG=true node examples/server.js
```

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request. 
