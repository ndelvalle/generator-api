const Facade = require('../../lib/facade');
const <%= model.camelName %>Schema  = require('./<%= model.slugName %>-schema');

class <%= model.pascalName %>Facade extends Facade {}

module.exports = new <%= model.pascalName %>Facade(<%= model.camelName %>Schema);
