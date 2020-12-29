module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'eol-last': 0, // set this on 0 if you're using beautify extension
    'prefer-destructuring': 0,
    'function-paren-newline': 0,
    curly: 0,
    'linebreak-style': 0,
    'no-restricted-syntax': 0,
    'class-methods-use-this': 0,
    'no-new': 0,
  },
};
