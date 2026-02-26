const globals = require('globals');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
      'no-undef': 'error',
      'import/no-unresolved': 'error',
      'semi': 'off',
      'quotes': 'off'
    }
  }
];