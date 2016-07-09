const Promise = require('bluebird');

module.exports = modules => {
  modules.forEach(module => {
    Promise.promisifyAll(require(module)); // eslint-disable-line global-require
  });
};
