/**
 * Console Text Colorizer Library
 *
 * A utility library for adding colors and styling to terminal output
 * with an object-oriented API for better developer experience.
 *
 * @version 1.0.0
 * @license MIT
 */
export interface ThemeConfig {
    color?: string;
    bgColor?: string;
    style?: string | null;
}
export interface Theme {
    success: ThemeConfig;
    error: ThemeConfig;
    warning: ThemeConfig;
    info: ThemeConfig;
    debug: ThemeConfig;
    prompt: ThemeConfig;
}
export interface LoggerOptions {
    theme?: string | Theme;
    enabled?: boolean;
    customTheme?: Theme | null;
}
export interface TableOptions {
    borders?: boolean;
    headerStyle?: {
        color?: string;
        bgColor?: string;
        style?: string;
    };
}
export interface LogWorkflow {
    start(message: string): LogWorkflow;
    step(message: string): LogWorkflow;
    success(message: string): LogWorkflow;
    error(message: string): LogWorkflow;
    warning(message: string): LogWorkflow;
    end(message: string): LogWorkflow;
}
export declare const COLORS: Record<string, string>;
export declare const THEMES: Record<string, Theme>;
/**
 * ProgressBar class for displaying terminal progress bars
 */
export declare class ProgressBar {
    private current;
    private total;
    private width;
    private completeChar;
    private incompleteChar;
    private style;
    private logger;
    /**
     * Creates a new ProgressBar instance
     * @param total - Total steps in the progress
     * @param logger - Parent logger instance
     * @param options - Progress bar configuration options
     */
    constructor(total: number, logger: ColorizeLogger, options?: {
        width?: number;
        completeChar?: string;
        incompleteChar?: string;
        style?: ThemeConfig;
    });
    /**
     * Updates the progress bar with a new value
     * @param value - Current progress value
     * @param text - Optional text to display alongside progress
     * @returns The progress bar instance for chaining
     */
    update(value: number, text?: string): this;
    /**
     * Completes the progress bar and adds a newline
     * @param text - Optional completion text
     * @returns The progress bar instance for chaining
     */
    complete(text?: string): this;
}
/**
 * Spinner class for displaying terminal spinners
 */
export declare class Spinner {
    private text;
    private frames;
    private interval;
    private style;
    private logger;
    private intervalId;
    private currentFrame;
    /**
     * Creates a new Spinner instance
     * @param text - Text to display alongside spinner
     * @param logger - Parent logger instance
     * @param options - Spinner configuration options
     */
    constructor(text: string, logger: ColorizeLogger, options?: {
        frames?: string[];
        interval?: number;
        style?: ThemeConfig;
    });
    /**
     * Starts the spinner animation
     * @returns The spinner instance for chaining
     */
    start(): this;
    /**
     * Updates the spinner text
     * @param text - New text to display
     * @returns The spinner instance for chaining
     */
    update(text: string): this;
    /**
     * Stops the spinner with success indication
     * @param text - Optional success text
     * @returns The spinner instance for chaining
     */
    success(text?: string): this;
    /**
     * Stops the spinner with error indication
     * @param text - Optional error text
     * @returns The spinner instance for chaining
     */
    error(text?: string): this;
    /**
     * Stops the spinner
     * @param text - Optional text to display when stopped
     * @returns The spinner instance for chaining
     */
    stop(text?: string): this;
}
/**
 * ColorizeLogger class for enhanced console output with colors
 */
export declare class ColorizeLogger {
    options: LoggerOptions;
    theme: Theme;
    /**
     * Creates a new ColorizeLogger instance
     * @param options - Configuration options
     */
    constructor(options?: LoggerOptions);
    /**
     * Sets the current theme
     * @param theme - Theme name or custom theme object
     * @param customTheme - Custom theme definition if theme is 'custom'
     * @returns The logger instance for chaining
     */
    setTheme(theme: string | Theme, customTheme?: Theme | null): this;
    /**
     * Creates a custom theme
     * @param name - Theme name
     * @param themeConfig - Theme configuration
     * @returns The logger instance for chaining
     */
    createTheme(name: string, themeConfig: Theme): this;
    /**
     * Enables or disables color output
     * @param enabled - Whether color output is enabled
     * @returns The logger instance for chaining
     */
    setEnabled(enabled: boolean): this;
    /**
     * Creates a styled message with the specified color
     * This method is used internally but can also be accessed directly
     * @param text - The text to colorize
     * @param color - The color to apply (from COLORS object)
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The styled text string
     */
    _colorize(text: string, color?: string, bgColor?: string, style?: string): string;
    /**
     * Logs a colorized message to the console
     * @param text - The text to log
     * @param color - The color to apply
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The logger instance for chaining
     */
    log(text: string, color?: string, bgColor?: string, style?: string): this;
    /**
     * Logs a success message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    success(text: string, customStyle?: string): this;
    /**
     * Logs an error message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    error(text: string, customStyle?: string): this;
    /**
     * Logs a warning message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    warning(text: string, customStyle?: string): this;
    /**
     * Logs an info message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    info(text: string, customStyle?: string): this;
    /**
     * Logs a debug message based on theme
     * @param text - The text to log
     * @param customStyle - Optional style override
     * @returns The logger instance for chaining
     */
    debug(text: string, customStyle?: string): this;
    /**
     * Display data in a table with optional title
     * @param data - Object or array to display
     * @param title - Optional table title
     * @param options - Table display options
     * @returns The logger instance for chaining
     */
    table(data: any, title?: string, options?: TableOptions): this;
    /**
     * Format text without logging
     * @param text - The text to format
     * @param color - The color to apply
     * @param bgColor - Optional background color
     * @param style - Optional text style
     * @returns The formatted text string
     */
    format(text: string, color?: string, bgColor?: string, style?: string): string;
    /**
     * Format text using theme's prompt style
     * @param text - The text to format
     * @returns The formatted prompt string
     */
    formatPrompt(text: string): string;
    /**
     * Creates a progress bar
     * @param total - Total steps
     * @param options - Progress bar options
     * @returns A new progress bar instance
     */
    createProgressBar(total: number, options?: {}): ProgressBar;
    /**
     * Creates a spinner
     * @param text - Spinner text
     * @param options - Spinner options
     * @returns A new spinner instance
     */
    createSpinner(text: string, options?: {}): Spinner;
}
/**
 * Creates a new workflow logger
 * @param options - Logger options
 * @returns A new workflow instance
 */
export declare function createWorkflow(options?: LoggerOptions): LogWorkflow;
export declare const logger: ColorizeLogger;
declare const _default: {
    ColorizeLogger: typeof ColorizeLogger;
    ProgressBar: typeof ProgressBar;
    Spinner: typeof Spinner;
    logger: ColorizeLogger;
    COLORS: Record<string, string>;
    THEMES: Record<string, Theme>;
    createWorkflow: typeof createWorkflow;
};
export default _default;
