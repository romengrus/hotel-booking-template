const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { pluralize } = require('./src/l10n/utils');

const basedir = path.join(__dirname, 'src');

// get icon names
const iconNames = glob.sync('src/assets/icons/**/*.svg').map(icon => path.basename(icon, '.svg'));

// get json from src/data directory
function getData(fileName) {
  const data = fs.readFileSync(path.join(basedir, 'data', `${fileName}.json`));
  return JSON.parse(data);
}

function createRandomId(prefix = '') {
  const randomHash = Math.random()
    .toString(36)
    .substring(2, 7);
  return prefix ? `${prefix}-${randomHash}` : `${randomHash}`;
}

module.exports = {
  basedir,
  locals: { iconNames, getData, pluralize, createRandomId }
};
