/* global module */
module.exports = {
  extends: 'react-app',
  env: { // Default env for React files
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'server.js'], // Files that need Node.js environment
      env: {
        node: true,
        browser: false, // Ensure browser is off for these files
      },
    },
  ],
};
