const readdirSync = require('fs').readdirSync;
const lodash      = require('lodash');

module.exports = (path, options) => {
  const opt     = options || {};
  const modules = {};
  const files   = readdirSync(path);

  files.forEach(file => {
    if (/\.js$/.test(file) && file !== 'index.js') {
      let name = file;
      if (opt.stripFromName) { name = name.replace(opt.stripFromName, ''); }
      name = lodash.camelCase(name.replace(/\.js/, ''));

      modules[name] = require(`${path}/${file}`); // eslint-disable-line
    }
  });

  return modules;
};
