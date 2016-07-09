const Model = require('../libraries/model');
const <%= businessModel %>Schema  = require('../schemas/<%= schemaPath %>-schema');

class <%= businessModel %>Model extends Model {}

module.exports = new <%= businessModel %>Model(<%= businessModel %>Schema);
