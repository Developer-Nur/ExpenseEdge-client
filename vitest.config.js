// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Ensure this is set for browser-like testing
    setupFiles: './setupTests.js', // Link your setup file here
    globals: true, // This allows Vitest to use global `expect` and `it`
  },
});
