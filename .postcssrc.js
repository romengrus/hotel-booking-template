module.exports = {
  plugins: {
    autoprefixer: true,
    'postcss-plugin-px2rem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: [],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 4
    }
  }
};
