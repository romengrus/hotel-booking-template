const glob = require('glob');
const path = require('path');
const { pluralize } = require('./src/scripts/utils');

const basedir = path.join(__dirname, 'src');

// get icon names
const icons = glob.sync('src/assets/icons/**/*.svg').map(icon => path.basename(icon, '.svg'));

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
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

const dummyURL = '/change-this-url-in-source-files';

module.exports = {
  basedir,
  locals: { icons, pluralize, createRandomId, hexToRGBA, dummyURL }
};
