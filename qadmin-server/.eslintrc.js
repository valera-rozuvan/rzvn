module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    amd: true,
    node: true,
  },
  extends: [
    'airbnb/base',
  ],
  parser: 'esprima',
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
