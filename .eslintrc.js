module.exports = {
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    semi: 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies':  ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
  }
}
