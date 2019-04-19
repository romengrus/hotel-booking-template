module.exports = {
  env: {
    browser: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    semi: 'off',
    'import/prefer-default-export': 'off'
  }
}
