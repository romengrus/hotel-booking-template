const glob = require('glob')
const path = require('path')

const icons = glob.sync('src/assets/icons/**/*.svg').map(icon => path.basename(icon, '.svg'))

module.exports = {
  locals: { icons }
}
