module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    amd: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb/base',
  ],
  parser: 'esprima',
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'new-cap': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        comments: 120,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
