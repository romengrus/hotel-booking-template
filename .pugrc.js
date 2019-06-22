const glob = require('glob');
const path = require('path');
const fs = require('fs');
const pluralize = require('./src/l10n/pluralize');

// get icon names
const icons = glob.sync('src/assets/icons/**/*.svg').map(icon => path.basename(icon, '.svg'));

// get json from src/data directory
const getData = fileName => {
  const rawdata = fs.readFileSync(path.join(__dirname, 'src/data', `${fileName}.json`));
  return JSON.parse(rawdata);
};

module.exports = {
  locals: { icons, getData, pluralize }
};
