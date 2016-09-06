const Model = require('../../lib/facade');
const <%= model.camelName %>Schema  = require('./<%= model.slugName %>-schema');


class <%= model.pascalName %>Model extends Model {}

module.exports = new <%= model.pascalName %>Model(<%= model.camelName %>Schema);
