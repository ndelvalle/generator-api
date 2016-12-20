const Controller = require('../../lib/controller');
const petFacade  = require('./pet-facade');

class PetController extends Controller {}

module.exports = new PetController(petFacade);
