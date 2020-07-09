module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false }
    ],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off'
  }
};
