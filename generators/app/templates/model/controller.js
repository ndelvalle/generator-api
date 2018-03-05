const Controller = require('../../lib/controller')
const <%= model.camelName %>Facade = require('./facade')

class <%= model.pascalName %>Controller extends Controller {}

module.exports = new <%= model.pascalName %>Controller(<%= model.camelName %>Facade)
