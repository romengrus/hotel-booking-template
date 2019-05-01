const path = require('path')
const cwd = process.cwd()
const glob = require('glob')

module.exports = {
  includePaths: [path.resolve(cwd, 'src'), path.resolve(cwd, 'node_modules')],
  // glob pattern importer
  // ref: https://sass-lang.com/documentation/js-api#importer
  importer: function(url, prev) {
    const absUrl = path.join('src', url)
    if (glob.hasMagic(absUrl)) {
      const contents = glob
        .sync(absUrl)
        .map(file => `@import "${file}";`)
        .join('\n')

      return { contents }
    }
    return null
  }
}
