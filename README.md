# @open-utils/cli-colorize

[![npm version](https://img.shields.io/npm/v/@open-utils/cli-colorize.svg)](https://www.npmjs.com/package/@open-utils/cli-colorize)
[![npm downloads](https://img.shields.io/npm/dm/@open-utils/cli-colorize.svg)](https://www.npmjs.com/package/@open-utils/cli-colorize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/node/v/@open-utils/cli-colorize.svg)](https://nodejs.org/)
[![Documentation](https://img.shields.io/badge/Documentation-Website-brightgreen.svg)](https://saadyehahmmad.github.io/open-utils-cli-colorize/)

> A powerful and customizable library for enhancing command-line interfaces with colorful, styled text output, progress bars, spinners, and formatted tables in Node.js applications.

📚 **[View Full Documentation](https://saadyehahmmad.github.io/open-utils-cli-colorize/)** | 📦 **[NPM Package](https://www.npmjs.com/package/@open-utils/cli-colorize)** | 🔍 **[Examples](https://github.com/saadyehahmmad/open-utils-cli-colorize/tree/main/examples)**

## 🚀 Features

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
- 🚫 **Zero Dependencies**: No external packages required

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Themes](#themes)
- [Custom Themes](#custom-themes)
- [Progress Bars](#progress-bars)
- [Spinners](#spinners)
- [Workflow Logging](#workflow-logging)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)
- [Why Choose @open-utils/cli-colorize](#why-choose-open-utils-cli-colorize)
- [Documentation Website](https://saadyehahmmad.github.io/open-utils-cli-colorize/)
- [Contributing](#contributing)
- [License](#license)

## 📥 Installation

```bash
# Install with npm
npm install @open-utils/cli-colorize

# Install with yarn
yarn add @open-utils/cli-colorize

# Install with pnpm
pnpm add @open-utils/cli-colorize
```

## 🚀 Quick Start

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

## 🎨 Themes

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

## 🔧 Custom Themes

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

## 🔄 Progress Bars

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

## ⏱️ Spinners

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

## 🔀 Workflow Logging

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

## 🧰 Advanced Usage

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

## 📚 API Reference

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

## 🏆 Why Choose @open-utils/cli-colorize

### Comparison with Alternatives

| Feature | @open-utils/cli-colorize | chalk | colors.js | kleur |
|---------|--------------------------|-------|-----------|-------|
| Method Chaining | ✅ | ✅ | ✅ | ✅ |
| Themes | ✅ | ❌ | ❌ | ❌ |
| Progress Bars | ✅ | ❌ | ❌ | ❌ |
| Spinners | ✅ | ❌ | ❌ | ❌ |
| Tables | ✅ | ❌ | ❌ | ❌ |
| Workflows | ✅ | ❌ | ❌ | ❌ |
| TypeScript | ✅ | ✅ | ❌ | ✅ |
| ESM Support | ✅ | ✅ | ✅ | ✅ |
| Zero Dependencies | ✅ | ✅ | ✅ | ✅ |

### Use Cases

- **CLI Applications**: Enhance user experience with colored output and interactive elements
- **Logging Systems**: Create semantic, easy-to-read logs
- **DevOps Tools**: Build monitoring and deployment tools with clear visual feedback
- **Task Runners**: Show progress and status of running tasks
- **Interactive CLIs**: Create engaging command-line interfaces with styled prompts and responses

## 📚 Documentation Website

For a more interactive experience exploring the features of @open-utils/cli-colorize, visit our documentation website:

🔗 **[https://saadyehahmmad.github.io/open-utils-cli-colorize/](https://saadyehahmmad.github.io/open-utils-cli-colorize/)**

The documentation site includes:
- Interactive examples
- Live demonstrations
- Installation instructions
- Frequently asked questions
- API reference
- Comparison with alternatives

The site is optimized for mobile and desktop viewing, making it easy to explore the library's capabilities wherever you are.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📦 Related Projects


---

<p align="center">Made with ❤️ by <a href="https://github.com/saadyehahmmad">Ahmad Sadieh</a></p> 