const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here, if needed
    },
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000, // 10 seconds timeout for commands
    viewportWidth: 1280, // default width for the browser
    viewportHeight: 720,  // default height for the browser
    retries: {
      runMode: 2, // Retry failed tests in run mode twice
      openMode: 0, // No retries in open mode (Test Runner)
    },
    chromeWebSecurity: false, // Disable web security for cross-origin requests
  },
});