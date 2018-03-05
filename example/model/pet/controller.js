const Controller = require('../../lib/controller')
const petFacade = require('./facade')

class PetController extends Controller {}

module.exports = new PetController(petFacade)
