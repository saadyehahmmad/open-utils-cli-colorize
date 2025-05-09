/**
 * ESM version of cli-colorize
 * 
 * @module @open-utils/cli-colorize
 */

// Import CommonJS module
import cjs from './colorize.js';

// Re-export everything
export const {
  ColorizeLogger,
  ProgressBar,
  Spinner,
  logger,
  COLORS,
  THEMES,
  createWorkflow
} = cjs;

// Default export
export default cjs;