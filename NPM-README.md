# @open-utils/cli-colorize

> The most comprehensive terminal styling toolkit for Node.js CLI applications

[![npm version](https://img.shields.io/npm/v/@open-utils/cli-colorize.svg)](https://www.npmjs.com/package/@open-utils/cli-colorize)
[![npm downloads](https://img.shields.io/npm/dm/@open-utils/cli-colorize.svg)](https://www.npmjs.com/package/@open-utils/cli-colorize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📢 Why Use @open-utils/cli-colorize?

`@open-utils/cli-colorize` is the perfect solution if you're building CLI applications in Node.js and want:

- 🌈 **Beautiful ANSI colors** for your terminal output
- 📊 **Progress bars** to show task completion status
- ⏳ **Spinners** for long-running operations 
- 📋 **Formatted tables** to display data neatly
- 🎨 **Theme support** for consistent styling
- 🧩 **Modular design** for flexibility
- 📝 **Semantic methods** for expressive logging
- 🧪 **Full TypeScript support** for type safety

## 📥 Quick Install

```bash
npm install @open-utils/cli-colorize
```

## 🚀 Quick Example

```javascript
// CommonJS
const { logger } = require('@open-utils/cli-colorize');

// ES Modules
import { logger } from '@open-utils/cli-colorize';

// Semantic logging
logger.success('Operation completed successfully!');
logger.error('Something went wrong');
logger.warning('This might cause issues');
logger.info('Processing data...');

// Progress bars
const progress = logger.createProgressBar(100);
progress.update(50, "Halfway there!");

// Spinners
const spinner = logger.createSpinner('Loading...');
spinner.start();
// Later
spinner.success('Data loaded!');

// Method chaining for concise code
logger
  .info('Starting process')
  .success('Step 1 complete')
  .success('Step 2 complete')
  .info('All done!');
```

## 🌟 Features

- **Zero dependencies** - lightweight and secure
- **ESM & CommonJS support** - works with any project
- **Theme-based styling** - customize to match your app
- **Full TypeScript definitions** - great developer experience
- **Workflow logging** - structured output for complex operations

## 📚 Documentation

For full documentation, visit our [GitHub repository](https://github.com/saadyehahmmad/open-utils-cli-colorize#readme).

## 📱 Related Packages

- [@open-utils/cli-input](https://www.npmjs.com/package/@open-utils/cli-input) - Interactive command-line input utilities
- [@open-utils/cli-menu](https://www.npmjs.com/package/@open-utils/cli-menu) - Create interactive command-line menus

## 📄 License

MIT © [Ahmad Sadieh](https://github.com/saadyehahmmad) 