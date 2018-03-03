const Facade = require('../../lib/facade')
const petSchema = require('./schema')

class PetFacade extends Facade {}

module.exports = new PetFacade('Pet', petSchema)
