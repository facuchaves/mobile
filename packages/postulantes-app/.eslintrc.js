module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'react-hooks'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': [
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
      ],
      node: { extensions: ['.js', '.ios.js', '.android.js'] },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-self-import': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 0,
  },
}
