const Controller = require('../libraries/controller');
const <%= businessModel %>Model  = require('../models/<%= modelPath %>-model');

class <%= businessModel %>Controller extends Controller {}

module.exports = new <%= businessModel %>Controller(<%= businessModel %>Model);
