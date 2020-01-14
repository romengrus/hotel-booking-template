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

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

module.exports = {
  basedir,
  locals: { iconNames, getData, pluralize, createRandomId, hexToRGBA }
};
