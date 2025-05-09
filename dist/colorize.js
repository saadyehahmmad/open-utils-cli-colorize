"use strict";
/**
 * Console Text Colorizer Library
 *
 * A utility library for adding colors and styling to terminal output
 * with an object-oriented API for better developer experience.
 *
 * @version 1.0.0
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.ColorizeLogger = exports.Spinner = exports.ProgressBar = exports.THEMES = exports.COLORS = void 0;
exports.createWorkflow = createWorkflow;
// ANSI color and style codes
exports.COLORS = {
    // Styles
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    // Text colors
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    // Background colors
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    bgGray: "\x1b[100m"
};
// Pre-defined themes
exports.THEMES = {
    default: {
        success: { color: 'green', style: null },
        error: { color: 'red', style: null },
        warning: { color: 'yellow', style: null },
        info: { color: 'cyan', style: null },
        debug: { color: 'magenta', style: null },
        prompt: { color: 'white', style: 'bright' }
    },
    dark: {
        success: { color: 'green', style: 'bright' },
        error: { color: 'red', style: 'bright' },
        warning: { color: 'yellow', style: 'bright' },
        info: { color: 'blue', style: 'bright' },
        debug: { color: 'magenta', style: 'dim' },
        prompt: { color: 'white', style: 'underscore' }
    },
    light: {
        success: { color: 'green', style: 'dim' },
        error: { color: 'red', style: 'dim' },
        warning: { color: 'yellow', style: 'dim' },
        info: { color: 'blue', style: 'dim' },
        debug: { color: 'magenta', style: 'dim' },
        prompt: { color: 'black', style: 'bright' }
    },
    minimal: {
        success: { color: 'green', style: null },
        error: { color: 'red', style: null },
        warning: { color: 'yellow', style: null },
        info: { color: 'white', style: null },
        debug: { color: 'white', style: 'dim' },
        prompt: { color: 'white', style: null }
    },
    vibrant: {
        success: { color: 'green', bgColor: 'bgBlack', style: 'bright' },
        error: { color: 'white', bgColor: 'bgRed', style: 'bright' },
        warning: { color: 'black', bgColor: 'bgYellow', style: null },
        info: { color: 'white', bgColor: 'bgBlue', style: 'bright' },
        debug: { color: 'white', bgColor: 'bgMagenta', style: null },
        prompt: { color: 'black', bgColor: 'bgCyan', style: 'bright' }
    }
};
/**
 * Validates that a color key exists in COLORS
 * @param color - The color key to validate
 * @returns boolean indicating if color is valid
 */
function isValidColor(color) {
    if (!color)
        return false;
    return Object.keys(exports.COLORS).includes(color);
}
/**
 * ProgressBar class for displaying terminal progress bars
 */
class ProgressBar {
    /**
     * Creates a new ProgressBar instance
     * @param total - Total steps in the progress
     * @param logger - Parent logger instance
     * @param options - Progress bar configuration options
     */
    constructor(total, logger, options = {}) {
        this.current = 0;
        this.total = Math.max(1, total);
        this.width = options.width || 30;
        this.completeChar = options.completeChar || '█';
        this.incompleteChar = options.incompleteChar || '░';
        this.style = options.style || { color: 'green', style: 'bright' };
        this.logger = logger;
    }
    /**
     * Updates the progress bar with a new value
     * @param value - Current progress value
     * @param text - Optional text to display alongside progress
     * @returns The progress bar instance for chaining
     */
    update(value, text) {
        // Ensure value is between 0 and total
        this.current = Math.max(0, Math.min(value, this.total));
        // Calculate percentage and bar representation
        const percent = this.current / this.total;
        const completeWidth = Math.round(this.width * percent);
        const incompleteWidth = this.width - completeWidth;
        // Create the bar string
        const bar = this.completeChar.repeat(completeWidth) +
            this.incompleteChar.repeat(incompleteWidth);
        // Clear the line and write the progress
        process.stdout.write('\r\x1b[K');
        // Format the progress bar with style
        const progressText = `[${bar}] ${Math.round(percent * 100)}%`;
        process.stdout.write(this.logger._colorize(progressText, this.style.color, this.style.bgColor, this.style.style || undefined));
        // Add optional text
        if (text) {
            process.stdout.write(' ' + text);
        }
        return this;
    }
    /**
     * Completes the progress bar and adds a newline
     * @param text - Optional completion text
     * @returns The progress bar instance for chaining
     */
    complete(text) {
        this.update(this.total, text);
        process.stdout.write('\n');
        return this;
    }
}
exports.ProgressBar = ProgressBar;
/**
 * Spinner class for displaying terminal spinners
 */
class Spinner {
    /**
     * Creates a new Spinner instance
     * @param text - Text to display alongside spinner
     * @param logger - Parent logger instance
     * @param options - Spinner configuration options
     */
    constructor(text, logger, options = {}) {
        this.intervalId = null;
        this.currentFrame = 0;
        this.text = text;
        this.frames = options.frames || ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        this.interval = options.interval || 80;
        this.style = options.style || { color: 'cyan', style: 'bright' };
        this.logger = logger;
    }
    /**
     * Starts the spinner animation
     * @returns The spinner instance for chaining
     */
    start() {
        if (this.intervalId) {
            return this;
        }
        // Hide cursor
        process.stdout.write('\x1b[?25l');
        this.intervalId = setInterval(() => {
            const frame = this.frames[this.currentFrame];
            process.stdout.write('\r\x1b[K');
            process.stdout.write(this.logger._colorize(frame, this.style.color, this.style.bgColor, this.style.style || undefined));
            process.stdout.write(' ' + this.text);
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }, this.interval);
        return this;
    }
    /**
     * Updates the spinner text
     * @param text - New text to display
     * @returns The spinner instance for chaining
     */
    update(text) {
        this.text = text;
        return this;
    }
    /**
     * Stops the spinner with success indication
     * @param text - Optional success text
     * @returns The spinner instance for chaining
     */
    success(text) {
        const successText = text || this.text;
        this.stop();
        this.logger.success(successText);
        return this;
    }
    /**
     * Stops the spinner with error indication
     * @param text - Optional error text
     * @returns The spinner instance for chaining
     */
    error(text) {
        const errorText = text || this.text;
        this.stop();
        this.logger.error(errorText);
        return this;
    }
    /**
     * Stops the spinner
     * @param text - Optional text to display when stopped
     * @returns The spinner instance for chaining
     */
    stop(text) {
        if (!this.intervalId) {
            return this;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
        // Show cursor and clear line
        process.stdout.write('\r\x1b[K');
        process.stdout.write('\x1b[?25h');
        if (text) {
            console.log(text);
        }
        return this;
    }
}
exports.Spinner = Spinner;
/**
 * ColorizeLogger class for enhanced console output with colors
 */
class ColorizeLogger {
    /**
     * Creates a new ColorizeLogger instance
     * @param options - Configuration options
     */
    constructor(options = {}) {
        this.options = {
            theme: options.theme || 'default',
            enabled: options.enabled !== undefined ? options.enabled : true,
            customTheme: options.customTheme || null
        };
        // Set the theme
        this.theme = this.setTheme(this.options.theme || 'default', this.options.customTheme).theme;
    }
    /**
     * Sets the current theme
     * @param theme - Theme name or custom theme object
     * @param customTheme - Custom theme definition if theme is 'custom'
     * @returns The logger instance for chaining
     */
    setTheme(theme, customTheme = null) {
        if (typeof theme === 'string') {
            if (theme === 'custom' && customTheme) {
                this.theme = customTheme;
            }
            else if (exports.THEMES[theme]) {
                this.theme = exports.THEMES[theme];
            }
            else {
                this.theme = exports.THEMES.default;
            }
        }
        else if (typeof theme === 'object' && theme !== null) {
            this.theme = theme;
        }
        else {
            this.theme = exports.THEMES.default;
        }
        return this;
    }
    /**
     * Creates a custom theme
     * @param name - Theme name
     * @param themeConfig - Theme configuration
     * @returns The logger instance for chaining
     */
    createTheme(name, themeConfig) {
        if (typeof name === 'string' && typeof themeConfig === 'object') {
            exports.THEMES[name] = themeConfig;
        }
        return this;
    }
    /**
     * Enables or disables color output
     * @param enabled - Whether color output is enabled
     * @returns The logger instance for chaining
     */
    setEnabled(enabled) {
        this.options.enabled = !!enabled;
        return this;
    }
    /**
     * Creates a styled message with the specified color
     * This method is used internally but can also be accessed directly
     * @param text - The text to colorize
     * @param color - The color to apply (from COLORS object)
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The styled text string
     */
    _colorize(text, color, bgColor, style) {
        if (!this.options.enabled) {
            return text;
        }
        let result = '';
        // Apply style if provided and valid
        if (style && isValidColor(style)) {
            result += exports.COLORS[style];
        }
        // Apply background if provided and valid
        if (bgColor && isValidColor(bgColor)) {
            result += exports.COLORS[bgColor];
        }
        // Apply text color if provided and valid
        if (color && isValidColor(color)) {
            result += exports.COLORS[color];
        }
        // Add the text and reset
        result += text + exports.COLORS.reset;
        return result;
    }
    /**
     * Logs a colorized message to the console
     * @param text - The text to log
     * @param color - The color to apply
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The logger instance for chaining
     */
    log(text, color, bgColor, style) {
        console.log(this._colorize(text, color, bgColor, style));
        return this;
    }
    /**
     * Logs a success message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    success(text, customStyle) {
        const { color, bgColor, style } = this.theme.success;
        this.log(text, color, bgColor, customStyle || (style || undefined));
        return this;
    }
    /**
     * Logs an error message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    error(text, customStyle) {
        const { color, bgColor, style } = this.theme.error;
        this.log(text, color, bgColor, customStyle || (style || undefined));
        return this;
    }
    /**
     * Logs a warning message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    warning(text, customStyle) {
        const { color, bgColor, style } = this.theme.warning;
        this.log(text, color, bgColor, customStyle || (style || undefined));
        return this;
    }
    /**
     * Logs an info message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    info(text, customStyle) {
        const { color, bgColor, style } = this.theme.info;
        this.log(text, color, bgColor, customStyle || (style || undefined));
        return this;
    }
    /**
     * Logs a debug message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    debug(text, customStyle) {
        const { color, bgColor, style } = this.theme.debug;
        this.log(text, color, bgColor, customStyle || (style || undefined));
        return this;
    }
    /**
     * Display data in a table with optional title
     * @param data - Object or array to display
     * @param title - Optional table title
     * @param options - Table display options
     * @returns The logger instance for chaining
     */
    table(data, title, options = {}) {
        // Show title if provided
        if (title) {
            this.info('');
            this.info(title);
        }
        // If data is empty, show a message
        if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
            this.warning('  No data to display');
            return this;
        }
        const headerStyle = options.headerStyle || {
            color: 'white',
            style: 'bright'
        };
        // Format based on data type
        if (Array.isArray(data)) {
            // Handle array of objects
            if (data.length > 0 && typeof data[0] === 'object') {
                // Extract column headers from first object
                const headers = Object.keys(data[0]);
                // Print headers
                const headerRow = headers.join('\t');
                console.log(this._colorize(headerRow, headerStyle.color, headerStyle.bgColor, headerStyle.style));
                // Print separator
                console.log(this._colorize('-'.repeat(headerRow.length), headerStyle.color, headerStyle.bgColor, headerStyle.style));
                // Print data rows
                data.forEach(item => {
                    const row = headers.map(header => {
                        const value = item[header];
                        return value === undefined || value === null ? '' : String(value);
                    }).join('\t');
                    console.log(row);
                });
            }
            else {
                // Handle simple array
                data.forEach((item, index) => {
                    console.log(`${index}\t${item}`);
                });
            }
        }
        else if (typeof data === 'object') {
            // Handle single object
            Object.entries(data).forEach(([key, value]) => {
                console.log(`${this._colorize(key, headerStyle.color, headerStyle.bgColor, headerStyle.style)}\t${value}`);
            });
        }
        this.info('');
        return this;
    }
    /**
     * Format text without logging
     * @param text - The text to format
     * @param color - The color to apply
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The formatted text string
     */
    format(text, color, bgColor, style) {
        return this._colorize(text, color, bgColor, style);
    }
    /**
     * Format text using theme's prompt style
     * @param text - The text to format
     * @returns The formatted prompt string
     */
    formatPrompt(text) {
        const { color, bgColor, style } = this.theme.prompt;
        return this._colorize(text, color, bgColor, style || undefined);
    }
    /**
     * Creates a progress bar
     * @param total - Total steps
     * @param options - Progress bar options
     * @returns A new progress bar instance
     */
    createProgressBar(total, options = {}) {
        return new ProgressBar(total, this, options);
    }
    /**
     * Creates a spinner
     * @param text - Spinner text
     * @param options - Spinner options
     * @returns A new spinner instance
     */
    createSpinner(text, options = {}) {
        return new Spinner(text, this, options);
    }
}
exports.ColorizeLogger = ColorizeLogger;
/**
 * LogWorkflow class for structured logging workflows
 */
class Workflow {
    /**
     * Creates a new LogWorkflow instance
     * @param options - Logger options
     */
    constructor(options = {}) {
        this.steps = 0;
        this.logger = new ColorizeLogger(options);
    }
    /**
     * Logs the start of a workflow
     * @param message - Start message
     * @returns The workflow instance for chaining
     */
    start(message) {
        this.logger.info('');
        this.logger.info(`◆ ${message}`, 'bright');
        this.logger.info('');
        this.steps = 0;
        return this;
    }
    /**
     * Logs a step in the workflow
     * @param message - Step message
     * @returns The workflow instance for chaining
     */
    step(message) {
        this.steps++;
        this.logger.info(`  ${this.steps}. ${message}`);
        return this;
    }
    /**
     * Logs a success message in the workflow
     * @param message - Success message
     * @returns The workflow instance for chaining
     */
    success(message) {
        this.logger.success(`  ✓ ${message}`);
        return this;
    }
    /**
     * Logs an error message in the workflow
     * @param message - Error message
     * @returns The workflow instance for chaining
     */
    error(message) {
        this.logger.error(`  ✗ ${message}`);
        return this;
    }
    /**
     * Logs a warning message in the workflow
     * @param message - Warning message
     * @returns The workflow instance for chaining
     */
    warning(message) {
        this.logger.warning(`  ⚠ ${message}`);
        return this;
    }
    /**
     * Logs the end of a workflow
     * @param message - End message
     * @returns The workflow instance for chaining
     */
    end(message) {
        this.logger.info('');
        this.logger.info(`◆ ${message}`, 'bright');
        this.logger.info('');
        return this;
    }
}
/**
 * Creates a new workflow logger
 * @param options - Logger options
 * @returns A new workflow instance
 */
function createWorkflow(options = {}) {
    return new Workflow(options);
}
// Export singleton instance
exports.logger = new ColorizeLogger();
// For CommonJS compatibility
exports.default = {
    ColorizeLogger,
    ProgressBar,
    Spinner,
    logger: exports.logger,
    COLORS: exports.COLORS,
    THEMES: exports.THEMES,
    createWorkflow
};
//# sourceMappingURL=colorize.js.map